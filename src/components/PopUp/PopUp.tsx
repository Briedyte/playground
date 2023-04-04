import Button, { ButtonVariant } from "components/buttons/Button";
import { ColorPalette, Spacing, zIndex } from "config/style";
import styled from "styled-components";

interface PopUpProps {
  children: React.ReactNode;
  onClose: () => void;
  onButtonClick: () => void;
}

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000e0;
  z-index: ${zIndex.popUp};
  display: grid;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  max-width: 500px;
  display: inline-block;
  margin: 0 auto;
  background: ${ColorPalette.whiteTransparent};
  padding: ${Spacing[18]};
`;

const PopUp = ({ children, onClose, onButtonClick }: PopUpProps) => {
  return (
    <BackDrop>
      <Container>
        <p onClick={() => onClose()}>close</p>
        {children}
        <Button
          variant={ButtonVariant.transparent}
          onClick={() => onButtonClick()}
        >
          OK
        </Button>
      </Container>
    </BackDrop>
  );
};
export default PopUp;
