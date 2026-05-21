import { useEffect, useState } from "react"
import { QRLoginPage } from "./qr-login-page"
import { PhoneLoginPage } from "./phone-login-page"
import { OTPPage } from "./otp-page"
import { CloudPasswordPage } from "./cloud-password-page"

type AuthStep = "qr" | "phone" | "otp" | "password" | null

interface AuthFlowProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AuthFlow({ isOpen, onClose, onSuccess }: AuthFlowProps) {
  const [step, setStep] = useState<AuthStep>(null)
  const [phoneNumber, setPhoneNumber] = useState("")

  // Reset to QR page when opening (effect, not during render)
  useEffect(() => {
    if (isOpen && step === null) setStep("qr")
  }, [isOpen, step])

  const handleClose = () => {
    setStep(null)
    setPhoneNumber("")
    onClose()
  }

  const handleSuccess = () => {
    setStep(null)
    setPhoneNumber("")
    onSuccess()
  }

  return (
    <>
      <QRLoginPage
        isOpen={isOpen && step === "qr"}
        onClose={handleClose}
        onPhoneLogin={() => setStep("phone")}
        onQRScanned={() => setStep("password")}
      />
      <PhoneLoginPage
        isOpen={isOpen && step === "phone"}
        onBack={() => setStep("qr")}
        onNext={(phone) => {
          setPhoneNumber(phone)
          setStep("otp")
        }}
        onQRLogin={() => setStep("qr")}
      />
      <OTPPage
        isOpen={isOpen && step === "otp"}
        phoneNumber={phoneNumber}
        onNext={() => setStep("password")}
      />
      <CloudPasswordPage
        isOpen={isOpen && step === "password"}
        onSubmit={handleSuccess}
      />
    </>
  )
}
