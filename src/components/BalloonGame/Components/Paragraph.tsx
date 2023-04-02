import { FontSize, MediaQuery, Spacing } from 'config/style';
import styled from 'styled-components';

const ParagraphStyled = styled.p`
  text-align: center;
  font-size: ${FontSize[40]};
  pointer-events: none;
  padding: ${Spacing[16]};

  ${MediaQuery.s} {
    font-size: 30px;
  }
`;

const Paragraph = ({text}: {text: string}) => {
  return (
    <ParagraphStyled>{text}</ParagraphStyled>
  )
}

export default Paragraph