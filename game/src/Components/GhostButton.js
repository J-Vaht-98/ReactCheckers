function GhostButton(props) {
    
    return ( 
        <div row={props.row} col={props.col} onClick={e => props.clickHandler(e)}className="button highlight"></div>
     );
}

export default GhostButton;