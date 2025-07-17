"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useOtpStore } from "@/lib/store/useOtpStore";
import { generateOtp } from "@/lib/utils";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import PhoneInput from "@/components/PhoneInput";
import Button from "@/components/ui/button";

const schema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?\d{10,15}$/, "Invalid phone number"),
  countryCode: z.string().min(1, "Select country code"),
});

type FormData = z.infer<typeof schema>;

const Page = () => {
  const router = useRouter();
  const { getSessionItem, setSessionItem } = useSessionStorage();

  const token = typeof window !== "undefined" ? getSessionItem("token") : null;

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useOtpStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    if (!data) return;
    try {
      setLoading(true);
      const res = generateOtp();
      if (!res) throw new Error("OTP not generated!");
      setSessionItem("otp", res);
      toast.success("OTP sent to your number");
      setUser(data);
      setTimeout(() => {
        router.push("/verify");
      }, 2000);
    } catch (errors) {
      console.error((errors as Error).message);
      toast.error((errors as Error).message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <h2 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-50">
        Login with Phone
      </h2>
      <PhoneInput register={register} errors={errors} />
      <Button type="submit" className="mt-4 w-full">
        {loading ? "Sending OTP" : "Send OTP"}
      </Button>
    </form>
  );
};

export default Page;
