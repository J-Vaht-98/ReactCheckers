import "../styles/GameInfo.css";
function ScoreBar({ N, emoji }) {
    const getDots = (N) => {
        let str = "  ";
        for (let i = 0; i < N; i++) str += " " + emoji;
        return str;
    };
    return <>{getDots(N)}</>;
}

function GameInfo({ gameRef }) {
    const winner = gameRef.current.isWinner;
    const activePlayer = gameRef.current?.activePlayer;
    const playerOneScore = gameRef.current?.playerScores[0];
    const playerTwoScore = gameRef.current?.playerScores[1];

    const flashingAnimation1 = activePlayer === 1 ? " flashing-animation" : " ";
    const flashingAnimation2 = activePlayer === 2 ? " flashing-animation" : " ";
    const extraMove = gameRef.current.gainedExtraMove;
    const scoresSection = (<>
            <div className={`player-active-banner`}>{}</div>
            <span className={"player-score player-1" + flashingAnimation1}>
                Player 1 
                {activePlayer === 1 ? (!extraMove && <> is moving...</> || extraMove && <> took a piece and gained a move</>):(<>:<ScoreBar N={playerOneScore} emoji={`✖`} /></>)}
            </span>
            <span className={"player-score player-2" + flashingAnimation2}>
                Player 2
                {activePlayer === 2 ? (!extraMove && <> is moving...</> || extraMove && <> took a piece and gained a move</>):(<>:<ScoreBar N={playerTwoScore} emoji={`✖`} /></>)}

            </span>
    </>
    );
    const winBanner = (<>
        <span className={"winner-banner" + ` player-${winner}`  }>Player {winner} wins!</span>
        <button onClick={() => gameRef.current.init()}>Play again..</button>
        </>)
    return (
        <div className="scores-section">
        
            {!winner && scoresSection}
            {winner && winBanner}
            
        </div>
    );
}

export default GameInfo;
