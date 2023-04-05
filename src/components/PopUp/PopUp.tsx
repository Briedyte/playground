import Button, { ButtonVariant } from "components/buttons/Button";
import IconButton from "components/buttons/IconButton";
import CloseImg from "images/close.png";
import { ColorPalette, Spacing, zIndex } from "config/style";
import styled from "styled-components";
import { useCallback, useEffect, useRef } from "react";

interface PopUpProps {
  children: React.ReactNode;
  onClose: () => void;
  onButtonClick: () => void;
  buttonText: string;
}

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${ColorPalette.blackTransparent};
  z-index: ${zIndex.popUp};
  display: grid;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spacing[18]};
  margin: 0 auto;
  background: ${ColorPalette.whiteTransparent};
  padding: ${Spacing[18]};
`;

const CloseButtonWrapper = styled.div`
  margin: ${Spacing[4]} ${Spacing[12]} 0 auto;
  display: inline-block;
`;

const PopUp = ({
  children,
  onClose,
  onButtonClick,
  buttonText,
}: PopUpProps) => {
  const modalRef = useRef(null);

  const keyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <BackDrop onClick={(e) => closeModal(e)} ref={modalRef}>
      <Container>
        <CloseButtonWrapper>
          <IconButton iconSrc={CloseImg} onClick={() => onClose()} />
        </CloseButtonWrapper>
        {children}
        <Button onClick={() => onButtonClick()}>{buttonText}</Button>
      </Container>
    </BackDrop>
  );
};
export default PopUp;
