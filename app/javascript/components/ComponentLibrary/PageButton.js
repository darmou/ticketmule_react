import styled from "styled-components";

const PageButton = styled.button`
    border: 1px solid ${({disabled}) => (disabled) ? '#ccc' : '#4d88cf'};
    text-decoration: none;
    color:  ${({isActive, disabled}) => (isActive) ? '#fff' : (disabled) ? '#ccc': '#4d88cf' };
    background-color:  ${({isActive}) => (isActive) ? '#4d88cf' : '#fff'};
    font-weight: 700;
    border-radius: 3px;
    margin: 0 3px 0 3px;
    cursor: pointer;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
`;

export default PageButton;