import { ColorPalette } from "config/style";
import styled from "styled-components";

interface IconButtonProps {
  iconSrc: string;
  onClick: () => void;
}

const Icon = styled.img`
  height: 35px;
  width: 35px;
  padding: 4px;
  border-radius: 5px;
  border-style: dotted;
  border-width: 2px;
  border-color: ${ColorPalette.black};
  cursor: pointer;

  :hover {
    border-style: dashed;
  }
`;

const IconButton = ({ iconSrc, onClick }: IconButtonProps) => {
  return <Icon src={iconSrc} onClick={() => onClick()} alt={"Icon"} />;
};
export default IconButton;
