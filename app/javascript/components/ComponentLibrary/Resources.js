import styled from "styled-components";

const ResourceWrapperStyled = styled.div`
  padding: 10px;
  margin: 0 5px 5px 0;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 8px;
  box-shadow: 2px 2px 3px #ddd;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-box-shadow: 2px 2px 3px #ddd;
  -webkit-box-shadow: 2px 2px 3px #ddd;

  h3 {
    font-size: 13px;
    line-height: 16px;
    margin: 0 0 5px 0;
    color: #4d88cf;
  }
  
  h2 {
    font-size: 18px;
    line-height: 16px;
    letter-spacing: -1px;
    text-shadow: 1px 1px 2px #cecece;
  }

  h1, h2 {
    color: #90af4c;
    margin: 0 0 16px 0;
    height: auto;
  }
`;


export const ResourceItem = styled.div`
    margin-top: 2px;
    margin-bottom: 10px;
    a:first-of-type {
        padding: 3px 4px 3px 6px;
        font-weight: 700;
        
    }
    &:hover {
     > span:first-of-type {
        background: #90af4c;
        border: 1px solid #90af4c;
      }
      
      a {
        display: initial;
      }

    }
`;

const ResourceStyled = styled(ResourceWrapperStyled)`
    float: left;
    margin: 15px 0 60px 15px;
    width: calc(72% - 3em);
    min-height: 100%;
`;

export const AResourceStyled = styled(ResourceStyled)`
    
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