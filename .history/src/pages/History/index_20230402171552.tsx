import { useContext } from "react";

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
                                    <td>{cycle.startDate.toISOString()}</td>
                                    <td>
                                        {cycle.finishedDate && (
                                            <Status statusColor="green" >Compelete</Status>
                                        )}

                                        {cycle.interruptedDate && (
                                            <Status statusColor="red" >Interrupted</Status>
                                        )
                                        }
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