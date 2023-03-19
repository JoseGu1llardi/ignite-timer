import { Play } from "@phosphor-icons/react";

import { CountdownContainer, FormContainer, HomeContainer, Separator, StartCountdownButton } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">I'll work on</label>
                    <input id="task" />
                    <label htmlFor="minutesAmount"></label>
                    <input id="minutesAmount" type="number" />
                    <span>minutes.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton type="submit">
                    <Play size={25} />
                    Start
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}