import Layout from "@components/layout";
import BoardDetail from "@pages/board/BoardDetail";
import BoardList from "@pages/board/BoardList";
import BoardNew from "@pages/board/BoardNew";
import ReplyList from "@pages/board/ReplyList";
import EnvCheck from "@pages/EnvCheck";
import ErrorPage from "@pages/ErrorPage";
import Login from "@pages/user/Login";
import Signup from "@pages/user/Signup";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <BoardList /> },
      { path: "/boards", element: <BoardList /> },
      {
        path: "/boards/:_id",
        element: <BoardDetail />,
        children: [{ index: true, element: <ReplyList /> }],
      },
      { path: "/boards/new", element: <BoardNew /> },
      { path: "/user/login", element: <Login /> },
      { path: "/user/signup", element: <Signup /> },
      { path: "/envCheck", element: <EnvCheck /> },
    ],
  },
]);

export default router;
