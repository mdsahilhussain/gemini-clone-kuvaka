/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useState } from "react";

import Input from "./ui/input";
import { useOtpStore } from "@/lib/store/useOtpStore";

type Props = {
  onComplete: (otp: string) => void;
};

const OtpInput = ({ onComplete }: Props) => {
  const [otpArray, setOtpArray] = useState<string[]>(["", "", "", ""]);
  const { setError, setOtp } = useOtpStore();

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otpArray];
    updated[index] = value;
    setOtpArray(updated);
    setError("");

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }

    const joined = updated?.join("");
    setOtp(joined);
    if (joined?.length === 4) onComplete(joined);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number
  ) => {
    if (e.key === "Backspace") {
      if (otpArray[i] === "" && i > 0) {
        const updated = [...otpArray];
        updated[i - 1] = "";
        setOtpArray(updated);
        const prev = document.getElementById(`otp-${i - 1}`);
        prev && (prev as HTMLInputElement).focus();
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {otpArray?.map((digit, i) => (
        <Input
          key={i}
          id={`otp-${i}`}
          value={digit}
          onChange={(e) => handleChange(i, e.target?.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-12 h-12 text-center text-lg border border-neutral-300 dark:border-neutral-600 rounded bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-50"
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default OtpInput;
