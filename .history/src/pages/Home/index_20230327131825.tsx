import { useState, useEffect } from 'react';

import { differenceInSeconds } from 'date-fns';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import zod from 'zod';

import { HandPalm, Play } from "@phosphor-icons/react";

import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from "./styles";

import { NewCycleForm } from './components/NewCycleForm';

import { CountDown } from './components/CountDown';

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
    interruptedDate?: Date;
    finishedDate?: Date;
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
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate
                );

                if (secondsDifference >= totalSeconds) {
                    setCycles(state => state.map(cycle => {
                        if (cycle.id === activeCycleId) {
                            return { ...cycle, finishedDate: new Date() }
                        } else {
                            return cycle
                        }
                    }
                    ))

                    setAmountSecondsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                    setAmountSecondsPassed(secondsDifference);
                }

            }, 1000)
        }

        return () => {
            clearInterval(interval);
        }

    }, [activeCycle, activeCycleId, totalSeconds]);

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
        setAmountSecondsPassed(0);

        reset();
    }

    function handleInterruptCycle() {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        })
        )

        setActiveCycleId(null);

        document.title = "ig-Timer";
    }

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle]);

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} >
                <NewCycleForm />
                <CountDown />

                {
                    activeCycle ? (
                        <StopCountdownButton type="button" onClick={handleInterruptCycle} >
                            <HandPalm size={25} />
                            Interrupt
                        </StopCountdownButton >
                    ) : (
                        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                            <Play size={25} />
                            Start
                        </StartCountdownButton >
                    )
                }
            </form>
        </HomeContainer>
    )
}