import { useState, createContext, ReactNode, useReducer, useEffect } from 'react';

import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';
import {
    addNewCycleAction,
    interruptCurrentCycleAction,
    markCurrentCycleAsFinishedAction
} from '../reducers/cycles/actions';

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextData {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFineshed: () => void;
    setSecondsPassed: (seconds: number) => void;
    /* setCycles: Dispatch<React.SetStateAction<Cycle[]>> */
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
    children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    });

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);

        localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON)
    }, [cyclesState]);

    const { cycles, activeCycleId } = cyclesState;

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function markCurrentCycleAsFineshed() {
        dispatch(markCurrentCycleAsFinishedAction());
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle));

        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction());

        document.title = "ig-Timer";
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFineshed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}>
            {children}
        </CyclesContext.Provider>

    )
}

