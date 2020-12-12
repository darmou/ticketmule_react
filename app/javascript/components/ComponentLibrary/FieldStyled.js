import styled from "styled-components";

const FieldStyled = styled.input`
    padding: 4px;
    background: #fff;
    border: 1px solid #ccc;
    font: 12px Verdana,sans-serif;
    border-radius: 3px;
    width: ${({width}) => width}px;
    margin-right: 5px;
`;

export default FieldStyled;