import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserStore = {
    user: User | undefined;
    setUser: (userParam: User) => void;
}

export const useUserStore = create(
    persist<UserStore>(
        (set) => ({
            user: undefined,
            setUser: (userParam) => set({ user: userParam })
        }),
        { name: "user-storage" }
    )
);
