import styled from "styled-components";
import Balloon from "images/balloonGame/balloon.png";
import ArrowImg from "images/balloonGame/arrow.svg";

import {
  FontSize,
  Spacing,
  balloonBaseStyle,
  centeredItem as centeredItems,
  zIndex,
} from "config/style";
import Paragraph from "./Paragraph";

interface IdleGameScreenProps {
  onStartClick: (isGameScreenOpen: boolean) => void;
  isGameScreenOpen: boolean;
}

const MainContainer = styled.div`
  ${centeredItems};
`;

const OpenTheGameItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const BalloonWrapper = styled.div<{ isAnimationInitiated: boolean }>`
  @keyframes upAndGone {
    0% {
      bottom: 0;
      display: block;
    }
    75% {
      opacity: 1;
    }
    100% {
      bottom: 200%;
      display: none;
      opacity: 0;
    }
  }
  position: relative;
  animation: ${({ isAnimationInitiated }) =>
    `${isAnimationInitiated ? "upAndGone 2.5s ease-in forwards" : "none"}`};
  position: relative;
`;

const Arrow = styled.img<{ isVisible: boolean }>`
  @keyframes bounce {
    0% {
      bottom: 0;
    }
    50% {
      bottom: 30px;
    }
    100% {
      bottom: 0;
    }
  }
  @keyframes goDown {
    0% {
      top: 0;
      opacity: 1;
    }
    100% {
      top: 200px;
      opacity: 0;
    }
  }
  height: 30px;
  position: relative;
  animation: ${({ isVisible }) =>
    isVisible
      ? "bounce 1s linear forwards infinite"
      : "goDown 0.2s linear forwards"};
`;

const OpenTheGameText = styled.h2`
  font-size: ${FontSize[30]};
  position: absolute;
  top: ${Spacing[40]};
  transform: rotate(-16deg);
  text-align: center;
  z-index: ${zIndex.positive};
  pointer-events: none;
`;

const BalloonImg = styled.img`
  ${balloonBaseStyle}
`;

const IdleGameScreen = ({
  onStartClick,
  isGameScreenOpen,
}: IdleGameScreenProps) => {
  return (
    <MainContainer>
      <Paragraph text="All work and no play makes Jack a dull boy." />

      <OpenTheGameItems>
        <Arrow
          isVisible={!isGameScreenOpen}
          src={ArrowImg}
          alt={"Arrow pointing down"}
        />
        <BalloonWrapper
          onClick={() => onStartClick(true)}
          isAnimationInitiated={isGameScreenOpen}
        >
          {!isGameScreenOpen && (
            <OpenTheGameText>Open the game</OpenTheGameText>
          )}
          <BalloonImg src={Balloon} alt="Balloon" />
        </BalloonWrapper>
      </OpenTheGameItems>
    </MainContainer>
  );
};

export default IdleGameScreen;
