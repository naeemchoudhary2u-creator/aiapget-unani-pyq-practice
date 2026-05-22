import { useEffect, useState } from "react";
import { type Backend, ExternalBlob, createActor } from "../backend";

// Canister ID injected by vite-plugin-environment at build time
declare const CANISTER_ID_BACKEND: string | undefined;

function resolveCanisterId(): string {
  if (typeof CANISTER_ID_BACKEND !== "undefined" && CANISTER_ID_BACKEND) {
    return CANISTER_ID_BACKEND;
  }
  const win = window as unknown as Record<string, unknown>;
  if (typeof win.CANISTER_ID_BACKEND === "string" && win.CANISTER_ID_BACKEND) {
    return win.CANISTER_ID_BACKEND as string;
  }
  const ids = win.__CANISTER_IDS__ as Record<string, string> | undefined;
  if (ids?.backend) return ids.backend;
  return "";
}

// No-op file upload/download — this app doesn't use object storage
async function noopUpload(): Promise<Uint8Array> {
  return new Uint8Array();
}
async function noopDownload(): Promise<ExternalBlob> {
  return ExternalBlob.fromBytes(new Uint8Array());
}

function buildActor(): Backend | null {
  const canisterId = resolveCanisterId();
  if (!canisterId) return null;
  try {
    return createActor(canisterId, noopUpload, noopDownload);
  } catch (err) {
    console.error("[useActor] Failed to create actor:", err);
    return null;
  }
}

// ── Module-level singleton ────────────────────────────────────────────────────
let _sharedActor: Backend | null = buildActor();

// Health-check state — separate from actor existence
// isReady becomes true either after healthCheck() confirms backend is reachable
// OR after the maximum wait time has elapsed (graceful degradation).
let _isHealthReady = false;
let _isHealthCheckFailed = false;
let _healthCheckAttempts = 0;
const HEALTH_CHECK_MAX_ATTEMPTS = 3;
const HEALTH_CHECK_TIMEOUT_MS = 5_000;
const HEALTH_CHECK_RETRY_DELAY_MS = 2_000;
// Maximum total wait before forcing isReady=true so queries can always run
const HEALTH_CHECK_MAX_TOTAL_MS = 15_000;

// Listeners — React hooks subscribe so they can re-render when state changes
const _listeners = new Set<() => void>();

function notifyListeners() {
  for (const fn of _listeners) fn();
}

// Background actor poller: if actor is null on import, keep retrying until resolved
let _pollTimer: ReturnType<typeof setTimeout> | null = null;
const MAX_ACTOR_ATTEMPTS = 30;
let _actorAttempts = 0;

function startActorPollingIfNeeded() {
  if (_sharedActor || _pollTimer) return;
  _pollTimer = setTimeout(function poll() {
    _actorAttempts++;
    const actor = buildActor();
    if (actor) {
      _sharedActor = actor;
      console.log(
        "[useActor] Actor initialized after polling (attempt",
        _actorAttempts,
        ")",
      );
      // Now that actor exists, start health check
      startHealthCheck();
      _pollTimer = null;
    } else if (_actorAttempts < MAX_ACTOR_ATTEMPTS) {
      _pollTimer = setTimeout(poll, 500);
    } else {
      console.error(
        "[useActor] Could not initialize actor after",
        MAX_ACTOR_ATTEMPTS,
        "attempts. Check CANISTER_ID_BACKEND.",
      );
      _isHealthCheckFailed = true;
      notifyListeners();
      _pollTimer = null;
    }
  }, 200);
}

/**
 * Performs a single healthCheck() call with a timeout.
 * Returns true if the backend responded, false otherwise.
 */
async function probeHealthCheck(actor: Backend): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const timer = setTimeout(() => {
      console.warn(
        "[useActor] healthCheck() timed out after",
        HEALTH_CHECK_TIMEOUT_MS,
        "ms",
      );
      resolve(false);
    }, HEALTH_CHECK_TIMEOUT_MS);

    actor
      .healthCheck()
      .then((result) => {
        clearTimeout(timer);
        console.log("[useActor] healthCheck() responded:", result);
        resolve(true);
      })
      .catch((err) => {
        clearTimeout(timer);
        console.warn("[useActor] healthCheck() threw:", err);
        resolve(false);
      });
  });
}

let _healthCheckTimer: ReturnType<typeof setTimeout> | null = null;
// Hard deadline: after this fires, isReady is set true regardless
let _healthCheckDeadline: ReturnType<typeof setTimeout> | null = null;

function forceReadyNow(reason: string) {
  if (_isHealthReady) return; // already ready, nothing to do
  console.warn("[useActor] Forcing isReady=true:", reason);
  _isHealthReady = true;
  notifyListeners();
}

