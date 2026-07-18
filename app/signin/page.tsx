import { AuthLayout } from "@/components/Auth/AuthLayout";
import { SignInForm } from "@/components/Auth/SignIn";

const SignIn = () => {
  return (
    <AuthLayout title="Welcome back" subtitle="to your Neighbourhood">
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
