import { memberState } from "@recoil/user/atoms.mjs";
import { useRecoilValue } from "recoil";
import axios from "axios";

const REFRESH_URL = "/auth/refresh";

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
      let token = user.token.accessToken;
      if (config.url === REFRESH_URL) token = user.token.refreshToken;
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 응답 인터셉터
    instance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const { config, response } = err;
        console.log(config, response);
        if (err.response?.status === 401) {
          // 인증 되지 않음 : refresh 토큰 만료 || 로그인 X
          if (config.url == REFRESH_URL) {
            const gotoLogin = confirm(
              "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
            );
            gotoLogin &&
              navigate("/users/login", { state: { from: location.pathname } });
          } else {
            // refresh 토큰으로 access 토큰 재발급 요청
            const accessToken = await getAccessToken(instance);
            if (accessToken) {
              config.headers.Authorization = `Bearer ${accessToken}`;
              return axios(config);
            }
          }
        } else {
          return Promise.reject(err);
        }
      }
    );

    return config;
  });

  // accessToken 갱신 요청
  async function getAccessToken(instance) {
    try {
      const {
        data: { accessToken },
      } = await instance.get(REFRESH_URL);
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  return instance;
}

export default useCustomAxios;
