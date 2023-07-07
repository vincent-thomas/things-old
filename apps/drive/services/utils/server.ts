import { NextResponse } from "next/server";

export const AResponse = (
  data: unknown,
  error: unknown = null,
  conf?: ResponseInit
) => {
  return NextResponse.json(
    {
      timestamp: Date.now(),
      data,
      error,
      status: error ? "error" : "success",
    },
    conf
  );
};
