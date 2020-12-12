import styled from "styled-components";
import ResourceStyled from "./ResourceStyled";

export const AResourceStyled = styled(ResourceStyled)`
    h2 { 
        float: left;
    }
    
    table {
        border-top: 1px solid #ececec;
     }
    tr:nth-last-child(2) {
        border-bottom: none;
    }
    tr {
        border-bottom: 1px solid #ececec;
        height: 25px;
    }
    a:hover {
        color: #90af4c;
    }
`;

export default AResourceStyled;