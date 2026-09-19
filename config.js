/* Settings you can change without touching the app code. */
window.APP_CONFIG = {
  // Change the suffix if you ever reset the course and want everyone's progress cleared.
  storageKey: 'gujarati-shikho-v1',

  // false = use the phone/browser's built-in voice (prototype).
  // true  = play recorded files from /audio/<lesson>-<n>.mp3 first, then fall back to the built-in voice.
  // The Review screen lists the exact file name for every item.
  useRecordedAudio: false,
  audioDir: 'audio/',

  // Paste a Google Form / Tally / email link here to show a "Send feedback" button to testers.
  // Example: 'https://forms.gle/xxxx' or 'mailto:you@example.com?subject=Gujarati%20app%20feedback'
  feedbackUrl: ''
};
