# AI Chatbot + Walking Avatars + Gamification — Design Spec

**Date:** 2026-03-28
**Status:** Approved

## Overview

Add three interactive AI-powered features to transmutelabs.in:
1. A Groq-powered chatbot widget for visitor engagement
2. Animated avatar agents that roam the page with hover speech bubbles
3. A gamification system with XP, achievements, and easter eggs

---

## 1. AI Chatbot

### Architecture

```
Client (ChatWidget) → POST /api/chat → Groq SDK → llama-3.3-70b-versatile
                    ← ReadableStream (SSE)
```

### API Route: `/api/chat`

- **Method:** POST
- **Body:** `{ messages: Array<{ role: 'user' | 'assistant', content: string }> }`
- **Response:** Server-Sent Events stream via `ReadableStream`
- **Model:** `llama-3.3-70b-versatile` (fast, high quality)
- **System prompt:** Contextual knowledge about Transmute Labs services, team, case studies, process
- **Rate limiting:** Not needed for MVP (Groq has built-in rate limits)
- **Environment:** `GROQ_API_KEY` in `.env.local`

### ChatWidget Component

- **Trigger:** Floating circular button (bottom-right, 56px), amber gradient, chat icon
- **Panel:** 400px wide x 560px tall glass-morphism panel with:
  - Header with "Transmute AI" title + close button
  - Message list with user/assistant bubbles
  - Quick-action chips (pre-populated questions)
  - Input field with send button
  - XP bar from gamification system (subtle, at bottom of header)
- **Animations:** Framer Motion for open/close, message entry
- **Mobile:** Full-width panel, 100dvh height
- **Streaming:** Token-by-token display with typing indicator

### Quick Actions

- "What services do you offer?"
- "Tell me about your team"
- "How can AI help my business?"
- "Book a consultation"

---

## 2. Walking Avatar Agents

### Design

4 small robot avatars (32x32px), each with a distinct color:
- Blue robot (matches Sruthi's card gradient)
- Amber robot (matches Ravi's card gradient)
- Purple robot (matches Sai's card gradient)
- Green robot (matches Abhiram's card gradient)

### Rendering

- SVG-based robot characters with simple geometric shapes
- Each has idle animation (gentle bobbing) via CSS
- Position: fixed, z-index: 50 (below cursor, above content)

### Movement

- Random walk: pick random target point, move there over 3-8 seconds with ease-in-out
- Bounce off viewport edges (16px padding)
- Pause for 2-4 seconds between moves
- Direction-aware: flip SVG horizontally based on movement direction
- Use requestAnimationFrame for smooth 60fps movement
- Pause when tab is hidden (document.visibilityState)

### Hover Interaction

- On hover: avatar pauses, speech bubble appears above with fade-in
- Speech bubble: glass-morphism tooltip with rotating messages
- Messages rotate from a pool of quips per avatar (AI facts, team expertise, fun lines)
- Bubble disappears on mouse leave with fade-out

### Responsive

- **Desktop only** — hidden on screens < 1024px (too intrusive on mobile)
- Reduced motion: avatars stay still, speech bubbles still work on hover

---

## 3. Gamification System

### State Management

Zustand store (`useGameStore`) persisted to localStorage:

```typescript
{
  xp: number,              // total experience points
  level: number,           // derived from xp (every 100 xp = 1 level, max 10)
  achievements: string[],  // unlocked achievement IDs
  interactions: {          // track what user has done
    chatMessages: number,
    avatarsHovered: string[],
    sectionsVisited: string[],
    easterEggsFound: string[],
  }
}
```

### XP Awards

| Action | XP | Repeatable |
|--------|----|-----------|
| Send chat message | 10 | Yes (max 5/session) |
| Hover an avatar | 5 | Per unique avatar |
| Scroll to new section | 5 | Per unique section |
| Find easter egg | 25 | Per unique egg |
| Complete all avatar hovers | 50 (bonus) | No |

### Achievements

| ID | Name | Condition | Toast Message |
|----|------|-----------|---------------|
| first-contact | First Contact | Send 1 chat message | "You've made first contact with our AI!" |
| team-player | Team Player | Hover all 4 avatars | "You've met the whole crew!" |
| deep-diver | Deep Diver | Visit all sections | "You've explored everything!" |
| curious-mind | Curious Mind | Send 5 chat messages | "So many great questions!" |
| egg-hunter | Egg Hunter | Find any easter egg | "You found a secret!" |

### Easter Eggs

1. **Konami Code** (up up down down left right left right b a): Triggers a brief confetti/particle animation
2. **Logo click x5**: Clicking the Transmute Labs logo 5 times rapidly reveals a hidden message in the hero

### Achievement Toast

- Appears top-center, slides down with spring animation
- Glass-morphism card with achievement icon + title + message
- Auto-dismiss after 4 seconds
- Stacks if multiple trigger at once

### XP Bar

- Thin (3px) gradient bar at bottom of chatbot header
- Shows progress to next level
- Level badge shows current level number

---

## File Structure

```
src/
  app/
    api/
      chat/
        route.ts          # Groq streaming endpoint
  components/
    ui/
      chat-widget.tsx     # Chatbot floating widget
      walking-avatars.tsx # Avatar agents container
      avatar-agent.tsx    # Individual avatar with movement logic
      achievement-toast.tsx # Toast notification component
      xp-bar.tsx          # XP progress bar
  lib/
    game-store.ts         # Zustand gamification store
    chat-constants.ts     # System prompt, quick actions, avatar quips
```

---

## Dependencies

- `groq-sdk` — Official Groq TypeScript SDK
- No other new dependencies (uses existing framer-motion, zustand, tailwind)

---

## Security

- Groq API key in `.env.local` only (never committed)
- `.env.local` already in `.gitignore` (Next.js default)
- API route validates message format server-side
- System prompt injection mitigated by fixed system message prepended server-side
