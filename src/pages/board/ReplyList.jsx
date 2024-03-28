import Spinner from "@components/Spinner";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import ReplyItem from "@pages/board/ReplyItem";
import ReplyNew from "@pages/board/ReplyNew";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";

function ReplyList() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  // const [data, setData] = useState(null);

  // const fetchList = async () => {
  //   const res = await axios.get(`posts/${_id}/replies`, {
  //     // params: { sort: { _id: -1 } },
  //   });
  //   setData(res.data);
  // };

  // useEffect(() => {
  //   fetchList();
  // }, []);

  // const { data } = useQuery({
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts", _id, "replies"],
    queryFn: ({ pageParam = 1 }) =>
      axios.get(`posts/${_id}/replies?delay=3000`, {
        params: { page: pageParam, limit: import.meta.env.VITE_REPLY },
      }),
    // select: (response) => response.data,
    // refetchInterval: 3000,

    // 마지막 페이지와 함께 전체 페이지 목록을 받아서 QueryFn에 전달할 pageParam 값을 리턴하도록 구현
    // false 리턴하면 더이상 QueryFn 호출 X
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.data.pagination.totalPages;
      const nextPage =
        allPages.length < totalPages ? allPages.length + 1 : false;
      return nextPage;
    },
  });

  // Array.prototype.flatMap() : 2차원 배열을 1차원 배열로 변환
  const list = data?.pages?.flatMap((page) =>
    page.data.item.map((item) => <ReplyItem key={item._id} item={item} />)
  );

  // const list = data?.item.map((item) => (
  //   <ReplyItem key={item._id} item={item} />
  // ));

  const hasNext =
    data?.pages.at(-1).data.pagination.page <
    data?.pages.at(-1).data.pagination.totalPages;

  return (
    <section className="mb-8">
      {console.log(data?.pages)}
      <h4 className="mt-8 mb-4 ml-2">
        댓글 {data?.pages[0]?.data.pagination.total || 0}개
      </h4>
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchNextPage}
        hasMore={hasNext}
        loader={<Spinner />}
      >
        {list || []}
      </InfiniteScroll>
      <ReplyNew />
    </section>
  );
}

export default ReplyList;
