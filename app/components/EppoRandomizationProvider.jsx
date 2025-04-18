import { useEffect, useState } from "react";
import { init } from "@eppo/js-client-sdk";

export default function EppoRandomizationProvider({
  waitForInitialization = true,
  children,
  loadingComponent = <div>Loading...</div>,
}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const eppoSdkKey = import.meta.env.VITE_EPPO_SDK_KEY;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.rudderanalytics) {
      console.warn("⚠️ Rudderstack global instance not yet available");
      return;
    }

    window.rudderanalytics.ready(() => {
      console.log('✅ Rudderstack ready, initializing Eppo');

      init({
        apiKey: eppoSdkKey,
        assignmentLogger: {
          logAssignment(assignment) {
            console.log("📌 Assignment data:", assignment);

            window.rudderanalytics.track("Experiment Viewed", {
              ...assignment
            });

            console.log("✅ Experiment Viewed event sent to Rudderstack");
          },
        },
      })
      .then(() => {
        setIsInitialized(true);
        console.log("✅ Eppo SDK initialized successfully");
      })
      .catch((err) => {
        console.error("❌ Eppo SDK initialization error:", err);
      });
    });
  }, [eppoSdkKey]);

  if (!waitForInitialization || isInitialized) {
    return children;
  }

  return loadingComponent;
}
