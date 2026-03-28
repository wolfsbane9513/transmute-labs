import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-contact', name: 'First Contact', description: "You've made first contact with our AI!", icon: 'MessageCircle' },
  { id: 'team-player', name: 'Team Player', description: "You've met the whole crew!", icon: 'Users' },
  { id: 'deep-diver', name: 'Deep Diver', description: "You've explored everything!", icon: 'Compass' },
  { id: 'curious-mind', name: 'Curious Mind', description: 'So many great questions!', icon: 'Brain' },
  { id: 'egg-hunter', name: 'Egg Hunter', description: 'You found a secret!', icon: 'Egg' },
];

interface GameState {
  xp: number;
  achievements: string[];
  chatMessages: number;
  avatarsHovered: string[];
  sectionsVisited: string[];
  easterEggsFound: string[];
  pendingToast: Achievement | null;

  addXP: (amount: number) => void;
  trackChat: () => void;
  trackAvatarHover: (avatarId: string) => void;
  trackSection: (sectionId: string) => void;
  trackEasterEgg: (eggId: string) => void;
  dismissToast: () => void;
}

function getLevel(xp: number): number {
  return Math.min(10, Math.floor(xp / 100) + 1);
}

export { getLevel };

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      xp: 0,
      achievements: [],
      chatMessages: 0,
      avatarsHovered: [],
      sectionsVisited: [],
      easterEggsFound: [],
      pendingToast: null,

      addXP: (amount: number) => set((s) => ({ xp: s.xp + amount })),

      trackChat: () => {
        const state = get();
        const newCount = state.chatMessages + 1;
        let xpGain = 0;
        if (newCount <= 5) xpGain = 10;

        const newAchievements = [...state.achievements];
        let toast: Achievement | null = null;

        if (newCount === 1 && !newAchievements.includes('first-contact')) {
          newAchievements.push('first-contact');
          toast = ACHIEVEMENTS.find((a) => a.id === 'first-contact')!;
          xpGain += 20;
        }
        if (newCount >= 5 && !newAchievements.includes('curious-mind')) {
          newAchievements.push('curious-mind');
          toast = ACHIEVEMENTS.find((a) => a.id === 'curious-mind')!;
          xpGain += 20;
        }

        set({
          chatMessages: newCount,
          xp: state.xp + xpGain,
          achievements: newAchievements,
          pendingToast: toast || state.pendingToast,
        });
      },

      trackAvatarHover: (avatarId: string) => {
        const state = get();
        if (state.avatarsHovered.includes(avatarId)) return;

        const newHovered = [...state.avatarsHovered, avatarId];
        const newAchievements = [...state.achievements];
        let toast: Achievement | null = null;
        let xpGain = 5;

        if (newHovered.length >= 4 && !newAchievements.includes('team-player')) {
          newAchievements.push('team-player');
          toast = ACHIEVEMENTS.find((a) => a.id === 'team-player')!;
          xpGain += 50;
        }

        set({
          avatarsHovered: newHovered,
          xp: state.xp + xpGain,
          achievements: newAchievements,
          pendingToast: toast || state.pendingToast,
        });
      },

      trackSection: (sectionId: string) => {
        const state = get();
        if (state.sectionsVisited.includes(sectionId)) return;

        const newVisited = [...state.sectionsVisited, sectionId];
        const newAchievements = [...state.achievements];
        let toast: Achievement | null = null;
        let xpGain = 5;

        // 6 sections: services, projects, team, about, contact + hero
        if (newVisited.length >= 6 && !newAchievements.includes('deep-diver')) {
          newAchievements.push('deep-diver');
          toast = ACHIEVEMENTS.find((a) => a.id === 'deep-diver')!;
          xpGain += 30;
        }

        set({
          sectionsVisited: newVisited,
          xp: state.xp + xpGain,
          achievements: newAchievements,
          pendingToast: toast || state.pendingToast,
        });
      },

      trackEasterEgg: (eggId: string) => {
        const state = get();
        if (state.easterEggsFound.includes(eggId)) return;

        const newEggs = [...state.easterEggsFound, eggId];
        const newAchievements = [...state.achievements];
        let toast: Achievement | null = null;

        if (!newAchievements.includes('egg-hunter')) {
          newAchievements.push('egg-hunter');
          toast = ACHIEVEMENTS.find((a) => a.id === 'egg-hunter')!;
        }

        set({
          easterEggsFound: newEggs,
          xp: state.xp + 25,
          achievements: newAchievements,
          pendingToast: toast || state.pendingToast,
        });
      },

      dismissToast: () => set({ pendingToast: null }),
    }),
    {
      name: 'transmute-game',
      partialize: (state) => ({
        xp: state.xp,
        achievements: state.achievements,
        chatMessages: state.chatMessages,
        avatarsHovered: state.avatarsHovered,
        sectionsVisited: state.sectionsVisited,
        easterEggsFound: state.easterEggsFound,
      }),
    }
  )
);
