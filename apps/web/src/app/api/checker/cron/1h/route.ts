import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { cron, isAuthorizedDomain } from "../_cron";
import { runSentryCron } from "../_sentry";

export const runtime = "nodejs";
// export const preferredRegion = ["auto"];
export const dynamic = "force-dynamic";
export const maxDuration = 300;
export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (isAuthorizedDomain(req.url)) {
    const { cronCompleted, cronFailed } = runSentryCron("1-h-cron");
    try {
      await cron({ periodicity: "1h", req });
      await cronCompleted();
    } catch (_error) {
      await cronFailed();
    }
  }
  return NextResponse.json({ success: true });
}
