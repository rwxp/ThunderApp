import { useEffect } from "react";
import { useLocation } from "react-router-dom";
 
function ScrollToTop({ children }) {
  const { pathname } = useLocation();
 
  useEffect(() => {
    if (pathname !== "/") window.scrollTo({top:0, behavior:'smooth'});
  }, [pathname]);
 
  return children;
}
 
export default ScrollToTop;