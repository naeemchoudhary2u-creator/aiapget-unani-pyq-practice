import { AlertTriangle, Smartphone } from "lucide-react";
import { getDeviceId } from "../utils/deviceId";

export default function DeviceBlockedScreen() {
  const deviceId = getDeviceId();

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

        {/* Warning box */}
        <div
          data-ocid="device_blocked.panel"
          className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 text-left space-y-3"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground font-body">
              If you wish to use the app on this device, please contact the
              admin to transfer your subscription.
            </p>
          </div>
          <div className="border-t border-border pt-3">
            <p className="text-[11px] text-muted-foreground font-body mb-1">
              Your Device ID (share with admin to transfer):
            </p>
            <p
              className="text-xs font-mono text-foreground bg-muted rounded-lg px-3 py-2 select-all break-all"
              data-ocid="device_blocked.panel"
            >
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
            <li>Copy your Device ID shown above</li>
            <li>Share it with the admin (password: Naeem9472)</li>
            <li>Admin resets your device binding from Admin Panel</li>
            <li>Refresh this page to regain access</li>
          </ol>
        </div>

        <button
          type="button"
          data-ocid="device_blocked.button"
          onClick={() => window.location.reload()}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors font-body"
        >
          I've been transferred — Refresh
        </button>
      </div>
    </div>
  );
}
