import { HistoryContainer, HistoryList } from "./styles";

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
                            <td>Completed</td>
                        </tr>
                        <tr>
                            <td>Task 01</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Completed</td>
                        </tr>
                        <tr>
                            <td>Task 01</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Completed</td>
                        </tr>
                        <tr>
                            <td>Task 01</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Completed</td>
                        </tr>
                        <tr>
                            <td>Task 01</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Completed</td>
                        </tr>
                        <tr>
                            <td>Task 01</td>
                            <td>20 minutes</td>
                            <td>2 months ago</td>
                            <td>Completed</td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}