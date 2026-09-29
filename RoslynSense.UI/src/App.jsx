import { lazy, Suspense, useEffect } from "react";
import { LoaderCircle, ShieldCheck } from "lucide-react";

const MainLayout = lazy(() => import("./components/layout/MainLayout"));

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#09090B]">

      <div className="flex flex-col items-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl shadow-violet-600/30">

          <ShieldCheck
            size={42}
            className="text-white"
          />

        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">
          RoslynSense AI
        </h1>

        <p className="mt-2 text-zinc-500">
          Preparing your AI workspace...
        </p>

        <LoaderCircle
          size={28}
          className="mt-8 animate-spin text-violet-400"
        />

      </div>

    </div>
  );
}

export default function App() {
   
  return (
    <Suspense fallback={<LoadingScreen />}>
      <MainLayout />
    </Suspense>
  );
}