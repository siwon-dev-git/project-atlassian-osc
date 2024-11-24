import { useEffect, useState } from "react";
import axios from "axios";
import { TodoProps } from "./getTodo";

const useTodos = () => {
  const REQUEST_URL = "https://koreanjson.com/todos";
  const [data, setData] = useState<Array<TodoProps>>([]);
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

  return { todos: data, isLoading, error };
};

export default useTodos;
