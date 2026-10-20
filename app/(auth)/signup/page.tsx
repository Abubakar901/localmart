import { AuthLayout } from "@/components/Auth/AuthLayout";
import { SignUpForm } from "@/components/Auth/SignUp";

const SignUp = () => {
  return (
    <AuthLayout title="Join your" subtitle="Neighbourhood">
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
