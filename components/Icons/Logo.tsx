import Image from "next/image";

import LocalMartLogoGreen from "@/public/localMart-green-logo.svg";

export const AuthPageLogo = () => {
  return (
    <div className="flex items-center justify-center mb-6 md:hidden">
      <Image src={LocalMartLogoGreen} alt="localMart" />
      <h1 className="text-primary text-2xl font-bold ml-3">localMart</h1>
    </div>
  );
};
