import { useState } from "react";
import axios from "axios";

export interface UserUpdateProps {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
  province?: string;
  city?: string;
  district?: string;
  street?: string;
  zipcode?: string;
}

const useUserUpdate = () => {
  const [data, setData] = useState<UserUpdateProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async (userId: string, userData: UserUpdateProps) => {
    const REQUEST_URL = "https://koreanjson.com/users/" + userId;

    setIsLoading(true);
    setError(false);

    try {
      const response = await axios({
        method: "put",
        url: REQUEST_URL,
        data: userData,
      });
      setData(response.data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser: fetchData, res: data, isLoading, error };
};

export default useUserUpdate;
