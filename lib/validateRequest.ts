import { type ZodType } from "zod";

import { ResponseJson } from "@/lib/responseHandler";

export async function validateRequest<T>(
  schema: ZodType<T>,
  body: unknown,
): Promise<{ data: T; error: null } | { data: null; error: Response }> {
  const result = schema.safeParse(body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      message: issue.message,
    }));
    return { data: null, error: ResponseJson({ errors }, 400) };
  }

  return { data: result.data, error: null };
}
