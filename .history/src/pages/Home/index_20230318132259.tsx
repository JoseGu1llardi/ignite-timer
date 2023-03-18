import { Play } from "@phosphor-icons/react";

import { FormContainer, HomeContainer } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <FormContainer action="">
                <div>
                    <label htmlFor="task">I'll work on</label>
                    <input id="task" />
                    <label htmlFor="minutesAmount"></label>
                    <input id="minutesAmount" type="number" />
                    <span>minutes.</span>
                </div>

                <div>
                    <span>0</span>
                    <span>0</span>
                    <span>:</span>
                    <span>0</span>
                    <span>0</span>
                </div>

                <button type="submit">
                    <Play size={25} />
                    Start
                </button>
            </FormContainer>
        </HomeContainer>
    )
}