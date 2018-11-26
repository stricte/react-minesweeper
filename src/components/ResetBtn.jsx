import styled from 'styled-components';

const ResetBtn = styled.a`
  display:inline-block;
  padding:0.2em 1.45em;
  margin:0.1em;
  border:0.15em solid #9E8881;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Segoe UI','Roboto',sans-serif;
  font-weight:400;
  color: white;
  background-color:#9E8881;
  text-align:center;
  position:relative;
  cursor: pointer;
  margin: 10px;
  &:hover{
    border-color:#523E37;
  }
  &:active{
    background-color:#999999;
  }
  @media all and (max-width:30em){
    display:block;
    margin:0.2em auto;
  }
`;

export default ResetBtn;