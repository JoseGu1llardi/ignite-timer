import styled from "styled-components";


export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;
    
    display: flex;
    flex-direction: column;
    
    h1 {
        font-size: 1.5rem;
        color: ${({ theme }) => theme["gray-100"]};
    }
`

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;
    
    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
        
        th {
            background: ${({ theme }) => theme["gray-600"]};
            padding: 1rem;
            text-align: left;
            color: ${({ theme }) => theme["gray-100"]};
            font-size: 0.875rem;
        }
    }
`