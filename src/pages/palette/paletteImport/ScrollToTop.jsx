import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import up from "../../../img/commonImg/up4.png"
import upBlue from "../../../img/commonImg/up5.png"

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: ${props => (props.visible ? 'block' : 'none')};
  width: 50px;
  height: 50px;
  background-image: url(${props => (props.img ? upBlue : up)});
  background-size: contain;
  background-position: center;
  background-color: transparent;
  color: gray;
  border: none;
  border-radius: 25%;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const ScrollToTop = ({img = false}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <ScrollToTopButton onClick={scrollToTop} visible={isVisible} img={img}>
        
    </ScrollToTopButton>
  );
};

export default ScrollToTop;
