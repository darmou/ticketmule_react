import styled from "styled-components";

export const header = `
    background: #f1f1f1;
`;


export const TableHeaderStyled = styled.thead`
    background-color: #f1f1f1;
`;

export const TRHeaderStyled = styled.tr`
    ${header}
`;

export const TableListingStyled = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 2px 0 16px 0;
    background: #fff;
    line-height: 11px;
    border-top: 1px solid #ccc;
    th {
      color: #888;
      padding: 6px 2px;
    }
    th, td {
      text-align: left;
      padding: 4px 2px;
    }
    tr {
       border-bottom: 1px solid #ccc;
    }
`;


export const TableWithPagination = styled.div`
    
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

