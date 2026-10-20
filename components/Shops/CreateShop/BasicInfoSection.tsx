"use client";

import { useFormContext } from "react-hook-form";
import { ShopFormValues } from "@/validators/shops";
import { FormSection } from "@/components/Shops/CreateShop/FormLayout";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export const BasicInfoSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ShopFormValues>();

  return (
    <FormSection title="Basic Information">
      <div className="space-y-4">
        <Input
          label="Shop Name"
          required
          placeHolder="Enter your shop name"
          type="text"
          error={errors.shopName?.message}
          {...register("shopName")}
        />

        <Input
          label="Contact Number"
          required
          placeHolder="+91"
          type="text"
          error={errors.contactNumber?.message}
          {...register("contactNumber")}
        />

        <Input
          label="Category"
          required
          placeHolder="e.g. Grocery, Bakery, Bookstore..."
          type="text"
          error={errors.category?.message}
          {...register("category")}
        />

        <Textarea
          label="Description"
          required
          placeHolder="Tell customers about your shop..."
          rows={4}
          error={errors.description?.message}
          {...register("description")}
        />
      </div>
    </FormSection>
  );
};
