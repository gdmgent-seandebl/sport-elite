import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";

const useFetch = <T,>(
  fetchFunction: () => Promise<AxiosResponse<T>>,
  existingdata: T | null
) => {
  const [data, setData] = useState<T | null>(existingdata);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    if (Array.isArray(existingdata) && existingdata.length > 0) {
      return;
    } else {
      try {
        setIsLoading(true);
        const response = await fetchFunction();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const invalidate = () => {
    fetchData();
  };

  return {
    isLoading,
    data,
    error,
    invalidate,
  };
};

export default useFetch;
