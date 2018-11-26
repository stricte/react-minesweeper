import styled, { css } from 'styled-components'

import flag from './../flag.png';
import mine from './../mine.png';

const Square = styled.div`
  margin: 1px;
  background: #AC9891;
  width: 25px;
  height: 25px;
  float: left;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);

  ${props => props.discovered && css`
    background: #E5DADA;
    color: #91A5AC;
    box-shadow: none;
  `}

  ${props => props.flagged && css`
    background-image: url(${flag});
    background-position: center;
    background-repeat: no-repeat;
  `}

  ${props => props.discovered && props.hasMine && css`
    background-image: url(${mine});
    background-position: center;
    background-repeat: no-repeat;
  `}

  ${props => props.boomed && css`
    background-color: red;
  `}

  ${props => props.discovered && props.hasNum && css`
    &:after {
      content: '${props.num}';
    }
  `}
`;

export default Square;