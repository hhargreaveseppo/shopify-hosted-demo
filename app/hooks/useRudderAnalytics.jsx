import {useEffect, useState} from 'react';
import {useLocation} from '@remix-run/react';
import {RudderAnalytics} from '@rudderstack/analytics-js';

const rsWriteKey = import.meta.env.VITE_RS_WRITE_KEY;
const rsDataPlane = import.meta.env.VITE_RS_DATA_PLANE;

export default function RudderStackTracker() {
  const [analytics, setAnalytics] = useState(null);
  const [hasConsent, setHasConsent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkConsent = async () => {
      try {
        const consent = await window?.Shopify?.customerPrivacy?.getTrackingConsent?.();
        if (consent?.analytics) {
          setHasConsent(true);
        }
      } catch (err) {
        console.warn('Consent check failed:', err);
      }
    };

    checkConsent();
  }, []);

  useEffect(() => {
    if (!hasConsent || analytics || typeof window === 'undefined') return;

    const ra = new RudderAnalytics();
    ra.load(rsWriteKey, rsDataPlane);
    ra.ready(() => {
      console.log('✅ Rudderstack initialized');
      setAnalytics(ra);
    });
  }, [hasConsent]);

  useEffect(() => {
    if (analytics && hasConsent) {
      analytics.page();
    }
  }, [analytics, hasConsent, location.pathname]);

  return null;
}

