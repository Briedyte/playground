import React from "react";
import styled, { css } from "styled-components";
import CloudImg from "images/balloonGame/cloud.svg";
import { MediaQuery, zIndex } from "config/style";

interface CloudsProps {
  countOfClouds: number;
}

const minCloudAnimationDuration = 6;

const CloudsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: ${zIndex.clouds};
  pointer-events: none;
`;

const Cloud = styled.img<{ animationDuration: number; countOfClouds: number }>`
  @keyframes sideToSide {
    0% {
      left: -20%;
      opacity: 0;
    }
    4% {
      opacity: 1;
    }
    100% {
      left: 100%;
    }
  }
  position: relative;
  width: fit-content;
  pointer-events: fill;
  z-index: ${zIndex.clouds};

  ${({ countOfClouds, animationDuration }) => `
  animation: sideToSide ${animationDuration}s linear forwards infinite;
  height: ${100 / countOfClouds}%;

  ${MediaQuery.s}{
    height: ${80 / countOfClouds}%;
    }

  `}

  ::selection {
    background: transparent;
  }
  ::-moz-selection {
    background: transparent;
  }
`;

const Clouds = React.memo(({ countOfClouds }: CloudsProps) => {
  const cloudIndexes = [...Array(countOfClouds).keys()];

  return (
    <CloudsContainer>
      {cloudIndexes.map((cloudIndex) => {
        const randomCloudAnimationDurations =
          Math.random() * 10 + minCloudAnimationDuration;
        return (
          <Cloud
            src={CloudImg}
            alt={"Cloud"}
            animationDuration={randomCloudAnimationDurations}
            key={cloudIndex}
            countOfClouds={countOfClouds}
          />
        );
      })}
    </CloudsContainer>
  );
});

export default Clouds;
