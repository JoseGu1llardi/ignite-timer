import styled from "styled-components";

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
  
  ${({ variant }) => `
    background: ${buttonVariants[variant]}
  ` }
`;