import { useImperativeHandle } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import { CSSTransition } from "react-transition-group";

const Overlay = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);
  const [content, setContent] = useState("");

  const openOverlay = (content) => {
    setDisplay(true);
    setContent(content);
  };
  const closeOverlay = () => {
    setDisplay(false);
    setContent("");
  };

  useImperativeHandle(ref, () => ({
    openOverlay,
    closeOverlay,
  }));

  return (
    <CSSTransition in={display} timeout={300} classNames="blur" unmountOnExit>
      <div className="fixed inset-0 z-[9999] px-[2rem] flex items-center justify-center">
        <div
          onClick={closeOverlay}
          className="absolute z-[-1] bg-[#000] opacity-30 inset-0"
        ></div>
        {content}
      </div>
    </CSSTransition>
  );
});

export default Overlay;
