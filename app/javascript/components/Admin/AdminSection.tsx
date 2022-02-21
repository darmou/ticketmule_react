import useSliderToggle from "react-slide-toggle-hooks";
import { capitalizeEachWord, SLIDE_DURATION } from "../../utils/displayUtils";
import { H3ToggleStyled } from "../ComponentLibrary/H3ToggleStyled";
import DisableIcon from "../../images/disable.png";
import EnableIcon from "../../images/accept.png";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledUL = styled.ul`
    font-weight: bold;
    margin: 0 0 5px 0;
    padding: 0;
    list-style: none;
`;

const StyledLI = styled.li`
    padding: 4px 0;
    margin: 0;
    height: 18px;
    display: block;
    cursor: pointer;
    display: flex;
    align-content: center;
    
    &:hover {
        span {
            display: block;
        }
   }
    
    span {
        display: none;
        margin: 0;
        padding-left: 20px;
        margin-left: 5px;
        text-decoration: underline;
        box-sizing: border-box;
        background: ${({isEnabled}) => (isEnabled) ? `#fee url(/assets/${DisableIcon})` : `#efe url(assets/${EnableIcon})`} no-repeat 2px center;
        color: ${({isEnabled}) => (isEnabled)  ? "#c00" : "#585"} !important;
        font-weight: normal;
        border: 1px solid #fee;
    }
    
    
`;

const AdminSection = ({optionResources, toggleDisabled, isEnabled}) => {
    const {expandableRef, slideToggleState, toggle} = useSliderToggle({duration: SLIDE_DURATION});
    const aFilter = (isEnabled) ?
        // eslint-disable-next-line react/prop-types
        (optionType) => optionType.disabled_at == null :
        // eslint-disable-next-line react/prop-types
        (optionType) => optionType.disabled_at != null;
    const clickLabel = (isEnabled) ? 'Disable' : 'Enable';
    const headerLabel = (isEnabled) ? 'Enabled' : 'Disabled';

    return (
        <>
            <H3ToggleStyled isOpen={slideToggleState.toggleState} onClick={toggle}>{headerLabel}</H3ToggleStyled>
            <StyledUL ref={expandableRef}>
                {optionResources.filter((optionType) => aFilter(optionType)).map((optionType, idx) =>
                    <StyledLI isEnabled={optionType.disabled_at == null} key={`${optionType.name}_${idx}`}>
                        { capitalizeEachWord(optionType.name)}
                        <span onClick={() => toggleDisabled(optionType)}>{clickLabel}</span>
                    </StyledLI>)
                }
            </StyledUL>
        </>
    );
};

AdminSection.propTypes = {
    optionResources: PropTypes.array,
    toggleDisabled: PropTypes.func,
    isEnabled: PropTypes.bool
};

export default AdminSection;