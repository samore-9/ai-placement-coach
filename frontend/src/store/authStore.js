import { create } from 'zustand';

// Access token lives ONLY in memory (this store) — never localStorage.
// The refresh token is an httpOnly cookie the browser manages automatically,
// so a XSS payload that reads JS-accessible storage still can't steal a
// long-lived session, only whatever's currently in memory.
export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  status: 'idle', // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

  setAuth: ({ user, accessToken }) => set({ user, accessToken, status: 'authenticated' }),

  setAccessToken: (accessToken) => set({ accessToken }),

  clearAuth: () => set({ user: null, accessToken: null, status: 'unauthenticated' }),

  setStatus: (status) => set({ status }),
}));
