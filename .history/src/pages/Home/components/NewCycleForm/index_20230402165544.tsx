import { useContext } from "react";

import { useFormContext } from 'react-hook-form';

import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">I'll work on</label>
            <TaskInput
                id="task"
                list="tasks-suggestion"
                placeholder="give a name to your project..."
                disabled={!!activeCycle}
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
                disabled={!!activeCycle}
                {...register("minutesAmount", { valueAsNumber: true })}
            />

            <span>minutes.</span>
        </FormContainer>

    )
}