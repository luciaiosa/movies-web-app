import { useState, useEffect } from "react";

export const useWindowResize = () => {
  const isClient = typeof window === "object";

  function getWindowSize() {
    return {
      width: isClient ? window.innerWidth : 999999,
      height: isClient ? window.innerHeight : 999999,
    };
  }
  const [windowSize, setWindowSize] = useState(getWindowSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }
    function handleResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
