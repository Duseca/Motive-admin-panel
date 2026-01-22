import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
  challengeCategory: string
  streak: number
  lastActive: string
}

export interface Category {
  id: string
  name: string
  color: string
}

export interface Challenge {
  id: string
  categoryId: string
  title: string
  icon: string
}

export interface Quote {
  id: string
  text: string
  author: string
}

export interface Post {
  id: string
  userName: string
  challengeTitle: string
  ttfw: string
  badge?: string
  date: string
  likes: number
}

interface StoreState {
  users: User[]
  categories: Category[]
  challenges: Challenge[]
  quotes: Quote[]
  posts: Post[]

  setUsers: (users: User[]) => void
  addCategory: (category: Category) => void
  deleteCategory: (id: string) => void
  addChallenge: (challenge: Challenge) => void
  deleteChallenge: (id: string) => void
  addQuote: (quote: Quote) => void
  deleteQuote: (id: string) => void
  deletePost: (id: string) => void
}

export const useStore = create<StoreState>((set) => ({
  users: [
    { id: '1', name: 'Shehab', email: 'shehab@example.com', challengeCategory: 'Procrastination', streak: 5, lastActive: '2026-01-21' },
    { id: '2', name: 'User 2', email: 'user2@example.com', challengeCategory: 'Laziness', streak: 2, lastActive: '2026-01-20' },
  ],
  categories: [
    { id: '1', name: 'Procrastination', color: 'bg-yellow-100 text-yellow-800' },
    { id: '2', name: 'Laziness', color: 'bg-blue-100 text-blue-800' },
    { id: '3', name: 'Eating Habits', color: 'bg-green-100 text-green-800' },
    { id: '4', name: 'Introversion', color: 'bg-indigo-100 text-indigo-800' },
  ],
  challenges: [
    { id: '1', categoryId: '1', title: 'Wake up at 6 AM', icon: '⏰' },
    { id: '2', categoryId: '2', title: 'Walk for 20 mins', icon: '🚶' },
  ],
  quotes: [
    { id: '1', text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
    { id: '2', text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
  ],
  posts: [
    { id: '1', userName: 'Shehab', challengeTitle: 'Wake up at 6 AM', ttfw: '22m', badge: 'First Win', date: '2h ago', likes: 12 },
    { id: '2', userName: 'User 2', challengeTitle: 'Walk for 20 mins', ttfw: '45m', badge: 'Fast Starter', date: '5h ago', likes: 8 },
  ],

  setUsers: (users) => set({ users }),
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
  deleteCategory: (id) => set((state) => ({ categories: state.categories.filter((c) => c.id !== id) })),
  addChallenge: (challenge) => set((state) => ({ challenges: [...state.challenges, challenge] })),
  deleteChallenge: (id) => set((state) => ({ challenges: state.challenges.filter((c) => c.id !== id) })),
  addQuote: (quote) => set((state) => ({ quotes: [...state.quotes, quote] })),
  deleteQuote: (id) => set((state) => ({ quotes: state.quotes.filter((q) => q.id !== id) })),
  deletePost: (id) => set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),
}))
