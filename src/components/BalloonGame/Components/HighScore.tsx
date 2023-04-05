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

import PopUp from "components/PopUp";

interface HighScoreProps {
  onBinIconClick: () => void;
  onPopUpClose: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${Spacing[14]};
`;

export enum HightScoreVariant {
  Small = "Small",
  Large = "Large",
}

const HighScore = ({ onBinIconClick, onPopUpClose }: HighScoreProps) => {
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

  if (!highScore) {
    return null;
  }

  return (
    <>
      <Container>
        <p>{scoreText}</p>
        <IconButton
          iconSrc={BinImg}
          onClick={() => {
            setIsPopupVisible(true);
            onBinIconClick();
          }}
        />
      </Container>
      <PopUp
        onClose={() => {
          setIsPopupVisible(false);
          onPopUpClose();
        }}
        onButtonClick={() => {
          deleteFromLocalStorage(LocalStorage.highScore);
          setIsPopupVisible(false);
          onPopUpClose();
        }}
        buttonText="Yes"
        isVisible={isPopupVisible}
      >
        <p>Are you sure you want to delete your high score?</p>
      </PopUp>
    </>
  );
};
export default HighScore;
