import { Play } from "@phosphor-icons/react";

import { CountdownContainer, FormContainer, HomeContainer } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <div>
                    <label htmlFor="task">I'll work on</label>
                    <input id="task" />
                    <label htmlFor="minutesAmount"></label>
                    <input id="minutesAmount" type="number" />
                    <span>minutes.</span>
                </div>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <span>:</span>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <button type="submit">
                    <Play size={25} />
                    Start
                </button>
            </form>
        </HomeContainer>
    )
}