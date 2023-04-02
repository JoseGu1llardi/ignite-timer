import { useState, useEffect, createContext, Dispatch } from 'react';

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
    activeCycleId: string | null;
    markCurrentCycleAsFineshed: () => void;
    /* setCycles: Dispatch<React.SetStateAction<Cycle[]>> */
}

export const CyclesContext = createContext({} as CyclesContextData);

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function markCurrentCycleAsFineshed() {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        }
        ))
    }

    // function handleCreateNewCycle(data: NewCycleFormData) {
    //     const id = String(new Date().getTime());

    //     const newCycle: Cycle = {
    //         id,
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date(),
    //     }

    //     setCycles((state) => [...state, newCycle]);
    //     setActiveCycleId(id);
    //     setAmountSecondsPassed(0);

    //     reset();
    // }

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

    // const task = watch("task");
    // const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */ >
                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFineshed }}>
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
                        <StartCountdownButton /* disabled={isSubmitDisabled} */ type="submit">
                            <Play size={25} />
                            Start
                        </StartCountdownButton >
                    )
                }
            </form>
        </HomeContainer>
    )
}