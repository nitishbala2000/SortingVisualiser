import React from "react";

const StopSortingButton = (props) => {
    return (
        <p style={{textAlign : "center", marginTop: "20px"}}>
            <button type="button" class="btn btn-outline-info" onClick={props.stopSorting}>Stop</button>
        </p>
    )
}

export default StopSortingButton;