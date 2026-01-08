import { Suspense } from "react";
import SessionClient from "./session-client";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="h-screen w-screen bg-black" />}
    >
      <SessionClient />
    </Suspense>
  );
}
