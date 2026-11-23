# AudioExtract – Free Online MP4 to MP3 Audio Converter

A production-grade, privacy-focused audio extraction web application built with **React**, **TypeScript**, **Tailwind CSS**, and **FFmpeg.wasm**.

Extract audio from MP4 videos directly in your browser without uploading your files to any external server.

---

## 🚀 Features

- **100% Client-Side Demuxing & Transcoding**: Videos are processed strictly inside the browser sandbox using WebAssembly (FFmpeg.wasm). Zero bytes ever leave your device.
- **Multiple Audio Formats**: Convert to MP3 (`.mp3`), uncompressed WAV (`.wav`), AAC (`.m4a`), and lossless FLAC (`.flac`).
- **Configurable Bitrates**: Choose from 128 kbps (Standard), 192 kbps (High), 256 kbps (Very High), and 320 kbps (Maximum). Automatically handles lossless formats where bitrates do not apply.
- **Precision Audio Trimming**: Set custom start and end timestamps in seconds to extract exact audio segments.
- **Sequential Batch Conversion**: Upload multiple videos at once (up to 500 MB per file) with individual and overall progress indicators.
- **Interactive Audio Preview**: Built-in HTML5 player with play/pause, scrub bar, time indicators, and volume toggle.
- **Single & Batch Downloads**: Download individual audio tracks or download all converted files bundled into a `.zip` archive via JSZip.
- **Privacy & Security**: Zero registration, no cookies, no tracking pixels, and instant memory disposal of generated object URLs.
- **Responsive Dark Theme UI**: Tailored to match and exceed the reference design with subtle glows, modern typography, and mobile drawer navigation.

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Audio Processing**: `@ffmpeg/ffmpeg` 0.12.x + `@ffmpeg/util` + Web Audio API fallback
- **Archiving**: JSZip
- **Delight**: Canvas Confetti

---

## 📂 Project Structure

```text
audioextract/
├── public/
│   ├── _redirects       # Netlify SPA redirect
│   ├── robots.txt       # SEO crawler instructions
│   └── sitemap.xml      # SEO sitemap
├── src/
│   ├── components/
│   │   ├── converter/
│   │   │   ├── AudioConverter.tsx      # Main converter container & controller
│   │   │   ├── AudioPlayerCard.tsx     # Custom HTML5 playback card
│   │   │   ├── AudioTrimmer.tsx        # Start/end timestamp controls
│   │   │   ├── BitrateSelector.tsx     # Bitrate dropdown & lossless helper
│   │   │   ├── ConversionProgress.tsx  # Dynamic progress bar & cancel button
│   │   │   ├── ConversionResults.tsx   # Results list & ZIP download
│   │   │   ├── FileUploader.tsx        # Drag-and-drop zone with validation
│   │   │   ├── FormatSelector.tsx      # Format selector (MP3, WAV, AAC, FLAC)
│   │   │   └── SelectedFilesList.tsx   # Video cards with remove & clear
│   │   ├── FAQ.tsx                     # Expandable questions accordion
│   │   ├── FeatureSection.tsx          # 6 feature cards
│   │   ├── Footer.tsx                  # Footer with links & copyright
│   │   ├── Hero.tsx                    # Hero section with trust badges
│   │   ├── HowItWorks.tsx              # 3-step process cards
│   │   ├── Navbar.tsx                  # Header with brand & mobile menu
│   │   ├── PrivacyPolicy.tsx           # Standalone Privacy Policy view
│   │   └── TermsOfUse.tsx              # Standalone Terms of Use view
│   ├── services/
│   │   ├── audioExtractionService.ts   # Batch queue & metadata extraction
│   │   ├── ffmpegService.ts            # FFmpeg.wasm singleton & conversion
│   │   └── webAudioFallback.ts         # Pure Web Audio API & PCM WAV encoder
│   ├── types/
│   │   └── index.ts                    # Shared TypeScript interfaces
│   ├── App.tsx                         # Main state & view routing
│   ├── index.css                       # Ambient glow & custom scrollbars
│   ├── main.tsx                        # React DOM mounting
│   └── vite-env.d.ts                   # Client environment types
├── netlify.toml                        # Netlify build config & COOP/COEP headers
├── package.json                        # Dependencies & scripts
├── tailwind.config.js                  # Color palette & custom shadows
├── tsconfig.json                       # TypeScript compiler options
└── vite.config.ts                      # Vite configuration & server headers
```

---

## 🏃 Local Development

### 1. Install dependencies:
```bash
npm install
```

### 2. Start the local development server:
```bash
npm run dev
```

### 3. Build for production:
```bash
npm run build
```

### 4. Preview the production build:
```bash
npm run preview
```

---

## 🌐 Deployment to Netlify

### Option 1: Netlify Git Integration (Recommended)
1. Push this repository to GitHub or GitLab.
2. In Netlify, click **Add new site** > **Import an existing project**.
3. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy site**.

### Option 2: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```
