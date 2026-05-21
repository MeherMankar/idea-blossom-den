
import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Search,
  MoreVertical,
  CameraPlus,
  Send,
  Heart,
  MessageCircle,
  Lock,
  Bell,
  PieChart,
  BatteryLow,
  Folder,
  Monitor,
  Globe,
  Star,
  Gift,
  Building2,
  Camera,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/user-context"

interface SettingsPageProps {
  isOpen: boolean
  onClose: () => void
}

const settingsItems = [
  { icon: Send, label: "exteraGram Preferences", value: null },
  { icon: Heart, label: "AyuGram Preferences", value: null },
  { icon: MessageCircle, label: "Chat Settings", value: null },
  { icon: Lock, label: "Privacy and Security", value: null },
  { icon: Bell, label: "Notifications and Sounds", value: null },
  { icon: PieChart, label: "Data and Storage", value: null },
  { icon: BatteryLow, label: "Power Saving", value: null },
  { icon: Folder, label: "Chat Folders", value: null },
  { icon: Monitor, label: "Devices", value: "4", valueColor: "text-sky-400" },
  { icon: Globe, label: "Language", value: "English", valueColor: "text-sky-400" },
]

const premiumItems = [
  { label: "Telegram Premium", isPremium: true },
  { label: "My Stars", isStars: true },
  { label: "Telegram Business", isBusiness: true },
  { label: "Send a Gift", isGift: true },
]

export function SettingsPage({ isOpen, onClose }: SettingsPageProps) {
  const { profile, setAvatarUrl } = useUser()
  const [isHeaderStuck, setIsHeaderStuck] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const [coverUrl, setCoverUrl] = useState<string | null>(null)

  // Detect when the top hero section scrolls past to show sticky header
  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return
    const onScroll = () => {
      setIsHeaderStuck(scrollEl.scrollTop > 220)
    }
    scrollEl.addEventListener("scroll", onScroll, { passive: true })
    return () => scrollEl.removeEventListener("scroll", onScroll)
  }, [isOpen])

  // Reset scroll on open
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0
      setIsHeaderStuck(false)
    }
  }, [isOpen])

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setCoverUrl(url)
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
  }

  return (
    <>
      {/* Full-screen panel */}
      <div
        style={{ zIndex: 80 }}
        className={cn(
          "fixed inset-0 flex flex-col bg-background transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Sticky header — visible only when scrolled past hero */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 z-10 flex items-center gap-3 px-4 py-3 bg-sky-700 transition-opacity duration-200",
            isHeaderStuck ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <button onClick={onClose} aria-label="Back" className="p-1 text-white">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-[16px] leading-tight truncate">{profile.name}</p>
            <p className="text-sky-200 text-xs">online</p>
          </div>
          <button aria-label="Search" className="p-1 text-white">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="More options" className="p-1 text-white">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">

          {/* Hero cover photo */}
          <div className="relative h-72 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
            {coverUrl ? (
              <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
            ) : profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center">
                <span className="text-white text-7xl font-bold opacity-30">{profile.name.charAt(0)}</span>
              </div>
            )}

            {/* Back button */}
            <button
              onClick={onClose}
              aria-label="Back"
              className="absolute top-4 left-4 p-1.5 rounded-full bg-black/30 text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Top right icons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-white/80 text-sm font-medium">1/21</span>
              <button aria-label="QR" className="p-1 text-white/80">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="3" height="3" />
                  <rect x="18" y="14" width="3" height="3" />
                  <rect x="14" y="18" width="3" height="3" />
                  <rect x="18" y="18" width="3" height="3" />
                </svg>
              </button>
              <button aria-label="More" className="p-1 text-white/80">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            {/* Name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 bg-gradient-to-t from-black/70 to-transparent pt-12">
              <h1 className="text-white text-2xl font-bold leading-tight">{profile.name}</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">D</span>
                </div>
                <span className="text-white/70 text-sm">public photo</span>
              </div>
            </div>

            {/* Camera FAB */}
            <button
              onClick={() => coverInputRef.current?.click()}
              aria-label="Change cover photo"
              className="absolute bottom-4 right-4 w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center shadow-lg active:bg-sky-600 transition-colors"
            >
              <Camera className="h-6 w-6 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                <span className="text-sky-500 text-[10px] font-bold">+</span>
              </span>
            </button>
            <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </div>

          {/* Account section */}
          <div className="bg-card">
            <p className="px-4 pt-5 pb-2 text-sky-400 text-[13px] font-semibold tracking-wide uppercase">Account</p>

            {/* Phone */}
            <button className="w-full px-4 py-3.5 flex flex-col items-start border-b border-border/40 hover:bg-secondary/30 transition-colors active:bg-secondary/50">
              <span className="text-[15px] text-foreground font-medium">Mobile hidden</span>
              <span className="text-[13px] text-muted-foreground mt-0.5">Tap to change phone number</span>
            </button>

            {/* Username */}
            <button className="w-full px-4 py-3.5 flex flex-col items-start border-b border-border/40 hover:bg-secondary/30 transition-colors active:bg-secondary/50">
              <span className="text-[15px] text-foreground font-medium">{profile.username}</span>
              <span className="text-[13px] text-muted-foreground mt-0.5">Username</span>
            </button>

            {/* DC */}
            <button className="w-full px-4 py-3.5 flex flex-col items-start border-b border-border/40 hover:bg-secondary/30 transition-colors active:bg-secondary/50">
              <span className="text-[15px] text-foreground font-medium">6121637257</span>
              <span className="text-[13px] text-muted-foreground mt-0.5">DC5, Singapore, SG</span>
            </button>

            {/* Bio */}
            <button className="w-full px-4 py-3.5 flex flex-col items-start hover:bg-secondary/30 transition-colors active:bg-secondary/50">
              <span className="text-[15px] text-foreground font-medium text-left leading-relaxed">
                {profile.bio.split("@").map((part, i) =>
                  i === 0 ? part : (
                    <span key={i}>
                      <span className="text-sky-400">@{part.split(" ")[0]}</span>
                      {" " + part.split(" ").slice(1).join(" ")}
                    </span>
                  )
                )}
              </span>
              <span className="text-[13px] text-muted-foreground mt-0.5">Bio</span>
            </button>
          </div>

          {/* Settings section */}
          <div className="bg-card mt-3">
            <p className="px-4 pt-5 pb-2 text-sky-400 text-[13px] font-semibold tracking-wide uppercase">Settings</p>

            {settingsItems.map(({ icon: Icon, label, value, valueColor }, i) => (
              <button
                key={label}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-4 hover:bg-secondary/30 transition-colors active:bg-secondary/50",
                  i < settingsItems.length - 1 && "border-b border-border/40"
                )}
              >
                <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="flex-1 text-left text-[15px] text-foreground">{label}</span>
                {value && (
                  <span className={cn("text-[14px] font-medium", valueColor ?? "text-muted-foreground")}>
                    {value}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Premium section */}
          <div className="bg-card mt-3 mb-8">
            {premiumItems.map(({ label, isPremium, isStars, isBusiness, isGift }, i) => (
              <button
                key={label}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-4 hover:bg-secondary/30 transition-colors active:bg-secondary/50",
                  i < premiumItems.length - 1 && "border-b border-border/40"
                )}
              >
                {/* Custom icons for premium items */}
                {isPremium && (
                  <Star className="h-5 w-5 text-violet-400 fill-violet-400 flex-shrink-0" />
                )}
                {isStars && (
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400 flex-shrink-0" />
                )}
                {isBusiness && (
                  <Building2 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                {isGift && (
                  <Gift className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className="flex-1 text-left text-[15px] text-foreground">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
