
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhoneLoginPageProps {
  isOpen: boolean
  onBack: () => void
  onNext: (phone: string) => void
  onQRLogin: () => void
}

const countries = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
]

export function PhoneLoginPage({ isOpen, onBack, onNext, onQRLogin }: PhoneLoginPageProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)

  const handleNext = () => {
    if (phoneNumber.length >= 10) {
      onNext(`${selectedCountry.code} ${phoneNumber}`)
    }
  }

  const formatPhoneDisplay = (value: string) => {
    // Format as _____ _____
    const digits = value.replace(/\D/g, "").slice(0, 10)
    if (digits.length <= 5) return digits
    return `${digits.slice(0, 5)} ${digits.slice(5)}`
  }

  return (
    <div
      style={{ zIndex: 80 }}
      className={cn(
        "fixed inset-0 bg-background flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold text-foreground mb-3">Your Phone Number</h1>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          Please confirm your country code<br />and enter your phone number.
        </p>

        {/* Country Selector */}
        <div className="relative mb-6">
          <button
            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
            className="w-full flex items-center justify-between py-3 border-b border-border/50 text-foreground hover:border-primary/50 transition-colors"
          >
            <span className="text-base">{selectedCountry.name}</span>
            <ChevronDown className={cn(
              "h-5 w-5 text-muted-foreground transition-transform",
              isCountryDropdownOpen && "rotate-180"
            )} />
          </button>

          {/* Country Dropdown */}
          {isCountryDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl max-h-60 overflow-y-auto z-10">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => {
                    setSelectedCountry(country)
                    setIsCountryDropdownOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left",
                    selectedCountry.code === country.code && "bg-secondary/30"
                  )}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="flex-1 text-foreground">{country.name}</span>
                  <span className="text-muted-foreground text-sm">{country.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <div className="flex items-center gap-4 mb-10">
          <div className="text-foreground text-lg font-medium border-b border-primary pb-2 px-1">
            {selectedCountry.code}
          </div>
          <div className="flex-1 relative">
            <input
              type="tel"
              value={formatPhoneDisplay(phoneNumber)}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="— — — — —   — — — — —"
              className="w-full bg-transparent text-foreground text-lg border-b border-border/50 pb-2 focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/50 placeholder:tracking-widest"
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={phoneNumber.length < 10}
          className={cn(
            "w-full py-4 rounded-lg font-medium text-base transition-all",
            phoneNumber.length >= 10
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-primary/50 text-primary-foreground/70 cursor-not-allowed"
          )}
        >
          Next
        </button>

        {/* QR Code Link */}
        <button
          onClick={onQRLogin}
          className="mt-6 text-primary hover:text-primary/80 transition-colors text-sm font-medium text-center"
        >
          Quick log in using QR code
        </button>
      </div>

      {/* Footer */}
      <div className="py-4 text-center">
        <p className="text-xs text-muted-foreground">AyuGram Desktop v6.7.8 x64</p>
      </div>
    </div>
  )
}
