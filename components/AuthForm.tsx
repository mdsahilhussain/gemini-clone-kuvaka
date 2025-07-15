"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PhoneInput from "./PhoneInput";
import Button from "./ui/button";
import { toast } from "sonner";

const schema = z.object({
  phone: z.string().min(8, "Phone number is too short"),
  countryCode: z.string().min(1, "Select country code"),
});

type FormData = z.infer<typeof schema>;

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    toast.success("OTP sent to your number");

    setTimeout(() => {
      window.location.href = "/auth/verify";
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Login with Phone
      </h2>
      <PhoneInput register={register} errors={errors} />
      <Button type="submit">Send OTP</Button>
    </form>
  );
};

export default AuthForm;
