import router from "@/routes";
import useThemeStore from "@zustand/themeStore.mjs";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactCsspin } from "react-csspin";
import "react-csspin/dist/style.css";
import { Suspense } from "react";

// 한번만 사용하면 돼서 app 밖에서 정의
const queryClient = new QueryClient();

const App = () => {
  const { isDarkMode } = useThemeStore();
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Suspense fallback={<ReactCsspin />}>
          <RouterProvider router={router} />
        </Suspense>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
