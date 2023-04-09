import { useState, createContext, ReactNode, useReducer } from 'react';

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
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

    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
        console.log(cycles)
        console.log(action)
        return state
    }, []);

    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function markCurrentCycleAsFineshed() {
        // setCycles(state => state.map(cycle => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, finishedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // }
        // ))
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
            type: "ADD_NEW_CYCLE",
        });

        // setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        // setCycles(state => state.map(cycle => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, interruptedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // })
        // )

        setActiveCycleId(null);
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

