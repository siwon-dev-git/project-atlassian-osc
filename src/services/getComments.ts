import { useEffect, useState } from "react";
import axios from "axios";

import { CommentProps } from "./getComment";

const useCommentsByPostId = (postId: string) => {
  const REQUEST_URL = `https://koreanjson.com/comments`;
  const [data, setData] = useState<Array<CommentProps>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({ method: "get", url: REQUEST_URL });
        setData(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    comments: data.filter((d) => d.Post.id === Number(postId)),
    isLoading,
    error,
  };
};

export default useCommentsByPostId;
