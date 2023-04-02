import { createContext } from 'react';

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
    amountSecondsPassed: number;
    markCurrentCycleAsFineshed: () => void;
    setSecondsPassed: (seconds: number) => void;
    /* setCycles: Dispatch<React.SetStateAction<Cycle[]>> */
}

export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContextProvider({ children }) {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFineshed,
                setSecondsPassed
            }}>

        </CyclesContext.Provider>

    )
}

