import { useEffect, useState } from 'react';
import { RudderAnalytics } from '@rudderstack/analytics-js';

const useRudderStackAnalytics = (): RudderAnalytics | undefined => {
  const [analytics, setAnalytics] = useState<RudderAnalytics>();

  const rsWriteKey = import.meta.env.VITE_RS_WRITE_KEY;
  const rsDataPlane = import.meta.env.VITE_RS_DATA_PLANE;

  useEffect(() => {
    if (!analytics && typeof window !== 'undefined') {
      const analyticsInstance = new RudderAnalytics();
      analyticsInstance.load(rsWriteKey, rsDataPlane);

      analyticsInstance.ready(() => {
        setAnalytics(analyticsInstance); 
      });
    }
  }, [analytics]);

  return analytics;
};

export default useRudderStackAnalytics;
