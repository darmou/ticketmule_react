import styled from "styled-components";
import { Link}  from "react-router-dom";
import TrashIcon from "../../images/trash.png";

export const DeleteLink = styled(Link)`
    margin: 0 0 0 6px;
    padding: 3px 4px 3px 20px;
    background: #fee url(${TrashIcon}) no-repeat 2px center;
    color: #c00 !important;
    font-weight: normal;
    border: 1px solid #fee;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    display: none;
`;