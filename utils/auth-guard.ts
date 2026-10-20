import { auth } from "@/auth";
import { ResponseError } from "@/lib/responseHandler";
import { Session } from "next-auth";

type AuthenticatedHandler = (
  req: Request,
  user: NonNullable<Session["user"]>
) => Promise<Response>;

export const withAuth = (handler: AuthenticatedHandler) => {
  return async (req: Request): Promise<Response> => {
    const session = await auth();

    if (!session?.user) {
      return ResponseError("Unauthorized Access, Please Login", 401);
    }

    return handler(req, session.user);
  };
};