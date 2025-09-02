import { User } from "@supabase/supabase-js";
import { create } from "zustand";

export type UserStore = {
    user: User | undefined;
    setUser: (localUser: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: undefined,
    setUser: (localUser: User) => set({ user: localUser})
}));
