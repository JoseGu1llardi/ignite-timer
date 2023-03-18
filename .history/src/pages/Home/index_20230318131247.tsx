export function Home() {
    return (
        <div>
            <form action="">
                <label htmlFor="task">I'll work on</label>
                <input id="task" />

                <label htmlFor="minutesAmount"></label>
                <input id="minutesAmount" type="number" />

                <span>minutes.</span>
            </form>
        </div>
    )
}