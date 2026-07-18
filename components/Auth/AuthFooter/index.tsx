import Link from "next/link";

import { GoogleSignInButton } from "@/components/Auth/GoogleSignInButton";

type AuthFooterProps = {
  linkConfig: { preText: string; hrefText: string; href: string };
  showSocial?: boolean;
  showTerms?: boolean;
};

export const AuthFooter = ({
  linkConfig,
  showSocial,
  showTerms,
}: AuthFooterProps) => {
  return (
    <>
      {linkConfig && (
        <p className="mt-4 text-sm text-center text-gray-500">
          {linkConfig.preText}{" "}
          <Link
            href={linkConfig.href}
            className="text-green-600 hover:underline"
          >
            {linkConfig.hrefText}
          </Link>
        </p>
      )}

      {showSocial && (
        <>
          <div className="my-6 flex items-center gap-3 text-gray-400 text-sm">
            <div className="h-px flex-1 bg-gray-200" />
            or
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <GoogleSignInButton />
        </>
      )}

      {showTerms && (
        <p className="mt-6 text-sm text-gray-400 text-center leading-relaxed">
          By continuing, you agree to LocalMart&apos;s <br />
          <Link href="#" className="text-green-600 hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-green-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      )}
    </>
  );
};
