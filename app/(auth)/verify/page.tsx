"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Button from "@/components/ui/button";
import OtpInput from "@/components/OtpInput";
import { generateOtp, generateToken } from "@/lib/utils";
import { PenLineIcon, VerifiedIcon } from "lucide-react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useOtpStore } from "@/lib/store/useOtpStore";

const Page = () => {
  const router = useRouter();
  const { user, error, setOtp, setError, clearOtp, clearUser } = useOtpStore();
  const { getSessionItem, setSessionItem, removeSessionItem } =
    useSessionStorage();
  const storedOtp =
    typeof window !== "undefined" ? getSessionItem("otp") : null;

  useEffect(() => {
    if (!storedOtp) {
      router.push("/login");
    }

    return () => clearOtp();
  }, [clearOtp, storedOtp, router]);

  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const handleOtpComplete = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      if (value == storedOtp) {
        setSessionItem("token", generateToken());
        setVerified(true);
        router.push("/");
      } else {
        setError("Invalid OTP. Try again.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleResend = () => {
    const res = generateOtp();
    if (!res) throw new Error("OTP not generated!");
    setOtp(res);
    setSessionItem("otp", res);
    toast.success("OTP re-sent to your number");
  };

  const handleGoBack = () => {
    router.push("login");
    removeSessionItem("otp");
    clearOtp();
    clearUser();
  };

  const handleShowOtp = () => {
    toast(
      <div className="text-sm">
        <h3 className="text-xl font-medium py-1">{storedOtp}</h3>
        Displaying the OTP like this is considered a
        <strong> bad practice</strong>. However, for this implementation, I need
        to generate the OTP randomly and protect the verification route.
        <strong>
          The OTP is being accessed securely from the session store.
        </strong>
      </div>
    );
  };

  return (
    <>
      <p className="text-sm text-neutral-800 dark:text-neutral-100 w-full flex items-center gap-2 pt-10 sm:pt-0">
        Change the phone number?
        <span className="text-blue-500 pl-2">{user?.phone}</span>
        <PenLineIcon
          size={16}
          className="cursor-pointer"
          onClick={handleGoBack}
        />
      </p>
      <h2 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-50">
        Enter OTP
      </h2>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        We sent an OTP to your phone.
      </p>

      <OtpInput onComplete={handleOtpComplete} />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {loading && <p className="text-sm text-yellow-500">Verifying...</p>}
      {verified && (
        <p className="text-sm text-green-500 flex items-center gap-2">
          Verified <VerifiedIcon size={16} className="text-green-500" />
        </p>
      )}

      <div className="flex items-center gap-2 w-full">
        <p className="text-left text-neutral-700 dark:text-neutral-50 grow text-sm">
          Didn&apos;t receive your OTP?
        </p>
        <Button
          type="button"
          onClick={handleResend}
          className="w-fit text-xs p-1"
        >
          Resend OTP
        </Button>
      </div>
      <p className="text-xs text-neutral-700 dark:text-neutral-50 absolute top-5 right-3 capitalize">
        its bad practice but,
        <span
          onClick={handleShowOtp}
          className="bg-blue-500 py-1 px-2 rounded ml-2 cursor-pointer"
        >
          your OTP
        </span>
      </p>
    </>
  );
};

export default Page;
