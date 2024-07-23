import React from "react";
import { useSpring, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import styled from "styled-components";

const HelpQ = styled.div`
  width: 90%;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dadada;
  justify-content: flex-start;
  position: relative;
`;

const HelpA = styled(animated.div)`
  width: 90%;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #dadada;
  font-size: 0.5vw;
`;

const HelpQText = styled.div`
  width: 95%;
  height: 90%;
  display: flex;
  font-size: 20px;
  align-items: center;
`;

const HelpAText = styled.div`
  width: 95%;
  padding: 8px;
  display: flex;
  font-size: 18px;
  justify-content: flex-start;
  align-items: center;
  letter-spacing: 0.1em;
  white-space: pre-line; /* 줄바꿈 추가 */
  line-height: 1.5; /* 줄 간격 추가 */
`;

const BtnOpen = styled.div`
  width: 5%;
  display: flex;
  font-size: 0.6vw;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const QnAItem = ({ q, a, isOpen, onToggle }) => {
  const [ref, { height }] = useMeasure();
  const animationProps = useSpring({
    height: isOpen ? height : 0,
    opacity: isOpen ? 1 : 0,
    config: { duration: 180 },
  });

  return (
    <>
      <HelpQ>
        <HelpQText>{q}</HelpQText>
        <BtnOpen onClick={onToggle}>{isOpen ? "△" : "▽"}</BtnOpen>
      </HelpQ>
      <HelpA style={animationProps}>
        <div ref={ref} style={{ padding: "15px" }}>
          <HelpAText>{a}</HelpAText>
        </div>
      </HelpA>
    </>
  );
};

export default QnAItem;
