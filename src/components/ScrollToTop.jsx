import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400); // pojavljuje se nakon 400px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Nazad na vrh"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
