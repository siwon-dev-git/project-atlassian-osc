import { useEffect, useState } from "react";
import axios from "axios";
import { UserProps } from "./getUser";

const useUsers = () => {
  const REQUEST_URL = "https://koreanjson.com/users";
  const [data, setData] = useState<Array<UserProps>>([]);
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

  return { users: data, isLoading, error };
};

export default useUsers;
