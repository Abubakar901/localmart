"use client"; 

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shopSchema, ShopFormValues } from "@/validators/shops";

import { BasicInfoSection } from "@/components/Shops/CreateShop/BasicInfoSection";
import { ImagesSection } from "@/components/Shops/CreateShop/ImagesSection";
import { LocationSection } from "@/components/Shops/CreateShop/LocationSection";
import { SettingsSection } from "@/components/Shops/CreateShop/SettingsSection";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DAYS_OF_WEEK } from "@/lib/constants";

export const CreateShopPage = () => {
const methods = useForm<ShopFormValues>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      shopName: "",
      category: "",
      contactNumber: "",
      address: { fullAddress: "", city: "", state: "", pinCode: "" },
      isDeliveryAvailable: false,
      openingHours: {
        is24x7: false,
        schedule: DAYS_OF_WEEK.map((day) => ({
          day,
          isClosed: false,
          open: "09:00",
          close: "21:00",
        })),
      },
      images: [],
    },
  });

  const onSubmit = async (data: ShopFormValues) => {
    try {
      const response = await fetch("/api/shops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to create shop");

      alert("Shop created successfully!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const progress = 59;
  return (
    <FormProvider {...methods}>
    <main className="pt-8 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Shop
          </h1>
          <p className="text-gray-600">
            Get your shop online in minutes. Fill in the details below to get
            started.
          </p>
        </header>

        <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <BasicInfoSection />
            <LocationSection />
          </div>
          <div>
            <SettingsSection />
            <ImagesSection />
          </div>
        </form>
      </div>
      <footer
        className="fixed bottom-0 left-0 right-0 px-4 py-6 bg-white"
        style={{ boxShadow: "0 -6px 16px 0 rgba(0,0,0,0.2)" }}
      >
        <div className="flex items-center justify-center space-x-4 max-w-6xl mx-auto ">
          <ProgressBar value={progress} />
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {progress}%
          </span>
        </div>
      </footer>
    </main>
    </FormProvider>
  );
};
