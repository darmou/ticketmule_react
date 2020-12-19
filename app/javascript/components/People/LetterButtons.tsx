import React, { useContext } from "react";
import ContactStore from "../../actions/contactStore";
import UserStore from "../../actions/userStore";
import PageButton from "../ComponentLibrary/PageButton";
import styled from "styled-components";
import { TicketContext } from "../../packs/application";
import { RESOURCE_TYPES, ResourcePageInfo } from "../../types/types";

const LetterButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const LetterButtonsStyle = styled.span`
    display: flex;
`;

interface Props {
    resourcePageInfo: ResourcePageInfo,
    resourceType: RESOURCE_TYPES
}

const LetterButtons = ({resourcePageInfo, resourceType} : Props) => {
    const { dispatch } = useContext(TicketContext);
    const { letterSelected } = resourcePageInfo;

    const setSelectedLetter = (letter) => {
        if (letter === '*') {
            letter = null;
        }

        switch (resourceType) {
            case RESOURCE_TYPES.CONTACT:
                dispatch({action_fn: ContactStore.setContactLetterSelected, letter});
                break;
            case RESOURCE_TYPES.USER:
                dispatch({action_fn: UserStore.setUserLetterSelected, letter});
                break;
        }
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

export default LetterButtons;