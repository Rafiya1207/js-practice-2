import { useState } from "react";
import Slide from "./Slide.jsx";

const Button = ({ text, action }) => <button onClick={action}>{text}</button>;

const Slideshow = ({ children }) => {
  const [slide, setSlide] = useState(0);
  const previous = () => setSlide(Math.max(slide - 1, 0));
  const next = () => setSlide(Math.min(slide + 1, children.length - 1));
  const slideShow = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        previous();
        return;
      case "ArrowRight":
        next();
        return;
    }
  };

  const styles = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <div tabIndex={0} onKeyDown={slideShow} style={styles}>
        {children[slide]}
      </div>
    </>
  );
};

export default Slideshow;
