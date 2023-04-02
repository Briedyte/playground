import styled from "styled-components";
import Balloon from "images/balloonGame/balloon.png";
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

const OpenTheGameItems = styled.div<{ isAnimationInitiated: boolean }>`
  @keyframes upAndGone {
    0% {
      bottom: 0;
      display: block;
    }
    75% {
      opacity: 1;
    }
    100% {
      bottom: 100%;
      display: none;
      opacity: 0;
    }
  }
  position: relative;
  animation: ${({ isAnimationInitiated }) =>
    `${isAnimationInitiated ? "upAndGone 2.5s ease-in forwards" : "none"}`};
  position: relative;
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

      <OpenTheGameItems
        onClick={() => onStartClick(true)}
        isAnimationInitiated={isGameScreenOpen}
      >
        {!isGameScreenOpen && <OpenTheGameText>Open the game</OpenTheGameText>}
        <BalloonImg src={Balloon} alt="Balloon" />
      </OpenTheGameItems>
    </MainContainer>
  );
};

export default IdleGameScreen;
