# 🌟 Gemini Clone — Frontend Assignment (Kuvaka)

A clean, mobile-responsive, dark/light theme-supported frontend clone of Google Gemini, built as part of the assignment for **Kuvaka Tech**.  
The application mimics Gemini’s chat interface, authentication flow, and chatroom management features using a component-based architecture and Zustand for state management.

---

## 📸 Demo Link (https://gemini-clone-kuvaka-vp4a.vercel.app/login)

---

## ✨ Features

### 🔐 Authentication
- Phone + Country Code login
- OTP Verification with in-app generation
- Session-based user state using `useSessionStorage`

### 💬 Chatroom UI (Gemini-style)
- Create, rename, delete chatrooms
- Sidebar with "New Chat" & recent list
- Persistent chat state via Zustand store

### 🧠 Chat Interaction
- User & AI simulated messages
- "Gemini is typing..." indicator
- Auto-scroll to new message
- Reverse infinite scroll (paginated)
- Edit user messages with local sync
- Copy-to-clipboard on hover

### 📁 Media Support
- Upload images in chat
- Simulated AI replies to image uploads

### 🌓 Theming & Responsiveness
- Dark/Light theme toggle (persisted)
- Mobile responsive layout
- Sidebar expands/collapses via menu icon

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Utility Hooks:** `useSessionStorage`, `useLocalStorage`
- **Icons:** Lucide
- **Component Architecture:** Fully modular, scalable

---

## 📁 Project Structure
```
📦 Gemini Clone (Frontend)
├─ app                     # App router pages & layouts
│  ├─ (auth)               # Login & OTP verification
│  └─ (root)               # Chatroom, Home, Layouts
├─ components              # Reusable UI components
│  ├─ chat/                # ChatInput & ChatMessages
│  ├─ ui/                  # Button, Input, ThemeToggle
│  └─ Sidebar, SearchBar, OtpInput, etc.
├─ hooks                  # Custom hooks for storage
├─ lib/store              # Zustand stores
├─ globals.css            # Tailwind base styling
├─ next.config.ts         # Next.js config
└─ tsconfig.json          # TypeScript config
```

## 🚀 Getting Started

#### 1. Clone the repo

```bash
git clone https://github.com/your-username/gemini-clone-kuvaka.git
```

#### 2. Install dependencies
```bash
cd gemini-clone-kuvaka
npm install
```

#### 3. Run in dev mode
```bash
npm run dev
```

#### App will run at http://localhost:3000

## Coming in next version.
- Add backend integration for real OTP.
- Animated message transitions.
- Add each user database.
- Edit option for the user's message.

## Feature Implementation Details

### Throttling (Simulated AI Thinking Delay)
- Implemented using setTimeout() with random delays (1s–3s) to mimic Gemini’s natural response time.
- Helps simulate an AI that takes time to think or process input, improving realism.

###   Form Validation (Phone + OTP)
- Phone input validated for:
- Minimum 10 digits
- Country code selected
- OTP input:
- Validates all 4 digits filled
- Handles edge case when input is removed
- Aria-invalid attributes included for accessibility.
- Error states managed via Zustand (useOtpStore) + visual error messages shown inline.

###  Infinite Scroll (Reverse)
- Implemented in <ChatMessages /> using:
- IntersectionObserver watching the top element
- On intersect, it loads older messages (from dummy data for now)
- Reverse scroll simulates a real messaging app like WhatsApp.

###  Pagination (Client-side)
- Dummy messages are paginated:
- 20 messages per page by default
- Page state keeps track of which page is currently rendered
- Merges older messages to the top of the existing chat list when scrolling up
