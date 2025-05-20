import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnDocs = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/docs")) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTopOnDocs;
