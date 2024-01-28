import { useEffect } from 'react';
import { gtm } from '@/libs/gtm';

export function useAnalytics(config) {
  useEffect(() => {
    gtm.initialize(config);
  }, [config]);
}
