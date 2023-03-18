import styled from "styled-components";

export type ButonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButonVariant;
}

export const ButtonContainer = styled.button`
  width: 100px;
  height: 40px;
`;