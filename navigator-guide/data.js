const NAV_DATA = {
 "groups": [
  {
   "id": "identity",
   "title": "Identity & first impressions",
   "blurb": "The introduction itself: who the browser says you are, in strings."
  },
  {
   "id": "hardware",
   "title": "Hardware & input",
   "blurb": "What the machine underneath looks like: cores, memory, screens, controllers."
  },
  {
   "id": "network",
   "title": "Network & reachability",
   "blurb": "Whether you are connected, how good the connection is, and how to say goodbye reliably."
  },
  {
   "id": "shelf",
   "title": "The capability shelf",
   "blurb": "Things the browser can DO for a site, most of them behind a permission or a tap."
  },
  {
   "id": "bridges",
   "title": "Bridges to the device",
   "blurb": "APIs that reach past the browser to real hardware and other apps."
  },
  {
   "id": "privacy",
   "title": "Privacy & signals",
   "blurb": "The places where you get a say in what the introduction includes."
  },
  {
   "id": "fossils",
   "title": "Legacy & fossils",
   "blurb": "Relics kept alive so that web pages from another century do not break."
  }
 ],
 "entries": [
  {
   "id": "userAgent",
   "name": "userAgent",
   "prop": "userAgent",
   "group": "identity",
   "badge": [
    "Standard",
    "Being reduced"
   ],
   "plain": "The browser's one-line biography of you. Every website receives this string (it also travels as the User-Agent request header) and learns your browser, its version, and your operating system before you see a single pixel.",
   "route": "This is the original content-routing signal. For decades servers have read it to decide which version of a site to deliver: the mobile layout or the desktop one, the Windows download or the Mac one, the full interactive build or the simple fallback.",
   "history": [
    [
     "1993",
     "The first browsers announce themselves in a simple string: browser name, version, platform."
    ],
    [
     "1995 on",
     "Netscape's codename 'Mozilla' becomes the most valuable word on the web. Rival browsers start claiming to BE Mozilla to receive the good content, and the string turns into a pile of impersonations that never gets cleaned up. Internet Explorer famously claimed to be 'Mozilla (compatible)'."
    ],
    [
     "2010s",
     "The string is a fingerprinting goldmine and a parsing swamp. Chrome's string name-drops AppleWebKit, KHTML, Gecko and Safari despite being none of them."
    ],
    [
     "2020",
     "Google announces User-Agent reduction: the string gets frozen and simplified, with the details moved to the opt-in User-Agent Client Hints (see userAgentData). Firefox and Safari pursue similar reductions."
    ],
    [
     "Today",
     "Still sent with every request, still read by servers to route content, but deliberately less informative than it used to be."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Identifying"
  },
  {
   "id": "userAgentData",
   "name": "userAgentData",
   "prop": "userAgentData",
   "group": "identity",
   "badge": [
    "Non-standard",
    "Chromium only"
   ],
   "plain": "The modern, structured replacement for the userAgent string. Instead of one messy sentence, the browser offers tidy labeled facts: brand, mobile or not, platform. The juicy details (exact version, device model) are only handed over when a site asks through getHighEntropyValues and the browser agrees.",
   "route": "Built for routing done politely: a server can ask for exactly the one fact it needs to pick the right content, instead of scraping a whole biography out of a header.",
   "history": [
    [
     "2020",
     "Proposed as User-Agent Client Hints alongside Google's plan to freeze the classic userAgent string."
    ],
    [
     "2021",
     "Ships in Chrome 90 and Edge 90 (per MDN compat data). Safari and Firefox decline to implement it, preferring to reduce what is shared at all."
    ],
    [
     "Today",
     "Chromium-only, so sites must treat it as a progressive enhancement and keep a fallback story."
    ]
   ],
   "tryit": "uadata",
   "compat": {
    "chrome": "90+",
    "edge": "90+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Identifying"
  },
  {
   "id": "platform",
   "name": "platform",
   "prop": "platform",
   "group": "identity",
   "badge": [
    "Legacy"
   ],
   "plain": "A short code for the operating system family the browser was compiled for, like 'Win32' or 'MacIntel'. Yes, it often says 32 on a 64-bit machine, and yes, 'MacIntel' is what every modern Mac reports, Apple silicon included.",
   "route": "One of the oldest routing hints: download pages used it to preselect the Windows, Mac or Linux installer. These days it is too vague and too frozen to trust for that job.",
   "history": [
    [
     "1990s",
     "Introduced in the Netscape era as a quick way to sniff the visitor's operating system."
    ],
    [
     "2000s",
     "Values fossilize. Windows stays 'Win32' forever, because changing it would break old sniffing scripts."
    ],
    [
     "2020s",
     "Browsers freeze or coarsen it as part of fingerprinting reduction. On many systems it now reports a plausible simplification rather than the whole truth."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Identifying"
  },
  {
   "id": "language",
   "name": "language",
   "prop": "language",
   "group": "identity",
   "badge": [
    "Standard"
   ],
   "plain": "Your top language preference, like 'en-US'. This is the language you told your device or browser you prefer, and it is the single strongest hint a website gets about which language to greet you in.",
   "route": "Locale routing starts here. This value becomes the front of the Accept-Language header, and servers use it to deliver the matching language edition automatically, no flags menu required.",
   "history": [
    [
     "1990s",
     "Browsers begin exposing the UI language so sites can localize without asking."
    ],
    [
     "2000s",
     "Standardized as part of the HTML specification's navigator interface, sourced from the OS or browser setting."
    ],
    [
     "Today",
     "Still the primary input to language negotiation on the web."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Identifying"
  },
  {
   "id": "languages",
   "name": "languages",
   "prop": "languages",
   "group": "identity",
   "badge": [
    "Standard"
   ],
   "plain": "Your full ranked list of preferred languages, favorite first. If a site does not have your first choice, this list is how it gracefully offers your second or third instead of giving up.",
   "route": "This list is serialized into the Accept-Language header that rides with every request. Content negotiation, where server and browser agree on a language edition, is routing by preference list.",
   "history": [
    [
     "2010s",
     "Added after sites kept asking for more than the single top language (see the compat table for per-browser versions)."
    ],
    [
     "Today",
     "Returned as a frozen copy so sites cannot quietly rewrite your preferences."
    ]
   ],
   "compat": {
    "chrome": "37+",
    "edge": "16+",
    "firefox": "32+",
    "safari": "10.1+",
    "safari_ios": "10.1+"
   },
   "tier": "Identifying"
  },
  {
   "id": "vendor",
   "name": "vendor",
   "prop": "vendor",
   "group": "identity",
   "badge": [
    "Legacy"
   ],
   "plain": "The browser maker's name, sort of. Chrome answers 'Google Inc.', Safari answers 'Apple Computer, Inc.', Firefox answers an empty string, and modern Edge answers 'Google Inc.' because it is built on Chromium.",
   "history": [
    [
     "1990s",
     "A Netscape-era label for who built the browser."
    ],
    [
     "2000s",
     "Becomes a sniffing shortcut ('if the vendor mentions Apple, assume WebKit'), which ages badly as engines converge."
    ],
    [
     "Today",
     "Mostly a trivia answer. New code should not branch on it."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Routine"
  },
  {
   "id": "product",
   "name": "product",
   "prop": "product",
   "group": "identity",
   "badge": [
    "Legacy",
    "Frozen"
   ],
   "plain": "Supposedly the browser's engine name. In practice every browser on earth answers 'Gecko', including engines that have nothing to do with Gecko, because old sites used to lock out anything else.",
   "history": [
    [
     "2000s",
     "Sites gate content on product being 'Gecko'. Other engines face a choice: tell the truth and get blocked, or say 'Gecko'."
    ],
    [
     "Today",
     "Universally 'Gecko'. A small monument to how the web really standardizes: by everyone copying the string that works."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Routine"
  },
  {
   "id": "appName",
   "name": "appName",
   "prop": "appName",
   "group": "identity",
   "badge": [
    "Legacy",
    "Frozen"
   ],
   "plain": "The browser's application name. Every modern browser answers 'Netscape', including browsers made decades after Netscape disappeared. It is kept purely so ancient scripts do not fall over.",
   "history": [
    [
     "1990s",
     "Genuinely distinguished Netscape Navigator from Internet Explorer ('Microsoft Internet Explorer')."
    ],
    [
     "2000s",
     "Sniffing scripts branch on this value everywhere, so no browser dares change its answer."
    ],
    [
     "Today",
     "Standardized as a constant: the HTML specification now simply requires the string 'Netscape'."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Routine"
  },
  {
   "id": "appVersion",
   "name": "appVersion",
   "prop": "appVersion",
   "group": "identity",
   "badge": [
    "Legacy"
   ],
   "plain": "A version string that is really just the userAgent with 'Mozilla/' clipped off the front. It inherits every fib in the userAgent and adds none of its own.",
   "history": [
    [
     "1990s",
     "Paired with appName in the classic browser-detection scripts."
    ],
    [
     "Today",
     "Frozen alongside userAgent; useful only as a museum of how detection used to work."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Identifying"
  },
  {
   "id": "appCodeName",
   "name": "appCodeName",
   "prop": "appCodeName",
   "group": "identity",
   "badge": [
    "Legacy",
    "Frozen"
   ],
   "plain": "The browser's internal codename. Every browser answers 'Mozilla'. All of them. It is the most successful codename in history, having been adopted by its own competition.",
   "history": [
    [
     "1993",
     "'Mozilla' starts as Netscape's internal mashup of 'Mosaic killer' plus 'Godzilla'."
    ],
    [
     "1990s-2000s",
     "Rival engines adopt the codename in their identity strings to receive Netscape-compatible content."
    ],
    [
     "Today",
     "The HTML specification fixes the value at 'Mozilla' for everyone, forever."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Routine"
  },
  {
   "id": "oscpu",
   "name": "oscpu",
   "prop": "oscpu",
   "group": "identity",
   "badge": [
    "Non-standard",
    "Firefox only"
   ],
   "plain": "A Firefox-only extra: the operating system and CPU description, like 'Windows NT 10.0; Win64; x64'. Other browsers never adopted it, which is exactly why fingerprinting researchers notice when it is present.",
   "history": [
    [
     "2000s",
     "Mozilla exposes OS and CPU detail beyond what the shared interface offered."
    ],
    [
     "Today",
     "Still Firefox-only (see compat table). Privacy-hardened Firefox modes can blank or spoof it."
    ]
   ],
   "compat": {
    "chrome": "No",
    "edge": "No",
    "firefox": "1+",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Identifying"
  },
  {
   "id": "webdriver",
   "name": "webdriver",
   "prop": "webdriver",
   "group": "identity",
   "badge": [
    "Standard"
   ],
   "plain": "A truth-teller: this is true when the browser is being driven by automation (a test robot like Selenium or Playwright) instead of a person. Sites use it to spot bots; honest testers rely on it being accurate.",
   "history": [
    [
     "2017",
     "Standardized by the W3C WebDriver specification so automation identifies itself instead of pretending to be human."
    ],
    [
     "Today",
     "One of the first checks in every bot-detection toolkit, and one reason stealth automation tries to hide it."
    ]
   ],
   "compat": {
    "chrome": "63+",
    "edge": "12+",
    "firefox": "60+",
    "safari": "10.1+",
    "safari_ios": "10.1+"
   },
   "tier": "Identifying"
  },
  {
   "id": "pdfViewerEnabled",
   "name": "pdfViewerEnabled",
   "prop": "pdfViewerEnabled",
   "group": "identity",
   "badge": [
    "Standard"
   ],
   "plain": "A simple yes or no: can this browser show PDFs inline? Sites use it to decide whether clicking a statement or a ticket opens the document right there or starts a download.",
   "route": "A tiny routing decision made visible: view the PDF in place, or route the visitor to a download and a helper page.",
   "history": [
    [
     "2021",
     "Standardized and shipped (Chrome 94, per MDN compat data) to replace fragile plugin-sniffing for PDF support."
    ],
    [
     "Today",
     "The reliable way to answer a question sites used to guess from the plugins list."
    ]
   ],
   "compat": {
    "chrome": "94+",
    "edge": "94+",
    "firefox": "99+",
    "safari": "16.4+",
    "safari_ios": "16.4+"
   },
   "tier": "Routine"
  },
  {
   "id": "cookieEnabled",
   "name": "cookieEnabled",
   "prop": "cookieEnabled",
   "group": "identity",
   "badge": [
    "Standard"
   ],
   "plain": "Whether cookies are allowed at all in this browser right now. If this is false, sign-ins cannot stick between pages in the usual way, and sites should warn you early instead of failing mysteriously at checkout.",
   "history": [
    [
     "1994",
     "Cookies arrive in Netscape; a readable on-off signal follows so sites can adapt."
    ],
    [
     "Today",
     "Still the quickest sanity check before blaming a login bug on anything else. Note it reports policy, not whether a specific cookie will survive modern tracking protections."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "18+",
    "safari_ios": "18+"
   },
   "tier": "Routine"
  },
  {
   "id": "hardwareConcurrency",
   "name": "hardwareConcurrency",
   "prop": "hardwareConcurrency",
   "group": "hardware",
   "badge": [
    "Standard"
   ],
   "plain": "How many processor threads your device can work on at once. A budget phone might say 4, a desktop 16 or more. Sites use it to size up heavy jobs like photo filters or video encoding, and trackers use it to help recognize your machine.",
   "history": [
    [
     "2014",
     "Ships in Chrome in this era (see compat table) as the web learns to use multiple cores."
    ],
    [
     "2010s",
     "Adopted across browsers; also recognized as a fingerprinting ingredient, so some privacy modes report smaller, rounder numbers."
    ],
    [
     "Today",
     "Essential for worker-heavy apps, quietly capped or fuzzed in hardened browsers."
    ]
   ],
   "compat": {
    "chrome": "37+",
    "edge": "15+",
    "firefox": "48+",
    "safari": "15.4+",
    "safari_ios": "15.4+"
   },
   "tier": "Identifying"
  },
  {
   "id": "deviceMemory",
   "name": "deviceMemory",
   "prop": "deviceMemory",
   "group": "hardware",
   "badge": [
    "Non-standard",
    "Chromium only",
    "Not in Safari"
   ],
   "plain": "Roughly how much RAM your device has, reported in deliberately fuzzy buckets (0.5, 1, 2, 4, 8 gigabytes) so sites can go easy on low-memory phones without learning your exact hardware. Safari and Firefox never shipped it, which is why it shows as absent on an iPhone.",
   "route": "Adaptive routing of content weight: serve the heavy experience to devices that can carry it, and the light one to devices that cannot.",
   "history": [
    [
     "2018",
     "Ships in Chrome (Device Memory API), with values intentionally rounded to powers of two for privacy (see compat table)."
    ],
    [
     "Today",
     "Still Chromium-only; Mozilla and Apple both objected on fingerprinting grounds."
    ]
   ],
   "compat": {
    "chrome": "63+",
    "edge": "63+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Identifying"
  },
  {
   "id": "maxTouchPoints",
   "name": "maxTouchPoints",
   "prop": "maxTouchPoints",
   "group": "hardware",
   "badge": [
    "Standard"
   ],
   "plain": "How many simultaneous touches the screen can track. Zero means no touchscreen. Ten is a typical phone or tablet. This is the honest way to ask 'is this a touch device', far better than guessing from screen size.",
   "route": "Input routing: sites use it to decide whether to offer big touch targets and swipe gestures, or dense mouse-oriented controls.",
   "history": [
    [
     "2012",
     "Arrives with the Pointer Events work in Internet Explorer 10, then spreads to every engine."
    ],
    [
     "Today",
     "The standard first question in 'should this UI behave like a touch UI'."
    ]
   ],
   "compat": {
    "chrome": "35+",
    "edge": "12+",
    "firefox": "59+",
    "safari": "13+",
    "safari_ios": "13+"
   },
   "tier": "Identifying"
  },
  {
   "id": "gpu",
   "name": "gpu",
   "prop": "gpu",
   "group": "hardware",
   "badge": [
    "Standard",
    "New"
   ],
   "plain": "The doorway to WebGPU, the modern graphics and compute engine succeeding WebGL. Through it, sites can run serious 3D, video effects and even local AI models on your graphics card. It is new enough that its mere presence says a lot about how current your browser is.",
   "history": [
    [
     "2017",
     "The W3C 'GPU for the Web' working group forms to design a modern graphics API."
    ],
    [
     "2023",
     "First stable release in Chrome 113 as a partial implementation (per MDN compat data)."
    ],
    [
     "2025",
     "Firefox 141 and Safari 26 complete the set (per MDN compat data), making WebGPU a genuinely cross-browser feature."
    ]
   ],
   "compat": {
    "chrome": "144+",
    "edge": "144+",
    "firefox": "Partial 141+",
    "safari": "26+",
    "safari_ios": "26+"
   },
   "tier": "Identifying"
  },
  {
   "id": "getGamepads",
   "name": "getGamepads",
   "prop": "getGamepads",
   "group": "hardware",
   "badge": [
    "Standard"
   ],
   "plain": "Asks what game controllers are plugged in: Xbox pads, PlayStation controllers, joysticks. Browser games read the buttons and sticks from here, usually many times a second. For privacy, a pad stays invisible until you press one of its buttons.",
   "history": [
    [
     "2011",
     "First implemented in Firefox and Chrome builds as the Gamepad API takes shape at the W3C."
    ],
    [
     "2010s",
     "A standard mapping arrives so 'button 1' means the same thing across controllers."
    ],
    [
     "Today",
     "The foundation of browser gaming with real controllers; a button press is required before a page may see the pad."
    ]
   ],
   "tryit": "gamepads",
   "compat": {
    "chrome": "35+",
    "edge": "12+",
    "firefox": "29+",
    "safari": "10.1+",
    "safari_ios": "10.1+"
   },
   "tier": "Routine"
  },
  {
   "id": "keyboard",
   "name": "keyboard",
   "prop": "keyboard",
   "group": "hardware",
   "badge": [
    "Non-standard",
    "Chromium only"
   ],
   "plain": "Two keyboard superpowers: a map of which physical key produces which character on YOUR layout (so a game can say 'press the key in the W position', whatever your layout calls it), and a way to capture keys like Esc that are normally reserved. Mostly absent outside Chromium.",
   "history": [
    [
     "2018",
     "The Keyboard API ships in Chrome in this era (see compat table), aimed at games and pro tools like cloud desktops."
    ],
    [
     "Today",
     "Still Chromium-only; other engines cite fingerprinting and complexity concerns."
    ]
   ],
   "compat": {
    "chrome": "68+",
    "edge": "68+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Routine"
  },
  {
   "id": "virtualKeyboard",
   "name": "virtualKeyboard",
   "prop": "virtualKeyboard",
   "group": "hardware",
   "badge": [
    "Non-standard",
    "Chromium only"
   ],
   "plain": "Control over the on-screen keyboard on touch devices: a site can ask it to appear or hide, and learn how much of the screen it covers, so input fields stop hiding behind it. On a phone this is the difference between a form that works and a form that fights you.",
   "history": [
    [
     "2021",
     "Ships in Chrome 94 (per MDN compat data) with the Virtual Keyboard API for better form behavior on tablets and foldables."
    ],
    [
     "Today",
     "Chromium-only; iOS Safari manages the on-screen keyboard entirely on its own terms."
    ]
   ],
   "compat": {
    "chrome": "94+",
    "edge": "94+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Routine"
  },
  {
   "id": "ink",
   "name": "ink",
   "prop": "ink",
   "group": "hardware",
   "badge": [
    "Non-standard",
    "Chromium only"
   ],
   "plain": "A stylus latency trick: the browser hands your most recent pen strokes to the operating system's own compositor, which draws a short predicted trail so ink appears to keep up with the pen. Drawing apps feel dramatically more responsive with it.",
   "history": [
    [
     "2021",
     "The Delegated Ink Trail API ships in Chrome 94 and Edge 93 (per MDN compat data)."
    ],
    [
     "Today",
     "Chromium-only, a showcase of how specialized the capability shelf has become."
    ]
   ],
   "compat": {
    "chrome": "94+",
    "edge": "93+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Routine"
  },
  {
   "id": "devicePosture",
   "name": "devicePosture",
   "prop": "devicePosture",
   "group": "hardware",
   "badge": [
    "Standard",
    "New"
   ],
   "plain": "For foldable phones: is the device lying flat, or propped half-open like a tiny laptop? Sites can rearrange themselves around the hinge instead of stretching across it like nothing happened.",
   "history": [
    [
     "2024",
     "The Device Posture API ships in Chrome 132 (per MDN compat data), tracking the foldables market."
    ],
    [
     "Today",
     "Awaiting other engines; in iOS Safari it currently exists only behind a feature flag (per MDN compat data)."
    ]
   ],
   "compat": {
    "chrome": "132+",
    "edge": "132+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "27 (flag only)"
   },
   "tier": "Routine"
  },
  {
   "id": "onLine",
   "name": "onLine",
   "prop": "onLine",
   "group": "network",
   "badge": [
    "Standard"
   ],
   "plain": "The browser's best guess at 'are we connected'. True usually just means a network interface is up, not that the internet actually answers. Try it below: the value updates live, and airplane mode is the classic way to watch it flip.",
   "route": "The first routing fact there is: connected or not decides whether a request even leaves the device, and apps use it to route you to saved content when the answer is no.",
   "history": [
    [
     "2000s",
     "Appears with the early HTML5 offline work, alongside the ill-fated application cache."
    ],
    [
     "2010s",
     "The online and offline events become the backbone of offline-aware web apps."
    ],
    [
     "Today",
     "Famously optimistic: 'online' means 'a network exists', which is why good apps verify with a real request."
    ]
   ],
   "tryit": "online",
   "compat": {
    "chrome": "2+",
    "edge": "12+",
    "firefox": "1.5+",
    "safari": "4+",
    "safari_ios": "4+"
   },
   "tier": "Routine"
  },
  {
   "id": "connection",
   "name": "connection",
   "prop": "connection",
   "group": "network",
   "badge": [
    "Non-standard",
    "Chromium only",
    "Not in Safari"
   ],
   "plain": "A weather report for your connection: effective type (4g, 3g, slow-2g), estimated speed and round-trip time, and whether you turned on data saver. Sites can lighten the page before it loads instead of apologizing after. Never shipped in Safari.",
   "route": "Bandwidth-aware routing: this is how a site decides to send you the smaller video, skip the autoplay, or hold the heavy extras until you are on a better network.",
   "history": [
    [
     "2011",
     "An early Mozilla-prefixed version appears in Firefox, then is withdrawn (per MDN compat data it was gone again by Firefox 32)."
    ],
    [
     "2017",
     "The modern Network Information API lands in Chrome 61 (per MDN compat data) with effectiveType."
    ],
    [
     "Today",
     "Chromium-only, and a standard exhibit in the 'capabilities Apple will not expose' debate."
    ]
   ],
   "compat": {
    "chrome": "61+",
    "edge": "61+",
    "firefox": "31+ (removed in 32)",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Identifying"
  },
  {
   "id": "sendBeacon",
   "name": "sendBeacon",
   "prop": "sendBeacon",
   "group": "network",
   "badge": [
    "Standard"
   ],
   "plain": "A guaranteed-delivery postcard. When you close a tab, ordinary requests get canceled mid-flight; a beacon is handed to the browser itself, which promises to deliver it even as the page dies. Analytics and 'save my progress' signals ride on this.",
   "route": "Last-chance routing: the browser becomes the courier for one final message on the page's behalf.",
   "history": [
    [
     "2014",
     "Ships in Chrome 39 (per MDN compat data); Firefox 31 had it earlier the same year, and Safari 11.1 follows in 2018."
    ],
    [
     "Today",
     "The standard way to report 'the user just left' without slowing the user down."
    ]
   ],
   "tryit": "beacon",
   "compat": {
    "chrome": "39+",
    "edge": "14+",
    "firefox": "31+",
    "safari": "11.1+",
    "safari_ios": "11.1+"
   },
   "tier": "Routine"
  },
  {
   "id": "share",
   "name": "share",
   "prop": "share",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "Opens your device's real share sheet, the same one your photo app uses, so a web page can hand a link to Messages, Mail, Notes, or anything else you have installed. Before this, every website hand-built its own row of share buttons and hoped it guessed your apps right.",
   "route": "Routing content OUT of the browser: one tap hands a link to another app entirely, using your device's own routing table of installed apps.",
   "history": [
    [
     "2017",
     "Web Share ships in Chrome 61 on Android (per MDN compat data), after years of every site hard-coding buttons for the social networks of the moment."
    ],
    [
     "2019",
     "Safari adds it on iOS 12.2 and macOS 12.1 era releases (per MDN compat data), making it the rare capability Apple adopted early."
    ],
    [
     "2023",
     "Desktop Chrome completes the picture (full support by Chrome 128, per MDN compat data). Firefox desktop still keeps it behind a setting."
    ]
   ],
   "tryit": "share",
   "compat": {
    "chrome": "128+",
    "edge": "93+",
    "firefox": "71 (flag only)",
    "safari": "12.1+",
    "safari_ios": "12.1+"
   },
   "tier": "Routine"
  },
  {
   "id": "canShare",
   "name": "canShare",
   "prop": "canShare",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "The polite question before the share: 'could I share this here?' Sharing text and links works almost everywhere; sharing files only works in some browsers. Sites ask first so the share button never promises something the device cannot do.",
   "history": [
    [
     "2017",
     "Arrives with Web Share Level 2 work, alongside file sharing."
    ],
    [
     "Today",
     "The standard feature-check before showing a share button at all."
    ]
   ],
   "tryit": "canShare",
   "compat": {
    "chrome": "128+",
    "edge": "93+",
    "firefox": "96 (flag only)",
    "safari": "14+",
    "safari_ios": "14+"
   },
   "tier": "Routine"
  },
  {
   "id": "clipboard",
   "name": "clipboard",
   "prop": "clipboard",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "The modern clipboard: copy and (with your permission) paste, as promises instead of the old hidden-textarea tricks. Every 'Copy link' and 'Copy code' button that does not make the page jump around is probably using this.",
   "history": [
    [
     "2000s-2010s",
     "Copying meant document.execCommand('copy') with an off-screen selected textarea: fragile, synchronous, and a small hack in every codebase."
    ],
    [
     "2018",
     "The async Clipboard API ships in Chrome 66 era (per MDN compat data), gated on secure contexts and, for reading, explicit permission."
    ],
    [
     "Today",
     "execCommand is deprecated in spirit; clipboard is the supported path in all modern engines."
    ]
   ],
   "tryit": "clipboard",
   "compat": {
    "chrome": "66+",
    "edge": "66+",
    "firefox": "63+",
    "safari": "13.1+",
    "safari_ios": "13.1+"
   },
   "tier": "Sensitive"
  },
  {
   "id": "geolocation",
   "name": "geolocation",
   "prop": "geolocation",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "Asks where you are: latitude, longitude, and accuracy, sourced from GPS, Wi-Fi, or cell towers. This is the one that triggers the famous 'allow this site to know your location' prompt, because the browser will not answer without your yes.",
   "route": "Location is a routing input in the physical world too: it decides which store's hours you see, which city's results you get, and whether the map opens centered on you or on a guess.",
   "history": [
    [
     "2008",
     "Google's Gears plugin pioneers location on the web; the W3C Geolocation spec follows its shape."
    ],
    [
     "2010s",
     "Ships in every major browser; a 2010 FTC-era debate sets the norm: permission prompt, per-site, revocable."
    ],
    [
     "2016",
     "Chrome restricts geolocation to secure (HTTPS) contexts, ending its use on plain-HTTP pages."
    ],
    [
     "Today",
     "Options like 'approximate location' and one-time grants give finer control than the original all-or-nothing design."
    ]
   ],
   "tryit": "geolocation",
   "compat": {
    "chrome": "5+",
    "edge": "12+",
    "firefox": "3.5+",
    "safari": "5+",
    "safari_ios": "≤3+"
   },
   "tier": "Sensitive"
  },
  {
   "id": "mediaDevices",
   "name": "mediaDevices",
   "prop": "mediaDevices",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "The camera and microphone directory. From here a page can list your cameras, mics and speakers (labels hidden until you grant permission) and ask for a stream, which is how every video call in a browser tab works.",
   "history": [
    [
     "2011",
     "getUserMedia debuts in Opera and Chrome Canary builds; video calls in the browser stop being a plugin fantasy."
    ],
    [
     "2015",
     "The API is reorganized under mediaDevices with promises, and enumerateDevices arrives."
    ],
    [
     "Today",
     "The front door to WebRTC. Device labels stay blank until permission is granted, a privacy fix learned the hard way."
    ]
   ],
   "compat": {
    "chrome": "47+",
    "edge": "12+",
    "firefox": "36+",
    "safari": "11+",
    "safari_ios": "11+"
   },
   "tier": "Sensitive"
  },
  {
   "id": "serviceWorker",
   "name": "serviceWorker",
   "prop": "serviceWorker",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "Where a site registers its service worker: a script the browser keeps on staff even when every tab is closed. It can wake up to handle push notifications and, most importantly, to stand between the page and the network.",
   "route": "This one is not just related to routing, it IS a router, installed inside your browser. Every request the page makes can be intercepted by the service worker, which decides on the spot: answer from the cache, go to the network, or mix the two. That decision, made per request, is exactly why installed web apps open instantly and work on a plane.",
   "history": [
    [
     "2014",
     "Announced by Google as the programmable replacement for the application cache; ships in Chrome 40 (per MDN compat data)."
    ],
    [
     "2018",
     "Safari 11.1 adds support (per MDN compat data), completing the cross-browser set years after Chrome and Firefox."
    ],
    [
     "Today",
     "The engine room of Progressive Web Apps: offline, background sync, and push all route through it."
    ]
   ],
   "compat": {
    "chrome": "40+",
    "edge": "17+",
    "firefox": "44+",
    "safari": "11.1+",
    "safari_ios": "11.1+"
   },
   "tier": "Routine"
  },
  {
   "id": "storage",
   "name": "storage",
   "prop": "storage",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "The storage manager: how much room a site is using, how much it may use, and whether its saved data is protected from automatic cleanup ('persisted'). This is where offline documents, cached maps, and your saved game live, and where the browser promises not to evict them under pressure.",
   "route": "Knowing the budget decides what gets routed to your device for safekeeping: which articles download for offline reading, which map tiles cache before a trip.",
   "history": [
    [
     "2017",
     "The Storage API ships in Chrome 55 and Firefox 57 (per MDN compat data), unifying quota questions that used to be per-API guesswork."
    ],
    [
     "2021",
     "Safari 15.2 joins (per MDN compat data)."
    ],
    [
     "Today",
     "estimate() is the standard 'how full is the suitcase' readout for offline-first apps."
    ]
   ],
   "tryit": "storage",
   "compat": {
    "chrome": "55+",
    "edge": "55+",
    "firefox": "57+",
    "safari": "15.2+",
    "safari_ios": "15.2+"
   },
   "tier": "Routine"
  },
  {
   "id": "permissions",
   "name": "permissions",
   "prop": "permissions",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "The permission ledger. Instead of triggering a prompt to find out, a site can quietly ask: 'for location, am I granted, denied, or would I need to prompt?' Good sites check first and only ask you at the moment it makes sense.",
   "history": [
    [
     "2015",
     "The Permissions API ships in Chrome 43 era (per MDN compat data), ending the era of prompt-and-pray."
    ],
    [
     "Today",
     "Coverage varies by browser and by permission, which is itself information the try-it below will show you."
    ]
   ],
   "tryit": "permissions",
   "compat": {
    "chrome": "43+",
    "edge": "43+",
    "firefox": "46+",
    "safari": "16+",
    "safari_ios": "16+"
   },
   "tier": "Routine"
  },
  {
   "id": "credentials",
   "name": "credentials",
   "prop": "credentials",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "The sign-in assistant: the browser's credential manager can store a login from a site and offer it back, and it is the same machinery that powers passkeys (WebAuthn) through navigator.credentials. 'Tap to sign in' flows start here.",
   "history": [
    [
     "2016",
     "The Credential Management API ships in Chrome 51 era (per MDN compat data) for password and federated sign-in."
    ],
    [
     "2018",
     "WebAuthn joins the same object, and credentials becomes the home of passkeys."
    ],
    [
     "Today",
     "The quiet center of the web's move away from passwords."
    ]
   ],
   "compat": {
    "chrome": "51+",
    "edge": "18+",
    "firefox": "60+",
    "safari": "13+",
    "safari_ios": "13+"
   },
   "tier": "Sensitive"
  },
  {
   "id": "locks",
   "name": "locks",
   "prop": "locks",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "Traffic control for your own tabs. Locks let different tabs and workers of the same site take turns with a shared resource, so two tabs never save over each other at the same instant. Invisible infrastructure, felt only when it is missing.",
   "history": [
    [
     "2018",
     "The Web Locks API ships in Chrome 69 era (per MDN compat data)."
    ],
    [
     "2022",
     "Safari 15.4 adds it (per MDN compat data), completing broad support."
    ]
   ],
   "compat": {
    "chrome": "69+",
    "edge": "69+",
    "firefox": "96+",
    "safari": "15.4+",
    "safari_ios": "15.4+"
   },
   "tier": "Routine"
  },
  {
   "id": "wakeLock",
   "name": "wakeLock",
   "prop": "wakeLock",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "Asks the screen to stay awake: for a recipe you are cooking from, a boarding pass at the gate, a workout timer, a presentation. The browser can take the lock back at any time (switching tabs does exactly that), and the page is told when it happens.",
   "history": [
    [
     "2015-2019",
     "Requested by developers for years; early attempts via video tricks and NoSleep hacks fill the gap."
    ],
    [
     "2020",
     "Screen Wake Lock ships properly in Chrome 84 (per MDN compat data)."
    ],
    [
     "2024",
     "Firefox 126 adds it (per MDN compat data)."
    ],
    [
     "2025",
     "Safari on iOS 18.4 completes the set (per MDN compat data), five years after Chrome."
    ]
   ],
   "tryit": "wakelock",
   "compat": {
    "chrome": "84+",
    "edge": "84+",
    "firefox": "126+",
    "safari": "16.4+",
    "safari_ios": "18.4+"
   },
   "tier": "Routine"
  },
  {
   "id": "mediaSession",
   "name": "mediaSession",
   "prop": "mediaSession",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "Lets a page tell the system what is playing: song title, artist, artwork. That is how a browser tab ends up on your lock screen and headphone controls, with working play, pause and skip buttons.",
   "history": [
    [
     "2017",
     "Media Session ships in Chrome 57 era (per MDN compat data), bringing web audio and video up to native-app manners."
    ],
    [
     "2020",
     "Safari 13.1 era adds support on macOS (per MDN compat data)."
    ]
   ],
   "compat": {
    "chrome": "73+",
    "edge": "73+",
    "firefox": "82+",
    "safari": "15+",
    "safari_ios": "15+"
   },
   "tier": "Routine"
  },
  {
   "id": "mediaCapabilities",
   "name": "mediaCapabilities",
   "prop": "mediaCapabilities",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "Asks the browser a practical question before streaming: 'can this device actually play this video format, at this size, smoothly and without draining the battery?' Sites use the answer to pick a stream the hardware can handle instead of discovering the problem as stutter.",
   "route": "Format routing: the answer steers which encoding of the same video gets delivered to your device.",
   "history": [
    [
     "2017",
     "The Media Capabilities API ships in Chrome 63 era (per MDN compat data) as services tire of trial-and-error playback."
    ],
    [
     "Today",
     "The standard preflight check behind adaptive streaming in the browser."
    ]
   ],
   "tryit": "mediacap",
   "compat": {
    "chrome": "66+",
    "edge": "66+",
    "firefox": "63+",
    "safari": "13+",
    "safari_ios": "13+"
   },
   "tier": "Routine"
  },
  {
   "id": "getBattery",
   "name": "getBattery",
   "prop": "getBattery",
   "group": "shelf",
   "badge": [
    "Deprecated in practice",
    "Not in Safari"
   ],
   "plain": "Reads your battery: charge level, whether it is plugged in, time estimates. The friendly use was real (go easy on playback when the battery is low). The problem was also real: battery level is a surprisingly good tracking signal, and that argument ended the API's career in two of three engines.",
   "history": [
    [
     "2014",
     "Ships in Chrome 38 (per MDN compat data) with the Battery Status API."
    ],
    [
     "2015",
     "Researchers demonstrate that battery readings can help track users across sites, and the privacy bill comes due."
    ],
    [
     "2017",
     "Firefox removes it (in version 52, per MDN compat data) over fingerprinting. Safari never implements it at all."
    ],
    [
     "Today",
     "Chromium keeps a reduced version. The Battery API is the canonical case study in 'useful' losing to 'identifying'."
    ]
   ],
   "tryit": "battery",
   "compat": {
    "chrome": "38+",
    "edge": "38+",
    "firefox": "43+ (removed in 52)",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Identifying"
  },
  {
   "id": "vibrate",
   "name": "vibrate",
   "prop": "vibrate",
   "group": "shelf",
   "badge": [
    "Standard",
    "Not in Safari"
   ],
   "plain": "Buzzes the phone in a pattern you specify: a single tap of feedback for a game, a double-buzz for an error. Android browsers support it; Apple has declined to implement it on iOS for the entire life of the API, so on an iPhone this simply does not exist.",
   "history": [
    [
     "2011",
     "The Vibration API takes shape at the W3C Device APIs group."
    ],
    [
     "2013",
     "Ships in Firefox 16 era and Chrome 32 (per MDN compat data) on Android."
    ],
    [
     "Today",
     "Safari, desktop and iOS alike: nothing (per MDN compat data). MDN's data even shows Firefox retiring it recently (removed in 129), leaving it mostly a Chrome-on-Android feature."
    ]
   ],
   "tryit": "vibrate",
   "compat": {
    "chrome": "32+",
    "edge": "32+",
    "firefox": "16+ (removed in 129)",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Routine"
  },
  {
   "id": "setAppBadge",
   "name": "setAppBadge / clearAppBadge",
   "prop": "setAppBadge",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "The little number on an app's icon. Installed web apps can set it ('3 unread') or clear it, using setAppBadge and clearAppBadge. It only means something for web apps you have installed to your home screen or dock.",
   "history": [
    [
     "2020",
     "The App Badging API ships in Chrome 81 (per MDN compat data) for installed web apps."
    ],
    [
     "2023",
     "Safari 17 adds it on macOS, and iOS 16.4 covers installed web apps (per MDN compat data)."
    ]
   ],
   "tryit": "badge",
   "compat": {
    "chrome": "81+",
    "edge": "81+",
    "firefox": "No",
    "safari": "17+",
    "safari_ios": "16.4+"
   },
   "tier": "Routine"
  },
  {
   "id": "requestMIDIAccess",
   "name": "requestMIDIAccess",
   "prop": "requestMIDIAccess",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "Asks permission to talk to MIDI gear: keyboards, controllers, synthesizers plugged into your device. This is how browser-based music studios and synth editors exist at all.",
   "history": [
    [
     "2015",
     "The Web MIDI API ships in Chrome 43 era (per MDN compat data)."
    ],
    [
     "2023",
     "Firefox 108 adds it behind the permission model it insisted on (per MDN compat data). Safari has not implemented it."
    ]
   ],
   "tryit": "midi",
   "compat": {
    "chrome": "43+",
    "edge": "43+",
    "firefox": "108+",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Sensitive"
  },
  {
   "id": "requestMediaKeySystemAccess",
   "name": "requestMediaKeySystemAccess",
   "prop": "requestMediaKeySystemAccess",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "The DRM handshake. Before a streaming service sends you an encrypted film, the page asks which copy-protection systems this browser can operate. If the answer is none, there is no movie. It is the least visible, most consequential yes-or-no in streaming.",
   "route": "This is the gate on the route premium video takes to you: no supported key system, no delivery, regardless of your subscription.",
   "history": [
    [
     "2015",
     "Encrypted Media Extensions ship in Chrome 42 era (per MDN compat data), controversially bringing DRM into the open web platform."
    ],
    [
     "2017",
     "The W3C publishes EME as a Recommendation over public objections, including from the EFF."
    ],
    [
     "Today",
     "Widevine, FairPlay and PlayReady divide the browser world between them; this call is how a page finds out which one it is talking to."
    ]
   ],
   "tryit": "mediakeys",
   "compat": {
    "chrome": "42+",
    "edge": "13+",
    "firefox": "38+",
    "safari": "12.1+",
    "safari_ios": "12.1+"
   },
   "tier": "Routine"
  },
  {
   "id": "scheduling",
   "name": "scheduling",
   "prop": "scheduling",
   "group": "shelf",
   "badge": [
    "Non-standard",
    "Chromium only"
   ],
   "plain": "A courtesy question for busy pages: 'is the user typing or clicking right now?' (isInputPending). Heavy work like syncing a document can check and politely wait a beat instead of making the keyboard feel sticky.",
   "history": [
    [
     "2020",
     "Ships in Chrome 87 (per MDN compat data) as part of the scheduling work behind cooperative multitasking on the web."
    ],
    [
     "Today",
     "Still Chromium-only."
    ]
   ],
   "compat": {
    "chrome": "87+",
    "edge": "87+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Routine"
  },
  {
   "id": "userActivation",
   "name": "userActivation",
   "prop": "userActivation",
   "group": "shelf",
   "badge": [
    "Standard"
   ],
   "plain": "The browser's answer to 'did a real person actually interact?' Popups, sounds, vibration and fullscreen are gated on user activation; this reports whether the page has it right now and whether it has ever had it. It is how the web distinguishes your tap from a script's ambush.",
   "history": [
    [
     "2019",
     "The User Activation API ships in Chrome 72 era (per MDN compat data), formalizing rules browsers had enforced ad hoc for years."
    ],
    [
     "Today",
     "The quiet bouncer behind a dozen 'requires a user gesture' error messages."
    ]
   ],
   "compat": {
    "chrome": "72+",
    "edge": "72+",
    "firefox": "120+",
    "safari": "16.4+",
    "safari_ios": "16.4+"
   },
   "tier": "Routine"
  },
  {
   "id": "bluetooth",
   "name": "bluetooth",
   "prop": "bluetooth",
   "group": "bridges",
   "badge": [
    "Non-standard",
    "Chromium only",
    "Not in Safari"
   ],
   "plain": "Web Bluetooth: a page can pair with nearby Bluetooth Low Energy devices, heart-rate straps, light bulbs, microcontrollers, and read or write their data. No app install, which still surprises people. Apple has never shipped it, so none of it exists on an iPhone.",
   "history": [
    [
     "2017",
     "Web Bluetooth ships in Chrome 56 era (per MDN compat data), built around user-picked pairing for safety."
    ],
    [
     "Today",
     "Chromium-only. Apple cites privacy and fingerprinting concerns, and the stalemate is a decade old."
    ]
   ],
   "compat": {
    "chrome": "Partial 70+",
    "edge": "Partial 70+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Sensitive"
  },
  {
   "id": "hid",
   "name": "hid",
   "prop": "hid",
   "group": "bridges",
   "badge": [
    "Non-standard",
    "Chromium only"
   ],
   "plain": "WebHID talks to human-interface devices the OS does not already claim: specialty keypads, flight-sim gear, accessibility controllers, stream decks. A page can then use hardware that would otherwise need a native driver and app.",
   "history": [
    [
     "2021",
     "WebHID ships in Chrome 89 era (per MDN compat data)."
    ],
    [
     "Today",
     "Chromium-only, and device access is always behind a user pick."
    ]
   ],
   "compat": {
    "chrome": "89+",
    "edge": "89+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Sensitive"
  },
  {
   "id": "serial",
   "name": "serial",
   "prop": "serial",
   "group": "bridges",
   "badge": [
    "Non-standard",
    "Chromium only"
   ],
   "plain": "Web Serial opens real serial ports from a web page: Arduino boards, 3D printers, network switches, lab instruments. Entire hardware communities now flash and configure devices from a browser tab instead of installing desktop tools.",
   "history": [
    [
     "2021",
     "Web Serial ships in Chrome 89 era (per MDN compat data)."
    ],
    [
     "Today",
     "Chromium-only; a quiet revolution in hardware tooling that most web developers never notice."
    ]
   ],
   "compat": {
    "chrome": "89+",
    "edge": "89+",
    "firefox": "151+",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Sensitive"
  },
  {
   "id": "usb",
   "name": "usb",
   "prop": "usb",
   "group": "bridges",
   "badge": [
    "Non-standard",
    "Chromium only"
   ],
   "plain": "WebUSB lets a page talk to USB devices that have no built-in OS driver story, Android phones in recovery modes, dev boards, hardware security tools, using a safe user-picked model instead of kernel drivers.",
   "history": [
    [
     "2017",
     "WebUSB ships in Chrome 61 era (per MDN compat data)."
    ],
    [
     "Today",
     "Chromium-only, and deliberately barred from touching device classes the OS already owns, like storage and keyboards."
    ]
   ],
   "compat": {
    "chrome": "61+",
    "edge": "61+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Sensitive"
  },
  {
   "id": "xr",
   "name": "xr",
   "prop": "xr",
   "group": "bridges",
   "badge": [
    "Standard",
    "Not in Safari"
   ],
   "plain": "The entry point to WebXR: virtual and augmented reality sessions in the browser. Its presence means the browser at least speaks the language of headsets; whether one is attached is a separate question the API can answer.",
   "history": [
    [
     "2019",
     "WebXR ships in Chrome 79 era (per MDN compat data), replacing the short-lived WebVR."
    ],
    [
     "Today",
     "Safari on Apple Vision Pro supports WebXR in Apple's own way; on iPhone Safari it remains absent (see compat table)."
    ]
   ],
   "compat": {
    "chrome": "79+",
    "edge": "79+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Sensitive"
  },
  {
   "id": "presentation",
   "name": "presentation",
   "prop": "presentation",
   "group": "bridges",
   "badge": [
    "Non-standard",
    "Chromium only"
   ],
   "plain": "The Presentation API sends content to a second screen, a TV or projector via Chromecast-style receivers, with the page on your device acting as the remote control.",
   "history": [
    [
     "2016",
     "Ships in Chrome 49 era (per MDN compat data)."
    ],
    [
     "Today",
     "Largely a Chromium feature; most sites still lean on platform casting instead."
    ]
   ],
   "compat": {
    "chrome": "47+",
    "edge": "47+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Routine"
  },
  {
   "id": "windowControlsOverlay",
   "name": "windowControlsOverlay",
   "prop": "windowControlsOverlay",
   "group": "bridges",
   "badge": [
    "Non-standard",
    "Chromium only"
   ],
   "plain": "For installed web apps: it lets the app draw into the window's title bar area (where the minimize and close buttons live) and reports exactly which pixels are safe. Native apps have done this forever; this is how web apps stopped looking second-class in their own windows.",
   "history": [
    [
     "2021",
     "Ships in Edge 93 and Chrome 94 era (per MDN compat data), born on Edge as a PWA project."
    ],
    [
     "Today",
     "Chromium-only, and only meaningful for installed desktop web apps."
    ]
   ],
   "compat": {
    "chrome": "105+",
    "edge": "105+",
    "firefox": "No",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Routine"
  },
  {
   "id": "registerProtocolHandler",
   "name": "registerProtocolHandler",
   "prop": "registerProtocolHandler",
   "group": "bridges",
   "badge": [
    "Standard",
    "Not in Safari"
   ],
   "plain": "Lets a website volunteer to handle a kind of link. After you approve it once, every mailto: link on the web can open your webmail, and web+ links can open the app that owns them. The browser asks first, always.",
   "route": "This changes the routing table for whole families of links: the destination for 'email someone' stops being a desktop program and becomes a website you chose.",
   "history": [
    [
     "2006",
     "Firefox 2 ships an early form for feed and mail handlers (per MDN compat data, Firefox support starts at version 2)."
    ],
    [
     "2011",
     "Chrome 13 adds it (per MDN compat data) and the custom web+ scheme arrives with it."
    ],
    [
     "Today",
     "Still absent from Safari (see compat table), which is one reason mailto on an iPhone goes to Mail, full stop."
    ]
   ],
   "compat": {
    "chrome": "13+",
    "edge": "79+",
    "firefox": "2+",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Routine"
  },
  {
   "id": "getUserMedia",
   "name": "getUserMedia",
   "prop": "getUserMedia",
   "group": "bridges",
   "badge": [
    "Legacy",
    "Deprecated"
   ],
   "plain": "The original camera and microphone call, once found directly on navigator. It worked, it taught the web video calling, and it was replaced by the promise-based version on mediaDevices. It lingers as a callback-based fossil that new code should not use.",
   "history": [
    [
     "2012",
     "navigator.getUserMedia powers the first browser video-call demos, no plugins required."
    ],
    [
     "2015",
     "The spec moves the feature to navigator.mediaDevices.getUserMedia with promises and better errors; the original is deprecated."
    ],
    [
     "Today",
     "Still present in some engines for compatibility (see compat table), documented mainly to be steered away from."
    ]
   ],
   "compat": {
    "chrome": "53+",
    "edge": "12+",
    "firefox": "17+",
    "safari": "11+ (removed in 12)",
    "safari_ios": "11+ (removed in 12)"
   },
   "tier": "Sensitive"
  },
  {
   "id": "doNotTrack",
   "name": "doNotTrack",
   "prop": "doNotTrack",
   "group": "privacy",
   "badge": [
    "Deprecated",
    "Abandoned"
   ],
   "plain": "The web's politest failed idea: a setting that asked websites, please, not to track you. Sites were free to ignore it, most did, and the whole system quietly collapsed. Your browser may still report a value here; almost nobody is listening on the other end.",
   "history": [
    [
     "2009",
     "Researchers propose the Do Not Track header; the idea gains momentum with regulators."
    ],
    [
     "2011",
     "Internet Explorer 9 is the first major browser to ship the setting (Firefox 9 adds navigator.doNotTrack, per MDN compat data)."
    ],
    [
     "2012",
     "Microsoft turns it ON by default in IE10, advertisers declare the signal meaningless if it is not a deliberate choice, and the standard unravels."
    ],
    [
     "2019",
     "Safari 12.1 removes the setting entirely, Apple explaining that it could itself be used as a fingerprinting signal. The W3C closes the working group the same year. Note the compat table: MDN's data records Safari dropping the navigator property surprisingly early, in version 7."
    ],
    [
     "Today",
     "A cautionary tale replaced by law-backed signals like Global Privacy Control."
    ]
   ],
   "compat": {
    "chrome": "23+",
    "edge": "17+",
    "firefox": "9+",
    "safari": "5.1+ (removed in 7)",
    "safari_ios": "5.1+ (removed in 7)"
   },
   "tier": "Identifying"
  },
  {
   "id": "globalPrivacyControl",
   "name": "globalPrivacyControl",
   "prop": "globalPrivacyControl",
   "group": "privacy",
   "badge": [
    "Standard",
    "New"
   ],
   "plain": "Do Not Track's successor, with lawyers. When this is true (or the matching Sec-GPC header is sent), you are telling sites not to sell or share your data, and in places like California that signal carries legal weight under the CCPA. Sites are not merely invited to respect it.",
   "history": [
    [
     "2020",
     "The Global Privacy Control is proposed by a coalition including the Brave, DuckDuckGo and Firefox teams, designed from day one to bind under privacy law."
    ],
    [
     "2021",
     "California's Attorney General treats GPC as an enforceable opt-out; the Sephora settlement in 2022 underlines the point."
    ],
    [
     "2023",
     "Firefox 120 exposes navigator.globalPrivacyControl (per MDN compat data). Chromium and Safari have not followed (see compat table), so the signal often travels by the header alone."
    ]
   ],
   "compat": {
    "chrome": "No",
    "edge": "No",
    "firefox": "120+",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Identifying"
  },
  {
   "id": "plugins",
   "name": "plugins",
   "prop": "plugins",
   "group": "fossils",
   "badge": [
    "Legacy",
    "Frozen"
   ],
   "plain": "The list of browser plugins: once the most important page on the web, home to Flash, Java, Silverlight and QuickTime. Today every browser reports the same five built-in PDF viewers and nothing else. The list is a staged photograph of a demolished building.",
   "history": [
    [
     "1995",
     "Netscape 2 introduces plugins and NPAPI; the web gains video, games and entire application platforms overnight."
    ],
    [
     "2000s",
     "Plugin detection via this list drives install prompts everywhere ('Get Flash'). It is also a rich fingerprint and a security nightmare."
    ],
    [
     "2015-2020",
     "Browsers drop NPAPI in stages; Adobe ends Flash on December 31, 2020."
    ],
    [
     "2021",
     "The HTML specification freezes the list to five PDF entries so old detection scripts return a calm, identical answer everywhere."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Identifying"
  },
  {
   "id": "mimeTypes",
   "name": "mimeTypes",
   "prop": "mimeTypes",
   "group": "fossils",
   "badge": [
    "Legacy",
    "Frozen"
   ],
   "plain": "The companion list to plugins: which file types the browser claims a plugin can handle. It used to route visitors to the right helper app; now it is frozen alongside plugins to the same short, identical answer in every browser.",
   "history": [
    [
     "1990s",
     "MIME type mapping is how a click on a .mov or .pdf found its player."
    ],
    [
     "2021",
     "Frozen by spec together with plugins, ending its life as a fingerprinting surface."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Routine"
  },
  {
   "id": "javaEnabled",
   "name": "javaEnabled",
   "prop": "javaEnabled",
   "group": "fossils",
   "badge": [
    "Legacy"
   ],
   "plain": "A method that answers one question: is the Java plugin enabled? Not JavaScript (different thing entirely, confusingly named in 1995 for marketing reasons). In any modern browser the honest answer is simply no, forever.",
   "history": [
    [
     "1995",
     "Java applets are the web's first rich apps, and sites need to know whether the runtime is present."
    ],
    [
     "2015-2017",
     "Browsers remove Java plugin support in stages as applets become a security liability and the web platform absorbs their use cases."
    ],
    [
     "Today",
     "The method survives in the spec and returns false, a tiny headstone for the applet era."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Routine"
  },
  {
   "id": "taintEnabled",
   "name": "taintEnabled",
   "prop": "taintEnabled",
   "group": "fossils",
   "badge": [
    "Removed"
   ],
   "plain": "A ghost. taintEnabled belonged to a 1990s Netscape security experiment called data tainting, removed before most of today's developers were born. Only Firefox's data even admits it existed (see compat table). If a listed member has to be a trivia answer, it is this one.",
   "history": [
    [
     "1996",
     "Netscape Navigator 3 experiments with 'tainting' data so scripts could be tracked for privacy leaks."
    ],
    [
     "1990s",
     "The experiment is abandoned and the method removed; the name remains in old code and older documentation."
    ],
    [
     "Today",
     "Genuinely gone from Chrome, Edge and Safari (per MDN compat data): a fossil entry for something that no longer exists anywhere you are likely to browse."
    ]
   ],
   "compat": {
    "chrome": "No",
    "edge": "No",
    "firefox": "1+",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Routine"
  },
  {
   "id": "standalone",
   "name": "standalone",
   "prop": "standalone",
   "group": "fossils",
   "badge": [
    "Non-standard",
    "Apple only"
   ],
   "plain": "An Apple original, older than web app standards: on iOS it is true when the page is running as a home-screen app, outside the Safari chrome. A generation of iPhone web apps styled themselves around this one boolean. It is not in MDN's compat data for the standard Navigator interface (hence 'See notes' below), because it was never standardized; the modern display-mode media query does its job now.",
   "history": [
    [
     "2008",
     "The iPhone's 'web apps on the home screen' arrive with iOS 2-era Safari, and standalone is how a page knows it was launched that way."
    ],
    [
     "2010s",
     "Android standardizes installable web apps around manifests and display modes instead; standalone stays Apple-only."
    ],
    [
     "Today",
     "Still answered by iOS Safari, still checked by old iOS web apps every day."
    ]
   ],
   "compat": {
    "chrome": "See notes",
    "edge": "See notes",
    "firefox": "See notes",
    "safari": "See notes",
    "safari_ios": "See notes"
   },
   "tier": "Routine"
  },
  {
   "id": "buildID",
   "name": "buildID",
   "prop": "buildID",
   "group": "fossils",
   "badge": [
    "Non-standard",
    "Firefox only"
   ],
   "plain": "Firefox's build stamp: a number identifying the exact build of the browser, down to the day it was compiled. Useful for Mozilla's own support diagnostics, and a fingerprinting detail every other vendor chose not to offer.",
   "history": [
    [
     "2005",
     "Exposed in Firefox from version 2 onward (per MDN compat data)."
    ],
    [
     "Today",
     "Firefox-only (see compat table). Privacy-focused Firefox derivatives spoof or generalize it."
    ]
   ],
   "compat": {
    "chrome": "No",
    "edge": "No",
    "firefox": "2+",
    "safari": "No",
    "safari_ios": "No"
   },
   "tier": "Identifying"
  },
  {
   "id": "productSub",
   "name": "productSub",
   "prop": "productSub",
   "group": "fossils",
   "badge": [
    "Legacy",
    "Frozen"
   ],
   "plain": "A date-shaped string (like '20030107') that once described the exact build of the rendering engine. Browsers kept bumping into sites that branched on it, so the values settled into permanent, meaningless constants.",
   "history": [
    [
     "2000s",
     "Tracks Gecko build dates in the Mozilla world; other engines mirror the convention."
    ],
    [
     "Today",
     "Frozen. Another dial glued in place so the old machinery does not notice anything changed."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "1+",
    "safari_ios": "1+"
   },
   "tier": "Routine"
  },
  {
   "id": "vendorSub",
   "name": "vendorSub",
   "prop": "vendorSub",
   "group": "fossils",
   "badge": [
    "Legacy",
    "Frozen"
   ],
   "plain": "The sub-vendor string, companion to vendor. Everywhere you look it is an empty string, and has been for so long that its emptiness is effectively the standard.",
   "history": [
    [
     "1990s",
     "Reserved for finer-grained vendor detail in the Netscape model of browser identity."
    ],
    [
     "Today",
     "Universally ''. The field exists so that reading it does not throw; that is its entire modern function."
    ]
   ],
   "compat": {
    "chrome": "1+",
    "edge": "12+",
    "firefox": "1+",
    "safari": "3+",
    "safari_ios": "1+"
   },
   "tier": "Routine"
  }
 ]
};
