import { memberState } from "@recoil/user/atoms.mjs";
import axios from "axios";
import { useRecoilValue } from "recoil";

function useCustomAxios() {
  // 로그인 된 사용자 정보
  const user = useRecoilValue(memberState);

  // ajax 통신에 사용할 공통 설정 지정
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_SERVER,
    timeout: 10000,
    headers: {
      "content-type": "application/json", // request 데이터 타입
      accept: "application/json", // response 데이터 타입
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use((config) => {
    // 사용자가 로그인한 상태라면 토큰값을 확인해서 헤더스에 실어 보내라~
    if (user) {
      const accessToken = user.token.accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 응답 인터셉터
    instance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          // 인증 되지 않음
          const gotoLogin = confirm(
            "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
          );
          gotoLogin &&
            navigate("/users/login", { state: { from: location.pathname } });
        } else {
          return Promise.reject(err);
        }
      }
    );

    return config;
  });

  return instance;
}

export default useCustomAxios;
