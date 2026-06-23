import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import WorkDetail from "./pages/WorkDetail";

/** Scrolls to a #hash target after route/section render. */
function HashScroll() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // wait a frame so the target exists
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [hash, pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      <Nav />
      <HashScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<WorkDetail />} />
      </Routes>
    </>
  );
}
