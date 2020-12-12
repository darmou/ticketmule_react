import styled from "styled-components";
import PlusImage from "../../images/plus.gif";
import MinusImage from "../../images/minus.gif";
export const SLIDE_STATES = {
    EXPANDED: 'EXPANDED',
    EXPANDING: 'EXPANDING',
    COLLAPSED: 'COLLAPSED',
    COLLAPSING: 'COLLAPSING'
};
Object.freeze(SLIDE_STATES);

export const H3ToggleStyled = styled.h3`
    padding: 6px 0 6px 20px;
    background: ${({isOpen}) => `url(${(isOpen === SLIDE_STATES.COLLAPSED || 
        isOpen === SLIDE_STATES.COLLAPSING) ? PlusImage : MinusImage}) no-repeat left center`};
    &:hover {
      cursor: pointer;
      color: #90af4c;
    }
`;