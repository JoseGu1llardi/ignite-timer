import { HeaderContainer } from "./styles";

import Logo from '../../assets/Logo (1).svg';

export function Header() {
    return (
        <HeaderContainer>
            <img src={Logo} />
            <nav>
                <a href="">Timer</a>
                <a href="">History</a>
            </nav>
        </HeaderContainer>
    )
}