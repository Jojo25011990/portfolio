export default function detectBrowsers() {
  // ***  User Agent | Firefox | Safari ***
  const userNavigatorAgent: string = navigator.userAgent;

  const isFirefox: boolean = userNavigatorAgent.includes('Firefox');

  const isSafari: boolean =
    userNavigatorAgent.includes('Safari') &&
    !userNavigatorAgent.includes('Chrome') &&
    !userNavigatorAgent.includes('Chromium') &&
    !userNavigatorAgent.includes('Edg') &&
    !userNavigatorAgent.includes('OPR');

  return isFirefox || isSafari;
  // ***  End of User Agent | Firefox | Safari ***
}
