import styled, { css } from "styled-components";

export type ButonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButonVariant;
}

const buttonVariants = {
  primary: "orange",
  secondary: "purple",
  danger: "red",
  success: "green",
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  
  background: ${props => props.theme["green-500"]};
  color: ${props => props.theme.white};

/* ${({ variant }) => css`
  background: ${buttonVariants[variant]}
` }  */
`;