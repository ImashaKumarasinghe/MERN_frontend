import { useState } from "react";

export default function ForgetPasswordPage() {
    const [otpSent, setotp] = useState(false)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
      
    </div>
  );
}