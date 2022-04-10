import styled from "styled-components";

const StyledButton = styled.button`
  color:${({ active, theme }) => active ? theme.colors.button.active.text: theme.colors.button.normal.text};
  background-color: ${({ active, theme }) => active ? theme.colors.button.active.background : theme.colors.button.normal.background};
  font-size:0.8rem;
  padding: 0.5rem 1.2rem;
  border:none;
  border-radius:3rem;
  margin:0.2rem;;
  min-width: 80px;
  font-family: ${({ theme }) => theme.font};
  cursor: pointer;
`;

const Button = ({ title, active, onClick }) => {
  return (
    <StyledButton active={active} onClick={onClick}>
      {title}
    </StyledButton>
  );
};

export default Button;
