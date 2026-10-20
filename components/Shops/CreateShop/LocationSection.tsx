"use client";

import { State } from "country-state-city";

import { useFormContext } from "react-hook-form";
import { ShopFormValues } from "@/validators/shops";
import { FormSection } from "@/components/Shops/CreateShop/FormLayout";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";

export const LocationSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ShopFormValues>();

  const indianStates = State.getStatesOfCountry("IN").map((state) => ({
  label: state.name,
  value: state.name,
}));

  return (
    <FormSection title="Location Details">
      <div className="space-y-4">
        {/* 1. Full Address Textarea */}
        <Textarea
          label="Full Address"
          required
          placeHolder="Street address, building name, landmark..."
          rows={3}
          error={errors.address?.fullAddress?.message}
          {...register("address.fullAddress")}
        />

        {/* 2. City, State, Pincode Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* City */}
          <Input
            label="City"
            required
            placeHolder="City name"
            type="text"
            error={errors.address?.city?.message}
            {...register("address.city")}
          />

          {/* State Dropdown */}
          <Select
            label="State"
            required
            placeholder="Select state"
            options={indianStates}
            error={errors.address?.state?.message}
            {...register("address.state")}
          />

          {/* Pincode */}
          <Input
            label="Pincode"
            required
            placeHolder="6-digit pincode"
            type="text"
            maxLength={6}
            error={errors.address?.pinCode?.message}
            {...register("address.pinCode")}
          />
        </div>
      </div>
    </FormSection>
  );
};
