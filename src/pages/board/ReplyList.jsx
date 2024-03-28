import useCustomAxios from "@hooks/useCustomAxios.mjs";
import ReflyItem from "@pages/board/ReflyItem";
import ReplyNew from "@pages/board/ReplyNew";
import { useQuery } from "@tanstack/react-query";
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

  const { data } = useQuery({
    queryKey: ["posts", _id, "replies"],
    queryFn: () => axios.get(`posts/${_id}/replies`),
    select: (response) => response.data,
    // refetchInterval: 3000,
  });

  const list = data?.item.map((item) => (
    <ReflyItem key={item._id} item={item} />
  ));

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {list?.length || 0}개</h4>
      {list}
      <ReplyNew />
    </section>
  );
}

export default ReplyList;
