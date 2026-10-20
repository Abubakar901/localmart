import { useId, type ReactNode } from "react";

import { Card } from "@/components/ui/Card";

type FormSectionProps = {
  title: string;
  required?: boolean;
  children: ReactNode;
};

export const FormSection = ({ title, required, children }: FormSectionProps) => {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <Card className="mb-4">
        <h2 id={headingId} className="text-lg font-semibold text-gray-900 mb-6">
          {title}
          {required && <span className="text-red-500"> *</span>}
        </h2>

        <div className="space-y-5">{children}</div>
      </Card>
    </section>
  );
};