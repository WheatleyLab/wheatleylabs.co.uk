function sendToGoogleAnalytics({name, value}) {
  if (gtag) gtag('event', name, { value });
  else console.warn('gtag failed to load.')
}

export {
  sendToGoogleAnalytics
}