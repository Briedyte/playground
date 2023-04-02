import styled from "styled-components";
import Balloon from "images/balloonGame/balloon.png";
import ArrowImg from "images/balloonGame/arrow.svg";

import {
  ColorPalette,
  FontSize,
  Spacing,
  balloonBaseStyle,
  zIndex,
} from "config/style";
import Paragraph from "./Paragraph";

interface IdleGameScreenProps {
  onStartClick: (isGameScreenOpen: boolean) => void;
  isGameScreenOpen: boolean;
}

const MainContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const OpenTheGameItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const BalloonWrapper = styled.div<{ isAnimationInitiated: boolean }>`
  @keyframes upAndGone {
    0% {
      bottom: 0;
    }
    75% {
      opacity: 1;
    }
    100% {
      bottom: 500px;
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

const Title = styled.h3`
  font-size: ${FontSize[40]};
  text-align: center;
  padding: 5%;
`;

const OpenTheGameText = styled.h2`
  font-size: ${FontSize[30]};
  position: absolute;
  top: ${Spacing[32]};
  transform: rotate(-16deg) translateX(-50%);
  text-align: center;
  z-index: ${zIndex.positive};
  pointer-events: none;
  width: 100px;
  left: 50%;
  line-height: 1.7rem;
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
      <Title>All work and no play makes Jack a dull boy.</Title>

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
