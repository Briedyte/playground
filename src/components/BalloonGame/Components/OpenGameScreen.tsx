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

import { GameStage } from "components/BalloonGame/BaloonGame";

import {
  Clouds,
  PointsCounter,
  Paragraph,
  HighScore,
} from "components/BalloonGame/index";
import { Button, IconButton } from "components/buttons/index";

import {
  getFromLocalStorage,
  LocalStorage,
  setToLocalStorage,
} from "utils/localStorage";

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
  isGameInitiated: boolean;
}>`
  @keyframes flyFromBottom {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(500px);
    }
    40% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  position: absolute;
  animation: flyFromBottom 1.5s forwards linear;
  transition: transform 16s linear;

  ${({ position, isGameInitiated }) => `
    top ${position.y};
    left: ${position.x};
    z-index: ${isGameInitiated ? zIndex.negative : zIndex.aboveClouds};
    transition: ${isGameInitiated ? "all 13s linear" : "none"};
  `}
`;

const Balloon = styled.img<{
  isGameInitiated: boolean;
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

  ${({ isGameInitiated }) => `
  animation: ${isGameInitiated ? "rotate 5s linear forwards infinite" : "none"};
  transform: ${!isGameInitiated && "rotate(0)"}
  transition: transform 16s linear;
`}
`;

const CenteredContainer = styled.div`
  margin: 10% auto 0;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: ${zIndex.aboveClouds};
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
  z-index: ${zIndex.aboveClouds};
`;

const defaultBalloonPosition = {
  x: "50%",
  y: "70%",
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

  const getRandomPosition = () => {
    return Math.random() > 0.5
      ? `${Math.random() * 100 + 100}%`
      : `${-(Math.random() * 100) - 100}%`;
  };

  const onGameOver = (gameScore: number) => {
    const highScore = Number(getFromLocalStorage(LocalStorage.highScore)) || 0;
    setScore(gameScore);

    if (highScore < gameScore) {
      setToLocalStorage(LocalStorage.highScore, String(gameScore));
    }
  };

  const pauseGame = () => {
    setGameStage(GameStage.paused);
    setBalloonPosition({
      x: String(balloonRef.current?.offsetLeft || defaultBalloonPosition.x),
      y: String(balloonRef.current?.offsetTop || defaultBalloonPosition.y),
    });
  };

  const resumePausedGame = () => {
    {
      setGameStage(GameStage.started);
      setBalloonPosition({
        x: getRandomPosition(),
        y: getRandomPosition(),
      });
    }
  };

  return (
    <GameContainer>
      <CloseButtonWrapper>
        <IconButton iconSrc={CloseImg} onClick={() => onClose()} />
      </CloseButtonWrapper>

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
      <Clouds countOfClouds={5} />
      <BallononWrapper
        isGameInitiated={
          gameStage === GameStage.started || gameStage === GameStage.paused
        }
        position={{ x: balloonPosition.x, y: balloonPosition.y }}
        onClick={() => {
          setBalloonPosition({
            x: getRandomPosition(),
            y: getRandomPosition(),
          });

          if (gameStage !== GameStage.started) {
            setGameStage(GameStage.started);
          }
        }}
        ref={balloonRef}
      >
        <Balloon
          isGameInitiated={
            gameStage === GameStage.started || gameStage === GameStage.paused
          }
          src={BalloonImg}
        />
      </BallononWrapper>
      <PointsWrapper>
        <HighScore
          onBinIconClick={() => {
            if (gameStage === GameStage.started) pauseGame();
          }}
          onPopUpClose={() => {
            if (gameStage === GameStage.paused) resumePausedGame();
          }}
        />
        <PointsCounter
          gameStage={gameStage}
          onGameEnd={(gameScore: number) => onGameOver(gameScore)}
        />
      </PointsWrapper>
    </GameContainer>
  );
};

export default OpenGameScreen;
