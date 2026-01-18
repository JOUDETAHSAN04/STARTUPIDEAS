import { Suspense } from "react";
import SessionScreen from "@/components/screens/SessionScreen";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="h-screen w-screen bg-black" />}
    >
      <SessionScreen />
    </Suspense>
  );
}
