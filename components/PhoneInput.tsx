/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import axios from "axios";
import Input from "./ui/input";

type phoneInputProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

interface CountryTypes {
  name: string;
  code: string;
  dial_code: string;
}

const PhoneInput = ({ register, errors }: phoneInputProps) => {
  const [countries, setCountries] = useState<CountryTypes[]>([]);

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,cca2,idd",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const mapped = res.data
        ?.filter((c: any) => c.idd?.root && c.idd?.suffixes?.length)
        ?.map((c: any) => ({
          name: c?.name?.common,
          code: c?.cca2,
          dial_code: `${c?.idd?.root}${c?.idd?.suffixes[0]}`,
        }));

      setCountries(mapped);
    } catch (error) {
      console.error("Country fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="country-code"
          className="block text-sm mb-1 text-neutral-800 dark:text-neutral-100"
        >
          Country Code
        </label>
        <select
          {...register("countryCode")}
          id="country-code"
          className="inputField"
        >
          <option value="">Select Country</option>
          {countries?.map((c: CountryTypes, i: number) => (
            <option key={i} value={c?.dial_code}>
              {c?.name} ({c?.dial_code})
            </option>
          ))}
        </select>
        {errors?.countryCode && (
          <p className="text-red-500 text-sm">
            {errors.countryCode?.message as string}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="phone-number"
          className="block text-sm mb-1 text-gray-700 dark:text-gray-100"
        >
          Phone Number
        </label>
        <Input
          {...register("phone")}
          id="phone-number"
          type="tel"
          placeholder="Enter your number"
        />
        {errors?.phone && (
          <p className="text-red-500 text-sm">
            {errors.phone?.message as string}
          </p>
        )}
      </div>
    </>
  );
};

export default PhoneInput;
