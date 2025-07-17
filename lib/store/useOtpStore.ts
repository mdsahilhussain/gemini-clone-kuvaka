import { create } from "zustand";

type User = {
  phone: string;
  countryCode: string;
};
type OtpStore = {
  user: User;
  setUser: (val: User) => void;
  otp: string;
  setOtp: (val: string) => void;
  error: string;
  setError: (val: string) => void;
  clearOtp: () => void;
  clearUser: () => void;
};

export const useOtpStore = create<OtpStore>((set) => ({
  user: { phone: "", countryCode: "" },
  setUser: (val) => set({ user: val }),
  otp: "",
  setOtp: (val) => set({ otp: val }),
  error: "",
  setError: (val) => set({ error: val }),
  clearOtp: () => set({ otp: "", error: "" }),
  clearUser: () => set({ user: { phone: "", countryCode: "" } }),
}));
