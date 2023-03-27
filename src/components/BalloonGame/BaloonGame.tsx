import { useState } from "react";
import { OpenGameScreen, IdleGameScreen } from "components/BalloonGame/index";

export enum GameStage {
  idle = "idle",
  ready = "ready",
  started = "started",
  gameOver = "gameOver",
}

function BalloonGame() {
  const [gameStage, setGameStage] = useState(GameStage.idle);
  const isGameOpen = gameStage !== GameStage.idle;

  return (
    <>
      <IdleGameScreen
        onStartClick={() => setGameStage(GameStage.ready)}
        isGameScreenOpen={isGameOpen}
      />
      {isGameOpen && (
        <OpenGameScreen
          onClose={() => setGameStage(GameStage.idle)}
          gameStage={gameStage}
          setGameStage={(stage: GameStage) => setGameStage(stage)}
        />
      )}
    </>
  );
}

export default BalloonGame;
