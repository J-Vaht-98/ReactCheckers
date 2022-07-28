import "../styles/GameInfo.css";
function ScoreBar({ N, emoji }) {
    const getDots = (N) => {
        let str = "  ";
        for (let i = 0; i < N; i++) str += " " + emoji;
        return str;
    };
    return <>{getDots(N)}</>;
}

function GameInfo({ game, dispatch }) {
    const winner = game.isWinner
    const activePlayer = game?.activePlayer;
    const playerOneScore = game?.playerScores[0];
    const playerTwoScore = game?.playerScores[1];
    const flashingAnimation1 = activePlayer === 1 ? " flashing-animation" : " ";
    const flashingAnimation2 = activePlayer === 2 ? " flashing-animation" : " ";
    const extraMove = game.gainedExtraMove;

    const scoresSection = (
        <>
            <span className={"player-score player-1" + flashingAnimation1}>
                Player 1:<ScoreBar N={playerOneScore} emoji={`✖`} />
            </span>
            <span className={"player-score player-2" + flashingAnimation2}>
                Player 2:<ScoreBar N={playerTwoScore} emoji={`✖`} />
            </span>
        </>
    );
    
    const winBanner = (
        <>
            <span className={"winner-banner" + ` player-${winner}`}>
                Player {winner} wins!
            </span>
            <button
                className={"play-again-btn" + ` player-${winner}`}
                onClick={() => dispatch({type:'newGame'})}>
                Play again..
            </button>
        </>
    );
    return (
        <div className="scores-section">
            {!winner && scoresSection}
            {winner && winBanner}
            <div className="move-nr">
                <h1>{game.moveNr}</h1>
            </div>
        </div>
    );
}

export default GameInfo;
