import type { GTMEvent } from './gtm.types';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

declare global {
  interface Window {
    dataLayer: GTMEvent[];
  }
}

function pushToDataLayer(event: GTMEvent) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function sendPageView(page: string, title?: string) {
  pushToDataLayer({ event: 'page_view', page, title });
}

export function sendCtaClick(cta_label: string, cta_location: string, cta_url?: string) {
  pushToDataLayer({ event: 'cta_click', cta_label, cta_location, cta_url });
}
