import styled from "styled-components";

export const CicleButton = styled.button`
  background-color: white;

  box-shadow: 0 4px 9px 0 rgba(213, 218, 224, 0.3);

  width: ${props => (props.small ? 55 : 60)}px;
  height: ${props => (props.small ? 55 : 60)}px;

  cursor: pointer;

  border-radius: 50%;
  border: 0;

  transition-property: transform;
  transition-duration: 250ms;
  transition-timing-function: ease;

  padding: 12px;

  :hover {
    transform: scale(1.1);
  }

  :focus {
    outline: none;
  }
`;
