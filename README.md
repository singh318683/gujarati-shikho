# Gujarati Shikho (web prototype, version 2)

A static web app for testing a speaking-first Gujarati course before building the Android app.
It teaches listening, understanding and speaking. Learners do not need to read Gujarati script.
No build step and no dependencies. Progress is saved in each tester's own browser.

## What is in it
- 25 lessons in four levels: First conversations, Family, Daily life, Festivals and fun
- Each lesson: learn cards (hear it, see it spelled the English way, see the meaning), then practice
- Practice types: listen and pick the meaning, pick how to say something, listen and pick the reply (small conversations), and "Now you say it"
- Normal and Slow audio buttons for every phrase
- Speaking practice: record yourself, play it back, or compare with the model voice. Nothing is scored automatically; learners judge for themselves
- Checkpoint reviews, streak and XP, sequential unlocking
- A "Content review" screen for a native speaker (Testing tools > Open the content review list)
- Gujarati script is hidden by default. Turn it on in Testing tools > Show Gujarati script

## Audio
The app plays files from the `audio` folder. Each phrase has two files named from its "said as" text, for example `kem-chho.mp3` and `kem-chho-slow.mp3`.
1. Run `make_audio.py` (see the top of that file). It creates an `audio-new` folder.
2. Copy its contents into an `audio` folder next to `index.html`.
3. Keep `useRecordedAudio: true` in `config.js`.

To replace a file with a real human recording, save it under the same file name.

## Put it on GitHub and Vercel
Upload everything to a GitHub repository, then import that repository in Vercel with Framework Preset "Other" and no build command. Every push redeploys automatically.

## iOS app
The `ios-app` folder wraps this web app as a real iPhone app. See `ios-app/README-ios.md`.

## Change the lessons
All content is in `data/gujarati.js`. Each phrase is one line. If you change a phrase's "said as" text, its audio file name changes too, so run `make_audio.py` again.

## Testing tools
On the home screen, open "Testing tools" to unlock all lessons, show the Gujarati script, or reset progress.

## What to measure with testers
- How many finish lesson 1, and how many return the next day
- Which lessons people abandon
- Whether the audio is clear and the speed comfortable
- Whether recording themselves feels useful
- Whether they would pay, and for what
