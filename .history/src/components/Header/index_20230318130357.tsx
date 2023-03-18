import { NavLink } from 'react-router-dom'

import { Scroll, Timer } from "@phosphor-icons/react";

import { HeaderContainer } from "./styles";

import Logo from '../../assets/Logo (1).svg';

export function Header() {
    return (
        <HeaderContainer>
            <img src={Logo} />
            <nav>
                <NavLink to="/" title='Timer' >
                    <Timer size={25} />
                </NavLink>

                <NavLink to="/history" title='Historic'>
                    <Scroll size={25} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}