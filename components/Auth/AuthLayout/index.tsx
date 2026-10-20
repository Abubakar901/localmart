import Image from "next/image";

import LocolMartLogo from "@/public/localMart-white-logo.svg";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
};

export const AuthLayout = ({
  children,
  title = "Your Neighbourhood",
  subtitle = "at your Fingertip.",
}: AuthLayoutProps) => {
  return (
    <main className="min-h-screen w-full flex">
      <aside className="hidden md:flex md:w-1/2 bg-green-600 relative overflow-hidden flex-col justify-between p-10">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/auth-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.8,
          }}
        />

        <div className="flex items-center z-10">
          <Image src={LocolMartLogo} alt="localMart logo" />
          <h1 className="text-white text-2xl font-bold ml-3">localMart</h1>
        </div>

        <div className="z-10">
          <h2 className="text-white text-5xl font-bold leading-tight mb-4">
            {title} <br /> {subtitle}
          </h2>

          <p className="text-white/90 text-3xl font-medium leading-relaxed mb-6">
            Connect with local shops and sellers. Buy fresh, think local, support your community.
          </p>

          <div className="relative w-full h-64 opacity-80">
            <div className="absolute w-32 h-32 bg-amber-600 rounded-full top-0 left-0"></div>
            <div className="absolute w-48 h-24 bg-teal-700 rounded-3xl bottom-10 left-10"></div>
            <div className="absolute w-20 h-20 bg-orange-700 rounded-full top-20 right-20"></div>
          </div>
        </div>
        <p className="text-white/80 text-sm relative z-10">
          Stores open near you right now
        </p>
      </aside>

      <section className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-[450px] p-6 bg-white rounded-xl shadow-xl">
          {children}
        </div>
      </section>
    </main>
  );
};
