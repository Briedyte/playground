import { useEffect, useState } from "react";
import {
  deleteFromLocalStorage,
  LocalStorage,
  localStorageEventEmitter,
} from "utils/localStorage";
import { Spacing } from "config/style";

import BinImg from "images/bin.svg";
import IconButton from "components/buttons/IconButton";

import styled from "styled-components";

import { Paragraph } from "components/BalloonGame/index";
import PopUp from "components/PopUp";

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${Spacing[14]};
`;

export enum HightScoreVariant {
  Small = "Small",
  Large = "Large",
}

const HighScore = ({ variant = HightScoreVariant.Small }) => {
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem(LocalStorage.highScore)) || 0
  );
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const scoreText = `High score: ${highScore || 0}`;

  useEffect(() => {
    const listener = () => {
      setHighScore(Number(localStorage.getItem(LocalStorage.highScore)));
    };
    localStorageEventEmitter.addListener("change", listener);

    return () => {
      localStorageEventEmitter.removeListener("change", listener);
    };
  }, []);

  return (
    <>
      <Container>
        {variant === HightScoreVariant.Large ? (
          <Paragraph text={scoreText} />
        ) : (
          <p>{scoreText}</p>
        )}

        {!!highScore && (
          <IconButton
            iconSrc={BinImg}
            onClick={() => setIsPopupVisible(true)}
          />
        )}
      </Container>
      {isPopupVisible && (
        <PopUp
          onClose={() => setIsPopupVisible(false)}
          onButtonClick={() => {
            deleteFromLocalStorage(LocalStorage.highScore);
            setIsPopupVisible(false);
          }}
        >
          <p>Are you sure you want to delete yout high score?</p>
        </PopUp>
      )}
    </>
  );
};
export default HighScore;
