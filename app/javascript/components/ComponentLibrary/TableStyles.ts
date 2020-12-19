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



export const StyledBodyTableRow = styled.tr`
    &:nth-child(even) {
        background: #f7f7f7;
    }
    border-bottom: 1px solid #ccc;
`;



