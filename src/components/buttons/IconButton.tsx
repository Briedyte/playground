import { ColorPalette } from "config/style";
import styled from "styled-components";

interface IconButtonProps {
    iconSrc: string;
    onClick: () => void
}

const Icon = styled.img`
height: 30px;
width: 30px;
background: ${ColorPalette.tertiary};
padding: 4px;
border-radius: 5px;
border: 2px solid black;
cursor: pointer;

:hover{
background: ${ColorPalette.secondaryLighter}
}
`

const IconButton = ({iconSrc, onClick}: IconButtonProps) => {

    return <Icon src={iconSrc} onClick={() => onClick()} />
    
}
export default IconButton;
