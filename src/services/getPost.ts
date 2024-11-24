import { useEffect, useState } from "react";
import axios from "axios";

export interface PostProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
}

const usePost = (postId: string) => {
  const REQUEST_URL = "https://koreanjson.com/posts/" + postId;
  const [data, setData] = useState<PostProps | null>(null);
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

  return { post: data, isLoading, error };
};

export default usePost;
