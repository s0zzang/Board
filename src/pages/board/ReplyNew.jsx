import Submit from "@components/Submit";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function ReplyNew() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axios = useCustomAxios();
  const { _id } = useParams();

  const queryClient = useQueryClient();
  const addReply = useMutation({
    mutationFn: (formData) => axios.post(`/posts/${_id}/replies`, formData),
    onSuccess() {
      // 기존 캐시 무효화(fetchList와 동일함)
      queryClient.invalidateQueries(["posts", _id, "replies"]);
      reset();
    },
  });

  const onSubmit = async (formData) => {
    // await axios.post(`/posts/${_id}/replies`, formData);
    // fetchList();
    // reset();
    addReply.mutate(formData); // queryFn 실행 -> 성공 -> onSuccess 실행
  };

  return (
    <div className="p-4 shadow-md rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <textarea
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            name="comment"
            rows="3"
            cols="40"
            placeholder="내용을 입력하세요."
            {...register("comment", {
              required: "내용을 입력해?",
              minLength: { value: 2, message: "2글자 이상 입력? 해?" },
            })}
          ></textarea>
          {errors && <p>{errors.comment?.message}</p>}
        </div>
        <Submit size="sm">댓글 등록</Submit>
      </form>
    </div>
  );
}

export default ReplyNew;
