import { ButtonContainer } from './Button.syles';

interface ButtonProps {
    color?: "primary" | "secondary" | "danger" | "success"
}

export function Button({ color = 'primary' }: ButtonProps) {
    return <ButtonContainer>Send</ButtonContainer>
}