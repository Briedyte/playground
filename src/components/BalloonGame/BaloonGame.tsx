import { useState } from "react";
import { OpenGameScreen, IdleGameScreen } from "components/BalloonGame/index";
import Github from "images/github_logo.png";
import styled from "styled-components";

export enum GameStage {
  idle = "idle",
  ready = "ready",
  started = "started",
  gameOver = "gameOver",
  paused = "paused",
}

const GameWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const GithubLogo = styled.img`
  height: 4rem;
  margin: 1rem;
`;

function BalloonGame() {
  const [gameStage, setGameStage] = useState(GameStage.idle);
  const isGameOpen = gameStage !== GameStage.idle;

  return (
    <GameWrapper>
      <a href="https://github.com/Briedyte/playground" target="_blank">
        <GithubLogo src={Github} alt="Link to Github code" />
      </a>
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
    </GameWrapper>
  );
}

export default BalloonGame;
