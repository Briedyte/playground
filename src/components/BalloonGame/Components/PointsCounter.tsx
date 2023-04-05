import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ColorPalette, FontFamily, FontSize, Spacing } from "config/style";
import { GameStage } from "components/BalloonGame/BaloonGame";

interface TimerProps {
  onGameEnd: (points: number) => void;
  gameStage: GameStage;
}

export const defaultTime = { minutes: 0, seconds: 0 };

const Container = styled.div`
  padding: ${Spacing[20]};
  color: ${ColorPalette.black};
  font-size: ${FontSize[40]};
  font-family: ${FontFamily.paragraph};
  position: relative;
  transition: all 0.5s linear;
  border: 2px solid ${ColorPalette.black};
  min-width: 100px;
  text-align: center;
  background: ${ColorPalette.whiteTransparent};
`;

const PointsCounter = ({ gameStage, onGameEnd }: TimerProps) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (gameStage === GameStage.started) {
      interval = setInterval(() => setPoints((prev) => prev + 1), 300);
    }

    if (gameStage === GameStage.ready) {
      setPoints(0);
    }

    if (gameStage === GameStage.gameOver) {
      onGameEnd(points);
    }

    return () => {
      clearInterval(interval);
    };
  }, [gameStage]);

  return <Container>{points}</Container>;
};

export default PointsCounter;
