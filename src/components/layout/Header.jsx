import Button from "@components/Button";
import Theme from "@components/Theme";
import { memberState } from "@recoil/user/atoms.mjs";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

function Header() {
  const [user, setUser] = useRecoilState(memberState);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <header className="min-w-80 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 text-gray-800 p-2 transition duration-300 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center gap-y-2 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <a className="flex items-center" href="">
            <img className="mr-2 h-6" src="/vite.svg" alt="로고" />
            <span className="text-xl font-semibold [font-size:_clamp(2em,5vw,10em)]">
              게시판
            </span>
          </a>
        </div>

        <div className="w-auto order-2 md:mt-0">
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/boards">정보공유</Link>
            </li>
            <li>
              <Link to="/boards">자유게시판</Link>
            </li>
            <li>
              <Link to="/boards">질문게시판</Link>
            </li>
          </ul>
        </div>

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
          {user ? (
            <p className="flex items-center">
              <img
                className="w-8 aspect-square rounded-full mr-2"
                src={`https://market-lion.koyeb.app/api/files/${user.profile}`}
              ></img>
              {user.name}
              <Button onClick={handleLogout}>LOGOUT</Button>
            </p>
          ) : (
            <div className="flex justify-end">
              <Button
                size="sm"
                bgColor="blue"
                onClick={() => navigate("/user/login")}
              >
                LOGIN
              </Button>
              <Button
                size="sm"
                bgColor="gray"
                onClick={() => navigate("/user/signup")}
              >
                SIGNUP
              </Button>
            </div>
          )}
          <Theme />
        </div>
      </nav>
    </header>
  );
}

export default Header;
