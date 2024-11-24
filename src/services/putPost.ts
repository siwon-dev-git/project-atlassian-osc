import { useState } from "react";
import axios from "axios";

export interface PostUpdateProps {
  title?: string;
  content?: string;
}

const usePostUpdate = () => {
  const [data, setData] = useState<PostUpdateProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async (postId: string, postData: PostUpdateProps) => {
    const REQUEST_URL = "https://koreanjson.com/posts/" + postId;

    setIsLoading(true);
    setError(false);

    try {
      const response = await axios({
        method: "put",
        url: REQUEST_URL,
        data: postData,
      });
      setData(response.data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { updatePost: fetchData, res: data, isLoading, error };
};

export default usePostUpdate;
