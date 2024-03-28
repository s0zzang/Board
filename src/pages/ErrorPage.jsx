import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const err = useRouteError();
  const message =
    err.status === 404
      ? "존재하지 않는 페이지인?"
      : "예상치 못한 에러가 발생했스?";
  return (
    <>
      <Header />
      <div>
        <h2>에러 메세지</h2>
        <p>{message}</p>
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
