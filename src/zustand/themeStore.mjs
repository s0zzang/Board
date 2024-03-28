import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// persist( 원래의 set 함수, {  })
const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "dark-mode",
      storage: createJSONStorage(() => localStorage), // 생략하면 기본값 로컬스토리지
    }
  )
);

export default useThemeStore;
