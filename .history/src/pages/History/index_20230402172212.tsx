import { useContext } from "react";

import { formatDistanceToNow } from 'date-fns';

import { CyclesContext } from "../../contexts/CyclesContext";

import { HistoryContainer, HistoryList, Status } from "./styles";
import { tr } from "date-fns/locale";

export function History() {
    const { cycles } = useContext(CyclesContext);

    return (
        <HistoryContainer>
            <h1>My history</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Duration</th>
                            <th>Beginning</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cycles.map(cycle => (
                                <tr id={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutes</td>
                                    <td>{formatDistanceToNow(cycle.startDate, {
                                        addSuffix: true
                                    })}</td>
                                    <td>
                                        {cycle.finishedDate && (
                                            <Status statusColor="green" >Compelete</Status>
                                        )}

                                        {cycle.interruptedDate && (
                                            <Status statusColor="red" >Interrupted</Status>
                                        )}

                                        {(!cycle.finishedDate && !cycle.interruptedDate) && (
                                            <Status statusColor="yellow">In progress</Status>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}