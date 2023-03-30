import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  balloonBaseStyle,
  ColorPalette,
  FontSize,
  MediaQuery,
  Spacing,
  zIndex,
} from "config/style";
import BalloonImg from "images/balloonGame/balloon.png";

import useWindowDimensions from "hooks/useWindowDimensons";
import { GameStage } from "components/BalloonGame/BaloonGame";
import { Button } from "components/Button/Button";
import { Clouds, PointsCounter } from "components/BalloonGame/index";

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
const BalloonContainer = styled.div<{
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
    bottom: 30%;
  }
}
background: yellow;
position: absolute;
left: 50%;
animation: flyFromBottom 2s forwards linear;
transition: transform 16s linear;

${({ position, gameStarted }) => `
transform: translateX(${position.x}) translateY(${position.y});
z-index: ${gameStarted ? zIndex.negative : zIndex.aboveClouds};
transition: ${gameStarted ? "transform 16s linear" : "none"};
`}
`

const Balloon = styled.img`
  ${balloonBaseStyle};
  cursor: pointer;
`;

const CenteredContainer = styled.div`
  margin: 10% auto 0;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: ${zIndex.aboveClouds};
  background: ${ColorPalette.whiteTransparent};
  padding: 60px;
  border: 2px solid ${ColorPalette.black};

  ${MediaQuery.s} {
    margin: 20% 15px 0;
  }
`;

const Typography = styled.p`
  text-align: center;
  font-size: ${FontSize[40]};
  pointer-events: none;

  ${MediaQuery.s} {
    font-size: 30px;
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



  useEffect(() => {
    const balloonObserver = new IntersectionObserver((entries) => {
      const balloon = entries[0];
  
      if (!balloon.isIntersecting) {
        setGameStage(GameStage.gameOver);
      }
    },{
      threshold: 0.2,
      root: document,
      rootMargin: '3px'
      });


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
    <GameContainer >
      <CloseButton
        onClick={() => {
          onClose();
        }}
      >
        &#x274c;
      </CloseButton>
      {gameStage === GameStage.ready && (
        <CenteredContainer>
          <Typography>
            Click on the balloon to bounce it and try not to loose it offscreen!
          </Typography>
        </CenteredContainer>
      )}
      {gameStage === GameStage.gameOver && (
        <CenteredContainer>
          <Typography>Aaaand it's gone! You scored {score} points!</Typography>
          <Button
            onClick={() => {
              setBalloonPosition(defaultBalloonPosition);
              setGameStage(GameStage.ready);
            }}
          >
            Try again
          </Button>
        </CenteredContainer>
      )}
      <Clouds countOfClouds={5} />
      <BalloonContainer  gameStarted={gameStage === GameStage.started}
        position={{ x: balloonPosition.x, y: balloonPosition.y }}
        ref={balloonRef}>
      <Balloon
        src={BalloonImg} alt="Balloon"
        onClick={() => {
          if (gameStage !== GameStage.started) {
            setGameStage(GameStage.started);
          }
          setBalloonPosition({
            x: getRandomOffscreenPosition(windowDimensions.width),
            y: getRandomOffscreenPosition(windowDimensions.height),
          });
        }}

      />
      </BalloonContainer>
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
