import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};
    transition: all 0.50s linear;
  }

  a {
    color: ${({ theme }) => theme.colors.link.text};
    cursor: pointer;
  }
/* 
  button {
  color:#efefef;
  font-size:0.8rem;
  padding: 0.5rem 1.2rem;
  border:none;
  border-radius:3rem;
  margin:0.2rem;;
  background:#0C0E1B;
  min-width: 80px;
    font-family: ${({ theme }) => theme.font};
    .active-label {
      background-color: red;
    }
  }

  button.btn {
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
  } */
`;