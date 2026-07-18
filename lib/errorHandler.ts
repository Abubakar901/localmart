import { NextResponse } from "next/server";

type Handler = (req: Request, ctx?: any) => Promise<Response>;

export const withErrorHandler = (handler: Handler): Handler => {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err?.message || "Something went wrong" },
        { status: 500 }
      );
    }
  };
}