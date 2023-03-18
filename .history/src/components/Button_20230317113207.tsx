import { ButtonContainer } from './Button.syles';

interface ButtonProps {
    variant?: "primary" | "secondary" | "danger" | "success"
}

export function Button({ variant = 'primary' }: ButtonProps) {
    return <ButtonContainer color={variant} >Send</ButtonContainer>
}