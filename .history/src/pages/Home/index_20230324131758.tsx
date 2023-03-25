import { useState, useEffect } from 'react';

import { differenceInSeconds } from 'date-fns';

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
        .min(1, "The cycles needs to be at least 5 minutes")
        .max(60, "The cycles needs a maximum of 60 minutes"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    });

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    useEffect(() => {
        if (activeCycle) {
            setInterval(() => {
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate));
            }, 1000)
        }
    }, [activeCycle]);

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);

        reset();
    }

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");

    const task = watch("task");
    const isSubmitDisabled = !task;

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
                        min={1}
                        max={60}
                        placeholder="00"
                        {...register("minutesAmount", { valueAsNumber: true })}
                    />

                    <span>minutes.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={25} />
                    Start
                </StartCountdownButton >
            </form>
        </HomeContainer>
    )
}