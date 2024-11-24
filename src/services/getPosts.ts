import { useEffect, useState } from "react";
import axios from "axios";

import { PostProps } from "./getPost";

const usePosts = () => {
  const REQUEST_URL = "https://koreanjson.com/posts";
  const [data, setData] = useState<Array<PostProps>>([]);
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

  return { posts: data, isLoading, error };
};

export default usePosts;
