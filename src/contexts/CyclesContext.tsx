import { useState, createContext, ReactNode, useReducer } from 'react';

import { ActionTypes, Cycle, cyclesReducer } from '../reducers/cycles';

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

    const { cycles, activeCycleId } = cyclesState;

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function markCurrentCycleAsFineshed() {
        dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
            payload: {
                activeCycleId
            }
        });
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

        dispatch({
            type: ActionTypes.ADD_NEW_CYCLE,
            payload: {
                newCycle
            }
        });

        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch({
            type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
            payload: {
                activeCycleId
            }
        });

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

