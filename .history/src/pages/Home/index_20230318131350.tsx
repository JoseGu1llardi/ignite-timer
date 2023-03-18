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

            <div>
                <span>0</span>
                <span>0</span>
                <span>:</span>
                <span>0</span>
                <span>0</span>
            </div>
        </div>
    )
}