import { NextResponse } from "next/server";

export function ResponseJson(data: Record<string, any> = {}, status = 200) {
  return NextResponse.json({ ...data }, { status });
}

export function ResponseError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}