import { HistoryContainer, HistoryList } from "./styles";

export function History() {
    return (
        <HistoryContainer>
            <h1>My history</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}