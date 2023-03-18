import { ButtonContainer, ButonVariant } from './Button.styles';

interface ButtonProps {
    variant?: ButonVariant
}

export function Button({ variant = 'primary' }: ButtonProps) {
    return <ButtonContainer variant={variant} >Send</ButtonContainer>
}
