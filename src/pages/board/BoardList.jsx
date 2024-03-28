import Pagination from "@components/Pagination";
import Search from "@components/Search";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import BoardListItem from "@pages/board/BoardListItem";
import { memberState } from "@recoil/user/atoms.mjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const BoardList = () => {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // const fetchBoardList = async () => {
  //   const res = await axios.get("/posts");
  //   setData(res.data);
  // };
  // useEffect를 비동기 함수로 만들지 말기 : 복잡해졌을 때 순서 알기 어려움
  // useEffect(() => {
  //   fetchBoardList();
  // }, []);

  // ReactQuery 버전 : 최초의 한번만 실행됨
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get("/posts", {
        params: {
          page: searchParams.get("page"),
          keyword: searchParams.get("keyword"),
          limit: import.meta.env.VITE_POST_LIMIT,
        },
      }),
    select: (response) => response.data,

    // 설정 추가
    staleTime: 1000 * 5, // 쿼리 실행 후 캐시가 유지되는 시간(기본: 0)
    suspense: true,
  });

  useEffect(() => {
    refetch();
  }, [searchParams.toString()]);

  const itemList = data?.item?.map((item) => (
    <BoardListItem key={item._id} item={item}></BoardListItem>
  ));

  const handleSearch = (keyword) => {
    searchParams.set("keyword", keyword);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const user = useRecoilValue(memberState);
  const handleNewPost = () => {
    if (!user) {
      const gotoLogin = confirm(
        "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
      );
      gotoLogin && navigate("/user/login");
    } else {
      navigate(`/boards/new`);
    }
  };

  return (
    <main className="min-w-80 p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시물 목록 조회
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        <Search onClick={handleSearch} />
        <Link onClick={handleNewPost}>글쓰기</Link>
      </div>
      <section className="p-4">
        <table className="text-center border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[40%]" />
            <col className="w-[20%] sm:w-[15%]" />
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-200">
              <th className="p-2 whitespace-nowrap">번호</th>
              <th className="p-2 whitespace-nowrap">제목</th>
              <th className="p-2 whitespace-nowrap">글쓴이</th>
              <th className="p-2 whitespace-nowrap">조회수</th>
              <th className="hidden p-2 whitespace-nowrap sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="5">로딩중 ...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="5">{error.message}</td>
              </tr>
            )}
            {itemList}
          </tbody>
        </table>

        <Pagination
          totalPage={data?.pagination.totalPages}
          current={data?.pagination.page}
        />
      </section>
    </main>
  );
};

export default BoardList;
