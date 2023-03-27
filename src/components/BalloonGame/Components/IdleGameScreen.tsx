import styled from "styled-components";
import Balloon from "images/balloonGame/balloon.png";
import { balloonBaseStyle } from "config/style";

interface IdleGameScreenProps {
  onStartClick: (isGameScreenOpen: boolean) => void;
  isGameScreenOpen: boolean;
}

const BalloonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const BaloonImg = styled.img<{ isAnimationInitiated: boolean }>`
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
    <BalloonWrapper>
      <BaloonImg
        src={Balloon}
        alt="Balloon"
        onClick={() => onStartClick(true)}
        isAnimationInitiated={isGameScreenOpen}
      />
    </BalloonWrapper>
  );
};

export default IdleGameScreen;
