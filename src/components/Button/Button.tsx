import React from "react";
import styled, { css } from "styled-components";
import {
  ColorPalette,
  FontFamily,
  FontSize,
  Spacing,
  zIndex,
} from "config/style";

export enum ButtonVariant {
  default = "default",
  transparent = "transparent",
  plain = "plain",
}

const ButtonWrapper = styled.div`
  position: relative;
  z-index: ${zIndex.positive};
`;

const ButtonStyled = styled.button<{ variant: ButtonVariant }>`
  font: ${FontFamily.header};
  font-size: ${FontSize[18]};
  cursor: pointer;
  background: none;
  border: none;

  ${({ variant }) => css`

    ${variant === ButtonVariant.default &&
    css`
      background: ${ColorPalette.secondary};
      color: ${ColorPalette.lightText};
      padding: ${Spacing[12]} ${Spacing[32]};
      border: 2px solid ${ColorPalette.black};
      border-radius: 20px;
      transition: all 0.3s linear;
      position: relative;
      top: 0;
      :after {
        content: "";
        border: 2px solid ${ColorPalette.black};
        background: ${ColorPalette.secondaryDarker};
        border-radius: 20px;
        display: block;
        position: absolute;
        top: 0;
        bottom: -6px;
        left: -3px;
        right: -3px;
        transition: all 0.2s linear;
        z-index: -1;
      }
      :hover {
        background: ${ColorPalette.secondaryLighter};
      }
      :active {
        top: 5px;
        :after {
          bottom: 0;
          left: 0;
          right: 0;
        }
      }
      :disabled {
        background: ${ColorPalette.secondaryDarker};
      }
    `}

    ${variant === ButtonVariant.transparent &&
    css`
      color: ${ColorPalette.black};
      border-style: dotted;
      border-width: 2px;
      border-color: ${ColorPalette.black};
      background: ${ColorPalette.secondary}90;
      border-radius: 30px;
      padding: ${Spacing[12]};
      transition: all 0.5s ease-in;
      position: relative;
      :hover {
        border-style: dashed;
      }
    `}
    
    ${variant === ButtonVariant.plain &&
    css`
      backround: none;
      color: ${ColorPalette.lightText};
      width: 100%;
      height: 100%;
    `}
  `}
`;

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = ButtonVariant.default,
}: ButtonProps) => {
  return (
    <ButtonWrapper>
      <ButtonStyled
        onClick={onClick}
        type={type}
        disabled={disabled}
        variant={variant}
      >
        {children}
      </ButtonStyled>
    </ButtonWrapper>
  );
};
