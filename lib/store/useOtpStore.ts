import { create } from 'zustand'

type OtpStore = {
  otp: string
  setOtp: (val: string) => void
  error: string
  setError: (val: string) => void
  clearOtp: () => void
}

export const useOtpStore = create<OtpStore>((set) => ({
  otp: '',
  setOtp: (val) => set({ otp: val }),
  error: '',
  setError: (val) => set({ error: val }),
  clearOtp: () => set({ otp: '', error: '' }),
}))