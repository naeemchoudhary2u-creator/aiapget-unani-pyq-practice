/**
 * Device Identity Utility
 *
 * Generates and persists a unique device ID in localStorage.
 * This ID is used to bind a subscription to a single device.
 */

const DEVICE_ID_KEY = "aiapget_device_id";

function generateDeviceId(): string {
  // Combine timestamp, random, and some browser signals for uniqueness
  const timestamp = Date.now().toString(36);
  const random1 = Math.random().toString(36).slice(2);
  const random2 = Math.random().toString(36).slice(2);
  const screen = `${window.screen.width}x${window.screen.height}`;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "unknown";
  const lang = navigator.language ?? "unknown";
  const raw = `${timestamp}-${random1}-${random2}-${screen}-${tz}-${lang}`;

  // Simple hash to create a fixed-length ID
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const hashHex = Math.abs(hash).toString(16).padStart(8, "0");
  return `DEV_${timestamp}_${random1.slice(0, 6)}_${hashHex}`.toUpperCase();
}

/**
 * Get the persistent device ID for this browser/device.
 * Creates one if it doesn't exist yet.
 */
export function getDeviceId(): string {
  try {
    const existing = localStorage.getItem(DEVICE_ID_KEY);
    if (existing && existing.length > 8) {
      return existing;
    }
    const newId = generateDeviceId();
    localStorage.setItem(DEVICE_ID_KEY, newId);
    return newId;
  } catch {
    // Fallback if localStorage is unavailable
    return generateDeviceId();
  }
}

/**
 * Check if the current device's ID matches a subscription's bound device.
 * Returns true if the subscription is allowed on this device.
 */
export function isDeviceAllowed(
  boundDeviceId: string | undefined | null,
): boolean {
  if (!boundDeviceId) {
    // No device bound yet — allow (happens for legacy records or first access)
    return true;
  }
  return getDeviceId() === boundDeviceId;
}
