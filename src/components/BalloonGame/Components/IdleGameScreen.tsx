import styled from "styled-components";
import Balloon from "images/balloonGame/balloon.png";
import {
  FontFamily,
  FontSize,
  balloonBaseStyle,
  zIndex,
} from "config/style";
import Paragraph from "./Paragraph";

interface IdleGameScreenProps {
  onStartClick: (isGameScreenOpen: boolean) => void;
  isGameScreenOpen: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const GameOpenWrapper = styled.div`
  position: relative;
`;

const GameOpenText = styled.h2`
  font-family: ${FontFamily.teko};
  font-size: ${FontSize[30]};
  position: absolute;
  top: 40px;
  transform: rotate(-16deg);
  text-align: center;
  z-index: ${zIndex.positive};
  pointer-events: none;
  line-height: 25px ;
`;

const BalloonImg = styled.img<{ isAnimationInitiated: boolean }>`
  @keyframes upAndGone {
    0% {
      bottom: 0;
      display: block;
    }
    75% {
      opacity: 1;
    }
    100% {
      bottom: 300%;
      display: none;
      opacity: 0;
    }
  }

  ${balloonBaseStyle}
  position: relative;
  animation: ${({ isAnimationInitiated }) =>
    `${isAnimationInitiated ? "upAndGone 2.5s ease-in forwards" : "none"}`};
`;

const IdleGameScreen = ({
  onStartClick,
  isGameScreenOpen,
}: IdleGameScreenProps) => {
  return (
    <Container>
      <Paragraph text="All work and no play makes Jack a dull boy." />

      <GameOpenWrapper>
        {!isGameScreenOpen && <GameOpenText>Open the game</GameOpenText>}
        <BalloonImg
          src={Balloon}
          alt="Balloon"
          onClick={() => onStartClick(true)}
          isAnimationInitiated={isGameScreenOpen}
        />
      </GameOpenWrapper>
    </Container>
  );
};

export default IdleGameScreen;
