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

    function handleCreateNewCycle(data: any) {
        console.log(data);
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle} >
                <FormContainer>
                    <label htmlFor="task">I'll work on</label>
                    <TaskInput
                        id="task"
                        list="tasks-suggestion"
                        placeholder="give a name to your project..."
                        {...register('task')}
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
                        step={5}
                        min={5}
                        max={60}
                        placeholder="00"
                        {...register("minutesAmount", { valueAsNumber: true })}
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