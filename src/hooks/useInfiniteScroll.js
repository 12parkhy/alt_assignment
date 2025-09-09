import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (loadMore, hasMore, loading) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    if (loading || !hasMore) {
      setIsFetching(false);
      return;
    }

    loadMore();
  }, [isFetching, loadMore, hasMore, loading]);

  const handleScroll = useCallback(() => {
    // More lenient scroll detection - trigger when user is near bottom
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    // Trigger when user is within 1000px of bottom
    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      if (loading || !hasMore || isFetching) return;
      setIsFetching(true);
    }
  }, [loading, hasMore, isFetching]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
