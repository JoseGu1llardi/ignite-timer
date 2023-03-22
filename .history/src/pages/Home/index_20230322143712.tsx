import { useForm } from 'react-hook-form';

import { Play } from "@phosphor-icons/react";

import {
    CountdownContainer,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountdownButton,
    TaskInput
} from "./styles";

export function Home() {
    const { register, handleSubmit, watch } = useForm();

    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">I'll work on</label>
                    <TaskInput
                        id="task"
                        placeholder="give a name to your project..."
                        list="tasks-suggestion"
                    />

                    <datalist id="tasks-suggestion">
                        <option value="Suggestion One" />
                        <option value="Suggestion Two" />
                        <option value="Suggestion Three" />
                    </datalist>

                    <label htmlFor="minutesAmount"></label>
                    <MinutesAmountInput
                        id="minutesAmount"
                        type="number"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                    />

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
                </StartCountdownButton >
            </form>
        </HomeContainer>
    )
}