/**
 * Starts the health check loop. Calls actor.healthCheck() up to
 * HEALTH_CHECK_MAX_ATTEMPTS times, retrying every HEALTH_CHECK_RETRY_DELAY_MS.
 * On success: sets _isHealthReady = true and notifies listeners.
 * On final failure: sets _isHealthReady = true anyway (graceful degradation)
 * so React Query hooks are not permanently blocked.
 *
 * A hard deadline timer also fires after HEALTH_CHECK_MAX_TOTAL_MS to ensure
 * queries can always eventually run.
 */
async function startHealthCheck() {
  if (_isHealthReady || _isHealthCheckFailed) return;
  if (!_sharedActor) return;

  console.log("[useActor] Starting health check probe...");

  // Hard deadline — never block queries forever
  if (!_healthCheckDeadline) {
    _healthCheckDeadline = setTimeout(() => {
      forceReadyNow("hard deadline reached");
    }, HEALTH_CHECK_MAX_TOTAL_MS);
  }

  async function attempt() {
    if (!_sharedActor) return;

    _healthCheckAttempts++;
    console.log(
      "[useActor] healthCheck attempt",
      _healthCheckAttempts,
      "/",
      HEALTH_CHECK_MAX_ATTEMPTS,
    );

    const ok = await probeHealthCheck(_sharedActor);

    if (ok) {
      if (_healthCheckDeadline) {
        clearTimeout(_healthCheckDeadline);
        _healthCheckDeadline = null;
      }
      _isHealthReady = true;
      _isHealthCheckFailed = false;
      console.log(
        "[useActor] Backend confirmed reachable after",
        _healthCheckAttempts,
        "attempt(s)",
      );
      notifyListeners();
      return;
    }

    if (_healthCheckAttempts < HEALTH_CHECK_MAX_ATTEMPTS) {
      console.log(
        "[useActor] healthCheck failed, retrying in",
        HEALTH_CHECK_RETRY_DELAY_MS,
        "ms...",
      );
      _healthCheckTimer = setTimeout(attempt, HEALTH_CHECK_RETRY_DELAY_MS);
    } else {
      // All attempts exhausted — mark failed but ALSO set isReady=true
      // so React Query hooks are not permanently blocked. Backend may still
      // respond to actual data queries even if healthCheck timed out.
      _isHealthCheckFailed = true;
      console.warn(
        "[useActor] healthCheck failed after",
        HEALTH_CHECK_MAX_ATTEMPTS,
        "attempts — setting isReady=true anyway so data queries can run.",
      );
      forceReadyNow("all health check attempts exhausted");
    }
  }

  await attempt();
}

// Kick off immediately on module load
if (_sharedActor) {
  // Actor was created synchronously — start health check right away
  startHealthCheck();
} else {
  // Actor not yet available — start actor polling (which will kick off health check)
  startActorPollingIfNeeded();
}

// ── React hook ────────────────────────────────────────────────────────────────

/**
 * useActor — returns the ICP backend actor singleton.
 *
 * isReady becomes true either after healthCheck() confirms backend is reachable,
 * OR after all health check attempts fail (graceful degradation — queries still run).
 * isHealthCheckFailed is true when health check retries are exhausted (but isReady
 * is also true in that case, so queries are not permanently blocked).
 */
export function useActor(): {
  actor: Backend | null;
  isFetching: boolean;
  isReady: boolean;
  isHealthCheckFailed: boolean;
  error: string | null;
} {
  const [, setTick] = useState(0);

  useEffect(() => {
    // Register as a listener so we re-render when state changes
    const rerender = () => setTick((n) => n + 1);
    _listeners.add(rerender);

    // If already done, no need to wait
    if (_isHealthReady || _isHealthCheckFailed) {
      return () => {
        _listeners.delete(rerender);
      };
    }

    // Ensure polling/health-check is running
    if (!_sharedActor) {
      startActorPollingIfNeeded();
    } else if (
      !_isHealthReady &&
      !_isHealthCheckFailed &&
      _healthCheckAttempts === 0
    ) {
      startHealthCheck();
    }

    return () => {
      _listeners.delete(rerender);
    };
  }, []);

  const actor = _sharedActor;
  const isReady = _isHealthReady;
  const isHealthCheckFailed = _isHealthCheckFailed;
  const error = isHealthCheckFailed
    ? "Unable to reach server. Please check your connection."
    : !actor && _actorAttempts >= MAX_ACTOR_ATTEMPTS
      ? "Backend actor unavailable. Please reload the page."
      : null;

  return { actor, isFetching: false, isReady, isHealthCheckFailed, error };
}

// Re-export ActorInterface as a type alias for Backend so existing imports still work
export type { Backend as ActorInterface };
