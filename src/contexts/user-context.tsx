
import { createContext, useContext, useState, ReactNode } from "react"

export interface UserProfile {
  name: string
  username: string
  phone: string
  bio: string
  birthday: string
  avatarUrl: string | null
  personalChannel: string
  nameColor: string
}

interface UserContextType {
  profile: UserProfile
  updateProfile: (updates: Partial<UserProfile>) => void
  setAvatarUrl: (url: string | null) => void
}

const defaultProfile: UserProfile = {
  name: "मेहर मानकर",
  username: "@Meher_Mankar",
  phone: "+91 84597 70125",
  bio: "AFK | Busy | Curiosity might be my biggest weakness. @ACCBAZAARR",
  birthday: "2001-08-29",
  avatarUrl: null,
  personalChannel: "Lossless music collection [...]",
  nameColor: "#ff6b9d",
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const setAvatarUrl = (url: string | null) => {
    setProfile((prev) => ({ ...prev, avatarUrl: url }))
  }

  return (
    <UserContext.Provider value={{ profile, updateProfile, setAvatarUrl }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

// Helper to format birthday for display
export function formatBirthday(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

// Helper to calculate age
export function calculateAge(dateString: string): number {
  if (!dateString) return 0
  const birthday = new Date(dateString)
  const today = new Date()
  let age = today.getFullYear() - birthday.getFullYear()
  const monthDiff = today.getMonth() - birthday.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    age--
  }
  return age
}
