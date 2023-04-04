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

import useWindowDimensions from "hooks/useWindowDimensons";
import { GameStage } from "components/BalloonGame/BaloonGame";
import { Clouds, PointsCounter, Paragraph } from "components/BalloonGame/index";
import Button from "components/Button";

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

const CloseButton = styled.button`
  border: 0;
  background: ${ColorPalette.tertiary};
  cursor: pointer;
  height: 40px;
  width: 40px;
  margin-right: ${Spacing[12]};
  margin-left: auto;
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
    z-index: ${gameStarted ? zIndex.negative : zIndex.aboveClouds};
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
  z-index: ${zIndex.aboveClouds};
  background: ${ColorPalette.whiteTransparent};
  padding: 60px 10px;
  border: 2px solid ${ColorPalette.black};

  ${MediaQuery.s} {
    margin: 20% 15px 0;
  }
`;

const CounterWrapper = styled.div`
  @keyframes appearFromBottom {
    0% {
      opacity: 0;
      transform: translateY(60px) translateX(60px);
    }
    90% {
      opacity: 0;
      transform: translateY(60px) translateX(60px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  position: fixed;
  bottom: 20px;
  right: 20px;
  animation: appearFromBottom 2s forwards linear;
  z-index: ${zIndex.aboveClouds};
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

  const balloonObserver = new IntersectionObserver(
    (entries) => {
      const balloon = entries[0];

      if (!balloon.isIntersecting) {
        setGameStage(GameStage.gameOver);
      }
    },
    {
      threshold: 0.1,
    }
  );

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

  return (
    <GameContainer>
      <CloseButton
        onClick={() => {
          onClose();
        }}
      >
        &#x274c;
      </CloseButton>
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
            }}
          >
            Try again
          </Button>
        </CenteredContainer>
      )}
      <Clouds countOfClouds={5} />
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
      <CounterWrapper>
        <PointsCounter
          isActive={gameStage === GameStage.started}
          reset={gameStage === GameStage.ready}
          onGameEnd={(score: number) => setScore(score)}
        />
      </CounterWrapper>
    </GameContainer>
  );
};

export default OpenGameScreen;
