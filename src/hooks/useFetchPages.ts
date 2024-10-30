import { useEffect, useState } from "react";
import axiosApi from "../axiosApi.ts";

interface Page {
  title: string;
  content: string;
}

export const useFetchPages = () => {
  const [pages, setPages] = useState<Record<string, Page>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  interface AxiosError {
    message: string;
  }

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axiosApi.get("/pages.json");
        setPages(response.data);
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message || "Ошибка при загрузке данных");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return { pages, loading, error };
};
