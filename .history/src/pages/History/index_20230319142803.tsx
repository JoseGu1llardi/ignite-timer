import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
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
                        <tr>
                            <td>Task 01</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>
                                <Status>Completed</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Task 02</td>
                            <td>25 minutes</td>
                            <td>3 months ago</td>
                            <td>
                                <Status>Completed</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Task 03</td>
                            <td>30 minutes</td>
                            <td>4 months ago</td>
                            <td>
                                <Status>Completed</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Task 04</td>
                            <td>35 minutes</td>
                            <td>5 months ago</td>
                            <td>
                                <Status>Completed</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Task 05</td>
                            <td>40 minutes</td>
                            <td>6 months ago</td>
                            <td>
                                <Status>Completed</Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}