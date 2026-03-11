interface PageViewEvent {
  event: 'page_view';
  page: string;
  title?: string;
}

interface CtaClickEvent {
  event: 'cta_click';
  cta_label: string;
  cta_location: string;
  cta_url?: string;
}

interface FormSubmitEvent {
  event: 'form_submit';
  form_name: string;
  form_status: 'success' | 'error';
}

export type GTMEvent = PageViewEvent | CtaClickEvent | FormSubmitEvent;
