import styled from "styled-components";

export const MIN_PASSWORD_LEN = 8;

export const FieldStyled = styled.input`
    padding: 4px;
    background: #fff;
    border: 1px solid #ccc;
    font: 12px Verdana,sans-serif;
    border-radius: 3px;
    width: ${({width}) => width}px;
    margin-right: 5px;
`;

export const Row = styled.div`
  float: left;
  width: 100%;
  margin-bottom: 3px;
  &:last-child {
    margin-top: 10px;
  }
`;

export const StyledLabel = styled.label`
  width: 20%;
  float: left;
  text-align: right;
  margin-right: 10px;
  line-height: 24px;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledInput = styled.input`
    width: 76%;
`;

export const StyledForm = styled.form`
    input:hover, textarea:hover, select:hover {
        border: 1px solid #999;
    }
    input, select, textarea {
        padding: 4px;
        background: #fff;
        border: 1px solid #ccc;
    }
    textarea, select, input[type="text"] {
        float: left;
    }
    font: 12px Verdana,sans-serif;
`;

export const StyledRow = styled.div`
       margin-bottom: ${({marginBottom = 10}) => marginBottom}px;
`;

export const Label = styled.div`
    display: block;
    font-weight: bold;
`;
