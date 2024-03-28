import Button from "@components/Button";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { memberState } from "@recoil/user/atoms.mjs";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const BoardDetail = () => {
  const axios = useCustomAxios();
  // const [data, setData] = useState();
  const { _id } = useParams();
  const navigate = useNavigate();
  const user = useRecoilValue(memberState);

  // const fetchDetail = async () => {
  //   const res = await axios.get(`/posts/${_id}`);
  //   setData(res.data);
  // };

  const handleDelete = async () => {
    await axios.delete(`/posts/${_id}`);
    navigate("/boards");
  };

  // useEffect(() => {
  //   fetchDetail();
  // }, []);

  const { data } = useQuery({
    queryKey: ["/posts", _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: (response) => response.data,
  });

  const item = data?.item;

  return (
    <main className="container mx-auto mt-4 px-4">
      {data && (
        <section className="mb-8 p-4">
          <div className="font-semibold text-xl">제목 : {item.title}</div>
          <div className="text-right text-gray-400">
            작성자 : {item.user.name}
          </div>
          <div className="mb-4">
            <div>
              <pre className="w-full p-2 whitespace-pre-wrap">
                {item.content}
              </pre>
            </div>
            <hr />
          </div>
          <div className="flex justify-end my-4">
            <Button onClick={() => navigate("/boards")}>목록</Button>
            {user?._id === item.user._id && (
              <Button bgColor="red" onClick={handleDelete}>
                삭제
              </Button>
            )}
          </div>
        </section>
      )}
      <Outlet />
    </main>
  );
};

export default BoardDetail;
