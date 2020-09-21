import "./Bars.css";
import React from "react";

const Bars = (props) => {

    const bars = [];
    for (let i in props.array) {
        let n = props.array[i];
        bars.push(
            <div style={{
                height: n * 4 + "px",
                width: "10px",
                marginRight: "5px",
                backgroundColor: props.colors[i]
            }}/>
        )
    }
    

    return (
        <div className="container">
            {bars}
        </div>
    )

}

export default Bars;