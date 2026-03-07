import { AlertTriangle, CheckCircle2, Loader2, Smartphone } from "lucide-react";
import { useState } from "react";
import { useResetSubscriptionDevice } from "../hooks/useSubscriptionQueries";
import { getDeviceId } from "../utils/deviceId";

export default function DeviceBlockedScreen() {
  const deviceId = getDeviceId();
  const [resetRequested, setResetRequested] = useState(false);
  const [resetError, setResetError] = useState("");

  const resetDeviceMutation = useResetSubscriptionDevice();

  const getUserId = () => {
    try {
      return (
        JSON.parse(localStorage.getItem("aiapget_user_session") ?? "{}").id ??
        ""
      );
    } catch {
      return "";
    }
  };

  const handleRequestReset = async () => {
    const userId = getUserId();
    if (!userId) {
      setResetError(
        "Could not identify your account. Please refresh and try again.",
      );
      return;
    }
    setResetError("");
    try {
      await resetDeviceMutation.mutateAsync(userId);
      // Clear bound device ID from localStorage so user can re-bind
      try {
        const raw = localStorage.getItem("aiapget_subscription");
        if (raw) {
          const s = JSON.parse(raw);
          s.boundDeviceId = undefined;
          localStorage.setItem("aiapget_subscription", JSON.stringify(s));
        }
      } catch {}
      setResetRequested(true);
    } catch {
      setResetError(
        "Failed to send reset request. Please try again or contact the admin.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm text-center space-y-6">
        {/* Icon */}
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-destructive" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Device Not Authorized
          </h1>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Your subscription is currently active on a different device. Each
            subscription allows access on{" "}
            <strong className="text-foreground">one device only</strong>.
          </p>
        </div>

        {/* Success state */}
        {resetRequested ? (
          <div
            data-ocid="device_blocked.success_state"
            className="bg-success/10 border border-success/30 rounded-2xl p-4 text-left space-y-2"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <p className="text-sm font-semibold text-success font-body">
                Device Reset Requested
              </p>
            </div>
            <p className="text-xs text-muted-foreground font-body pl-7">
              Your request has been sent. Please wait for the admin to confirm,
              or re-login on your original device.
            </p>
          </div>
        ) : (
          <>
            {/* Warning box */}
            <div
              data-ocid="device_blocked.panel"
              className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 text-left space-y-3"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground font-body">
                  If you wish to use the app on this device, you can request a
                  device reset below or contact the admin directly.
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-[11px] text-muted-foreground font-body mb-1">
                  Your Device ID (share with admin to transfer):
                </p>
                <p className="text-xs font-mono text-foreground bg-muted rounded-lg px-3 py-2 select-all break-all">
                  {deviceId}
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-card border border-border rounded-2xl p-4 text-left space-y-2">
              <p className="text-xs font-semibold text-foreground font-body">
                How to transfer your subscription:
              </p>
              <ol className="space-y-1.5 text-xs text-muted-foreground font-body list-decimal list-inside">
                <li>Tap "Request Device Reset" below</li>
                <li>Admin will approve your device transfer</li>
                <li>Refresh this page to regain access</li>
              </ol>
            </div>

            {/* Error */}
            {resetError && (
              <p
                data-ocid="device_blocked.error_state"
                className="text-xs text-destructive font-body px-1"
              >
                {resetError}
              </p>
            )}

            {/* Request Reset button */}
            <button
              type="button"
              data-ocid="device_blocked.primary_button"
              onClick={handleRequestReset}
              disabled={resetDeviceMutation.isPending}
              className="w-full py-3 rounded-xl bg-amber-500 text-white font-semibold text-sm hover:bg-amber-500/90 transition-colors font-body disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {resetDeviceMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Request…
                </>
              ) : (
                "Request Device Reset"
              )}
            </button>
          </>
        )}

        <button
          type="button"
          data-ocid="device_blocked.button"
          onClick={() => window.location.reload()}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors font-body"
        >
          {resetRequested
            ? "Reload to Check Access"
            : "I've been transferred — Refresh"}
        </button>
      </div>
    </div>
  );
}
