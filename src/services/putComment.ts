import { useState } from "react";
import axios from "axios";

export interface CommentUpdateProps {
  content?: string;
}

const useCommentUpdate = () => {
  const [data, setData] = useState<CommentUpdateProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async (
    commentId: string,
    commentData: CommentUpdateProps
  ) => {
    const REQUEST_URL = "https://koreanjson.com/comments/" + commentId;

    setIsLoading(true);
    setError(false);

    try {
      const response = await axios({
        method: "put",
        url: REQUEST_URL,
        data: commentData,
      });
      setData(response.data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateComment: fetchData, res: data, isLoading, error };
};

export default useCommentUpdate;
