import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  balloonBaseStyle,
  ColorPalette,
  MediaQuery,
  Spacing,
  zIndex,
} from "config/style";

import BalloonImg from "images/balloonGame/balloon.png";
import CloseImg from "images/close.png";

import useWindowDimensions from "hooks/useWindowDimensons";
import { GameStage } from "components/BalloonGame/BaloonGame";

import {
  Clouds,
  PointsCounter,
  Paragraph,
  HighScore,
} from "components/BalloonGame/index";
import Button from "components/buttons";

import {
  getFromLocalStorage,
  LocalStorage,
  setToLocalStorage,
} from "utils/localStorage";
import IconButton from "components/buttons/IconButton";

interface OpenGameScreenProps {
  onClose: () => void;
  gameStage: GameStage;
  setGameStage: (stage: GameStage) => void;
}

const GameContainer = styled.section`
  @keyframes backgroundAppear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  background: ${ColorPalette.balloonGameBackground};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  animation: backgroundAppear 1s ease-in forwards;
`;

const CloseButtonWrapper = styled.div`
  margin: ${Spacing[4]} ${Spacing[12]} 0 auto;
  z-index: ${zIndex.aboveClouds};
`;

const BallononWrapper = styled.div<{
  position: { x: string; y: string };
  gameStarted: boolean;
}>`
  @keyframes flyFromBottom {
    0% {
      opacity: 0;
      bottom: 0;
    }
    40% {
      opacity: 0;
      bottom: 0;
    }
    100% {
      opacity: 1;
      bottom: 20%;
    }
  }

  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  animation: flyFromBottom 1.5s forwards linear;
  transition: transform 16s linear;

  ${({ position, gameStarted }) => `
    transform: translateX(${position.x}) translateY(${position.y});
  z-index: ${gameStarted ? zIndex.negative : zIndex.positive};
    transition: ${gameStarted ? "transform 16s linear" : "none"};
  `}
`;

const Balloon = styled.img<{
  gameStarted: boolean;
}>`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-30deg);
    }
    75% {
      transform: rotate(30deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  ${balloonBaseStyle};

  ${({ gameStarted }) => `
  animation: ${gameStarted ? "rotate 5s linear forwards infinite" : "none"};
  transform: ${!gameStarted && "rotate(0)"}
  transition: transform 16s linear;
`}
`;

const CenteredContainer = styled.div`
  margin: 10% auto 0;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: ${zIndex.positive};
  background: ${ColorPalette.whiteTransparent};
  padding: 60px 10px;
  border: 2px solid ${ColorPalette.black};

  ${MediaQuery.s} {
    margin: 20% 15px 0;
  }
`;

const PointsWrapper = styled.div`
  @keyframes appearFromBottom {
    0% {
      opacity: 0;
      bottom: -100%;
      right: -100%;
    }
    100% {
      opacity: 1;
      bottom: 20px;
      right: 20px;
    }
  }
  position: fixed;
  animation: appearFromBottom 2s forwards linear;
  z-index: ${zIndex.positive};
`;

const defaultBalloonPosition = {
  x: "-50%",
  y: "0",
};

const OpenGameScreen = ({
  onClose,
  gameStage,
  setGameStage,
}: OpenGameScreenProps) => {
  const [balloonPosition, setBalloonPosition] = useState(
    defaultBalloonPosition
  );
  const [score, setScore] = useState<null | number>(null);

  const balloonRef = useRef<HTMLImageElement>(null);
  const windowDimensions = useWindowDimensions();

  const balloonObserver = new IntersectionObserver((entries) => {
    const balloon = entries[0];

    if (!balloon.isIntersecting) {
      setGameStage(GameStage.gameOver);
    }
  });

  useEffect(() => {
    if (balloonRef.current && gameStage === GameStage.started) {
      balloonObserver.observe(balloonRef.current);
    }

    return () => balloonObserver.disconnect();
  }, [balloonRef, gameStage]);

  const getRandomOffscreenPosition = (screenWidthOrHeight: number) => {
    return Math.random() > 0.5
      ? `${Math.random() * 2000 + screenWidthOrHeight}px`
      : `${-(Math.random() * 2000) - screenWidthOrHeight}px`;
  };

  const onGameOver = (gameScore: number) => {
    const highScore = Number(getFromLocalStorage(LocalStorage.highScore)) || 0;
    setScore(gameScore);

    if (highScore < gameScore) {
      setToLocalStorage(LocalStorage.highScore, String(gameScore));
    }
  };

  return (
    <GameContainer>
      <CloseButtonWrapper>
        <IconButton iconSrc={CloseImg} onClick={() => onClose()} />
      </CloseButtonWrapper>
      <Clouds countOfClouds={5} />

      {gameStage === GameStage.ready && (
        <CenteredContainer>
          <Paragraph text="Click on the balloon to bounce it and try not to loose it offscreen!" />
        </CenteredContainer>
      )}
      {gameStage === GameStage.gameOver && (
        <CenteredContainer>
          <Paragraph text={`Aaaand it's gone! You scored ${score} points!`} />
          <Button
            onClick={() => {
              balloonObserver.disconnect();
              setBalloonPosition(defaultBalloonPosition);
              setGameStage(GameStage.ready);
              setScore(null);
            }}
          >
            Try again
          </Button>
        </CenteredContainer>
      )}
      <BallononWrapper
        gameStarted={gameStage === GameStage.started}
        position={{ x: balloonPosition.x, y: balloonPosition.y }}
        onClick={() => {
          setBalloonPosition({
            x: getRandomOffscreenPosition(windowDimensions.width),
            y: getRandomOffscreenPosition(windowDimensions.height),
          });

          if (gameStage !== GameStage.started) {
            setGameStage(GameStage.started);
          }
        }}
        ref={balloonRef}
      >
        <Balloon
          gameStarted={gameStage === GameStage.started}
          src={BalloonImg}
        />
      </BallononWrapper>
      <PointsWrapper>
        <HighScore />
        <PointsCounter
          gameStage={gameStage}
          onGameEnd={(gameScore: number) => onGameOver(gameScore)}
        />
      </PointsWrapper>
    </GameContainer>
  );
};

export default OpenGameScreen;
