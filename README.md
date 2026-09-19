# Gujarati Shikho (web prototype)

A static web app for testing the Gujarati learning idea before building the Android app.
No build step and no dependencies. Progress is saved in each tester's own browser.

## What is in it
- 36 lessons in two levels: script and sounds (16), everyday words (20)
- Each lesson: learn cards, then practice questions, with wrong answers repeated once
- Two checkpoint reviews, streak and XP, sequential unlocking
- A "Content review" screen (Testing tools > Open the content review list) for a native speaker, with a Copy as CSV button
- Audio uses the device's built-in Gujarati voice for now, or your own recordings (see below)

## Run it on your computer
Double-click `index.html`. It works without a server.

## Put it on GitHub and Vercel
1. Create a new GitHub repository (for example `gujarati-shikho`).
2. Upload everything in this folder to it (the files must sit at the top level of the repo: `index.html`, `app.js`, and so on).
3. In Vercel choose Add New > Project, import the repository, and leave Framework Preset as "Other".
   Leave Build Command and Output Directory empty, then Deploy.
4. Share the Vercel link. Every push to GitHub redeploys automatically.

## Before you share it widely
- Ask a native speaker to go through the Content review screen. Five items are highlighted as the ones to check first.
- Add a feedback link: open `config.js` and paste a Google Form or Tally link into `feedbackUrl`.

## Audio
The built-in voice only works on devices that have a Gujarati voice installed (Chrome on Android usually does; many iPhones and desktop browsers do not). Where there is none, the sound buttons show a message instead of playing something wrong.

To use recorded audio:
1. Record one file per item. The Content review screen lists the exact file name, such as `c1-1.mp3`.
2. Put the files in an `audio` folder next to `index.html`.
3. In `config.js` set `useRecordedAudio: true`.
Items without a file fall back to the built-in voice.

## Change the lessons
All content is in `data/gujarati.js`. Each letter or word is one line. For a new language, copy that file, change the content and `voiceLang`, and load it in `index.html`.

## Testing tools
On the home screen, open "Testing tools" to unlock all lessons, hide the transliteration during practice, or reset progress.

## What to measure with testers
- How many finish lesson 1, and how many come back the next day
- Which lessons people abandon
- Whether they understand the letters without help
- Whether they would pay, and for what
