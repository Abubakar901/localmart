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
        <h1 className="text-white text-2xl font-bold">LocalMart</h1>

        <div>
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-tight">
              LM
            </span>
          </div>

          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            {title} <br /> {subtitle}
          </h2>

          <div className="relative w-full h-64 opacity-60">
            <div className="absolute w-32 h-32 bg-amber-600 rounded-full top-0 left-0"></div>
            <div className="absolute w-48 h-24 bg-teal-700 rounded-3xl bottom-10 left-10"></div>
            <div className="absolute w-20 h-20 bg-orange-700 rounded-full top-20 right-20"></div>
          </div>
        </div>
        <p className="text-white/80 text-sm relative z-10">
          Stores open near you right now
        </p>
      </aside>

      <section className="w-full md:w-1/2 flex items-center justify-center p-6">
        {children}
      </section>
    </main>
  );
};
