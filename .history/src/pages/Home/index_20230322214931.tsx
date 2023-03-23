import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import zod from 'zod';

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

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(3, "Type you task with at least 3 characters!"),
    minutesAmount: zod.number()
        .min(5, "The cycles needs to be at least 5 minutes")
        .max(60, "The cycles needs a maximum of 60 minutes"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    });

    const task = watch("task");
    const isSubmitDisabled = !task;

    function handleCreateNewCycle(data: NewCycleFormData) {

    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} >
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
                        // max={60}
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

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={25} />
                    Start
                </StartCountdownButton >
            </form>
        </HomeContainer>
    )
}