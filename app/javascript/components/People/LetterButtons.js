import React, { useContext } from "react";
import ContactStore from "../../actions/contactStore";
import PageButton from "../ComponentLibrary/PageButton";
import styled from "styled-components";
import { PropTypes } from "prop-types";
import { TicketContext } from "../../packs/application";

const LetterButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const LetterButtonsStyle = styled.span`
    display: flex;
`;


const LetterButtons = ({resourcePageInfo, resourceType}) => {
    const { dispatch } = useContext(TicketContext);
    const { letterSelected } = resourcePageInfo;

    const setSelectedLetter = (letter) => {
        if (letter === '*') {
            letter = null;
        }
        //const setContactLetterSelected = resourceType === REOURCE_TYPES.Ticket()
        dispatch({action_fn: ContactStore.setContactLetterSelected, letter: letter});
    };

    const letters = ['*', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const letterButtons = letters.map((letter) => (<PageButton isActive={letterSelected === letter}
                                                               onClick={() => setSelectedLetter(letter)}
                                                               key={letter}>{letter}</PageButton>));

    return (
        <LetterButtonsWrapper>
            <LetterButtonsStyle>
                {letterButtons}
            </LetterButtonsStyle>
        </LetterButtonsWrapper>
    );
};

LetterButtons.propTypes = {
    resourcePageInfo: PropTypes.object,
    resourceType: PropTypes.object
};

export default LetterButtons;