import { useContext } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

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

export function Home() {
    const { } = useContext();
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}  >
                <FormProvider {...newCycleForm} >
                    <NewCycleForm />
                </FormProvider>
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
