import { useContext } from "react";

import { useForm } from "react-hook-form";

import zod from 'zod';

import { zodResolver } from "@hookform/resolvers/zod";

import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { CyclesContext } from "../..";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(3, "Type you task with at least 3 characters!"),
    minutesAmount: zod.number()
        .min(1, "The cycles needs to be at least 5 minutes")
        .max(60, "The cycles needs a maximum of 60 minutes"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    });

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
                min={1}
                max={60}
                placeholder="00"
                disabled={!!activeCycle}
                {...register("minutesAmount", { valueAsNumber: true })}
            />

            <span>minutes.</span>
        </FormContainer>

    )
}