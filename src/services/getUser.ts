import { useEffect, useState } from "react";
import axios from "axios";

export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  province: string;
  city: string;
  district: string;
  street: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string;
}

const useUser = (userId: string) => {
  const REQUEST_URL = "https://koreanjson.com/users/" + userId;
  const [data, setData] = useState<UserProps | null>(null);
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

  return { user: data, isLoading, error };
};

export default useUser;
