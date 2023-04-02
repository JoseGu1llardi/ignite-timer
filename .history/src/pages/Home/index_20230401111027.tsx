import { useState, useEffect, createContext } from 'react';

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

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextData {
    activeCycle: Cycle | undefined;
}

const CyclesContext = createContext({} as CyclesContextData);

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

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
                <CyclesContext.Provider>
                    <NewCycleForm />
                    <CountDown />
                </CyclesContext.Provider>

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