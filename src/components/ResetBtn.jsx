import styled from 'styled-components';

const ResetBtn = styled.a`
  cursor: ponter;
  background-color: #EEAF09;
  border-color: #EEAF09;
  color: #fff;

  margin-top: 10px;

  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;

  outline: 0;

  font-size: 13px;
  line-height: 1.5384616;
  border-radius: 3px;

  font-weight: 700;
  text-transform: uppercase;
  border-width: 0;
  padding: 9px 17px;

  -webkit-transition: all ease-in-out 0.15s;
  -o-transition: all ease-in-out 0.15s;
  transition: all ease-in-out 0.15s;

  &:active {
    background-color: #D6420A;
  }
`;

export default ResetBtn;