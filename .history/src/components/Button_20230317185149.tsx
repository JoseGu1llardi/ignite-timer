import { ButtonContainer, ButonVariant } from './Button.syles';

interface ButtonProps {
    variant?: ButonVariant
}

export function Button({ variant = 'primary' }: ButtonProps) {
    return <ButtonContainer variant={variant} >Send</ButtonContainer>
}
