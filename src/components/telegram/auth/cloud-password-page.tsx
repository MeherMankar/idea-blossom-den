
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface CloudPasswordPageProps {
  isOpen: boolean
  onSubmit: () => void
}

export function CloudPasswordPage({ isOpen, onSubmit }: CloudPasswordPageProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = () => {
    if (password.length > 0) {
      onSubmit()
    }
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
        <h1 className="text-2xl font-semibold text-foreground mb-3">Cloud password check</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Please enter your cloud password.
        </p>

        {/* Password Input */}
        <div className="mb-4">
          <label className="text-primary text-sm font-medium mb-2 block">
            Your cloud password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-foreground border-b-2 border-primary pb-2 focus:outline-none pr-10"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 bottom-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Hint */}
        <p className="text-muted-foreground text-sm mb-2">
          Hint: <span className="text-foreground">patil</span>
        </p>

        {/* Forgot Password Link */}
        <button className="text-primary hover:text-primary/80 transition-colors text-sm font-medium text-left mb-10">
          Forgot password?
        </button>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={password.length === 0}
          className={cn(
            "w-full py-4 rounded-lg font-medium text-base transition-all",
            password.length > 0
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-primary/50 text-primary-foreground/70 cursor-not-allowed"
          )}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
