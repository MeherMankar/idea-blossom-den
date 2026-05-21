
import { ArrowLeft, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface QRLoginPageProps {
  isOpen: boolean
  onClose: () => void
  onPhoneLogin: () => void
  onQRScanned: () => void
}

export function QRLoginPage({ isOpen, onClose, onPhoneLogin, onQRScanned }: QRLoginPageProps) {
  return (
    <div
      style={{ zIndex: 80 }}
      className={cn(
        "fixed inset-0 bg-background flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onClose}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button className="text-primary font-medium text-sm uppercase tracking-wide hover:text-primary/80 transition-colors">
          Settings
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* QR Code */}
        <div className="relative w-48 h-48 bg-white rounded-lg flex items-center justify-center mb-8">
          {/* QR Code Pattern - simplified representation */}
          <div className="absolute inset-3 grid grid-cols-7 grid-rows-7 gap-0.5">
            {/* Corner patterns */}
            <div className="col-span-2 row-span-2 bg-black rounded-sm" />
            <div className="bg-transparent" />
            <div className="bg-black" />
            <div className="bg-transparent" />
            <div className="col-span-2 row-span-2 bg-black rounded-sm" />
            
            {/* Middle rows - simplified */}
            {Array.from({ length: 21 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-[1px]",
                  // deterministic pseudo-random pattern (SSR-safe)
                  ((i * 2654435761) >>> 0) % 2 === 0 ? "bg-black" : "bg-transparent"
                )}
              />
            ))}
            
            {/* Bottom corners */}
            <div className="col-span-2 row-span-2 bg-black rounded-sm" />
            <div className="bg-transparent" />
            <div className="bg-black" />
            <div className="bg-transparent" />
            <div className="bg-transparent" />
            <div className="bg-black" />
          </div>
          
          {/* Telegram logo in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
          Scan From Mobile Telegram
        </h2>

        <ol className="text-sm text-muted-foreground space-y-2 mb-10 text-left">
          <li><span className="text-foreground font-medium">1.</span> Open Telegram on your phone</li>
          <li><span className="text-foreground font-medium">2.</span> Go to Settings {">"} Devices {">"} Link Desktop Device</li>
          <li><span className="text-foreground font-medium">3.</span> Scan this image to Log In</li>
        </ol>

        {/* Action links */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onPhoneLogin}
            className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            Log in using phone number
          </button>
          <button className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
            Log in using passkey
          </button>
        </div>

        {/* Simulate QR scan button (for demo) */}
        <button
          onClick={onQRScanned}
          className="mt-10 px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors"
        >
          Simulate QR Scan
        </button>
      </div>

      {/* Footer */}
      <div className="py-4 text-center">
        <p className="text-xs text-muted-foreground">AyuGram Desktop v6.7.8 x64</p>
      </div>
    </div>
  )
}
