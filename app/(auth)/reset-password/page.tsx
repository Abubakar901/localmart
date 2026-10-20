import { AuthLayout } from "@/components/Auth/AuthLayout";
import { ResetPasswordForm } from "@/components/Auth/ResetPassword";

const ForgotPassword = () => {
  return (
    <AuthLayout title="Almost there," subtitle="set a new password">
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
