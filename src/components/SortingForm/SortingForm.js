import React from "react";
import "./SortingForm.css";

const SortingForm = (props) => {

    let buttons = [
        <button type="button" class="btn btn-outline-info" onClick={props.regenArray}>Regenerte array</button>,
        <button type="button" class="btn btn-outline-info" onClick={props.sort}>Sort!</button>
    ];

    if (props.sorting) {
        buttons = [<button type="button" class="btn btn-outline-info">Stop</button>];
    }


    return (

        <div className="SortingForm">

                <p>
                    <label>Choose Array Size: </label>
                    <input type="range" min="0" max="50" value={props.arrayLen.toString()} onChange={props.changeArrayLen}/>
                </p>

                <p>
                    <label>Choose your sorting algorithm: </label>
                    <select onChange={props.algorithmChanged}>
                        <option value="bubble">Bubble Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="quick">Quick Sort</option>
                        <option value="heap">Heap Sort</option>
                    </select>
                </p>

                <p>
                    {buttons}
                </p>
                
        
        </div>
    )
    

};

export default SortingForm;