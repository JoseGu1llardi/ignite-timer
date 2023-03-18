import { Scroll, Timer } from "@phosphor-icons/react";

import { HeaderContainer } from "./styles";

import Logo from '../../assets/Logo (1).svg';

export function Header() {
    return (
        <HeaderContainer>
            <img src={Logo} />
            <nav>
                <a href="">
                    <Timer size={28} />
                </a>
                <a href="">
                    <Scroll size={24} />
                </a>
            </nav>
        </HeaderContainer>
    )
}