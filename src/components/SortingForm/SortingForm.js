import React from "react";
import "./SortingForm.css";

const SortingForm = (props) => {

    return (

        <div className="SortingForm">

                <p>
                    <label>Choose Array Size: </label>
                    <input type="range" disabled={props.sorting} min="0" max="50" value={props.arrayLen.toString()} onChange={props.changeArrayLen}/>
                </p>

                <p>
                    <label>Choose your sorting algorithm: </label>
                    <select disabled={props.sorting} onChange={props.algorithmChanged} value={props.algorithm}>
                        <option value="bubble">Bubble Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="quick">Quick Sort</option>
                        <option value="heap">Heap Sort</option>
                    </select>
                </p>

                
                <button disabled={props.sorting} type="button" class="btn btn-outline-info" onClick={props.regenArray}>Regenerte array</button>
                <button disabled={props.sorting} type="button" class="btn btn-outline-info" onClick={props.sort}>Sort!</button>
                
                
        
        </div>
    )
    

};

export default SortingForm;