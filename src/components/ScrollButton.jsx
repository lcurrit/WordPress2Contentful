import React, { useState } from "react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="fixed bottom-10 right-10 h-10 w-10">
      <div
        onClick={scrollToTop}
        style={{ display: visible ? "block" : "none" }}
        className="w-full h-full bg-cyan-500 rounded text-white text-center text-3xl z-[1] cursor-pointer"
      >
        &uarr;
      </div>
    </div>
  );
};

export default ScrollButton;
