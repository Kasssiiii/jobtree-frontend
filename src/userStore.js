import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(persist((set) => {
    return {
        userData: null,
        setUserData: (newUserData) => set(() => ({ userData: newUserData })),
        clearUserData: () => set(() => ({ userData: null })),
    };
}, {
    name: 'jobtree-user'
}
));
