import { Timer } from "@phosphor-icons/react";

import { HeaderContainer } from "./styles";

import Logo from '../../assets/Logo (1).svg';

export function Header() {
    return (
        <HeaderContainer>
            <img src={Logo} />
            <nav>
                <a href="">
                    <Timer size={24} />
                </a>
                <a href="">History</a>
            </nav>
        </HeaderContainer>
    )
}