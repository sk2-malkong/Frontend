import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const flexCenterColumn = css`
  ${flexCenter}
  flex-direction: column;
`

export const flexCenterRow = css`
  ${flexCenter}
  flex-direction: row;
`

export const boxStyle = css`
  background-color: #000;
  border: 0.5px solid #ffd400;
`

export const backgroundBlack = css`
  background-color: #000;

  
`