import { AuthLayout } from "@/components/Auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/Auth/ForgotPassword";

const ForgotPassword = () => {
  return (
    <AuthLayout title="Welcome back" subtitle="to your Neighbourhood">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
