import React from "react";
import "./SortingForm.css";


const getModalTitleAndContent = (algorithm) => {
    switch (algorithm) {
        case "bubble":
            return ["Bubble Sort", getBubbleSortContent()];
        case "merge":
            return ["Merge Sort", getMergeSortContent()];
        case "quick":
            return ["Quick Sort", getQuickSortContent()];
        case "heap":
            return ["Heap Sort", getHeapSortContent()];
        default:
            return [];
    }
}


const getBubbleSortContent = () => (
    <div>
        <p>Bubble Sort works by repeatedly iterating through the array comparing adjacent elements in the array and swapping them
        if needed. The algorithm finishes when an entire pass has been made without having to swap any elements.
        </p>

        <p>
            See <a href="https://www.geeksforgeeks.org/bubble-sort/">here</a> for pseudocode.
        </p>
  
        <p>
            Key:
            <ul>
                <li>The green/red bars represent the current items being compared. If the bars are red, they are to be swapped</li>
            </ul>
        </p>
      
    </div>
)

const getMergeSortContent = () => (
    <div>
        <p>
            Merge Sort works by splitting the list into two, recursively sorting each sublist and <strong>merging</strong> the
            two sorted sublists together. It is one of the fastest sorting algorithm
        </p>

        <p>
            See <a href="https://www.geeksforgeeks.org/merge-sort/">here</a> for pseudocode.
        </p>

        <p>
            Key:
            <ul>
                <li>The algorithm implemented below is actually <strong>bottom-up merge sort</strong>, which is not recursive, but a similar idea</li>
                <li>The green and red bars show the current sublist being merged. As you see, these sublists get bigger and bigger, and
                in the final iteration, the sublists cover the entire list
                </li>
            </ul>
        </p>
   
    </div>
);

const getQuickSortContent = () => (
    <div>
        <p>
            Quick sort works by choosing the last item of the list as a <strong>pivot</strong> (note - alternative implementations exist,
            such as using the first / middle item). It finds all elements less than the pivot, and all elements greater than the pivot. It
            then recursively sorts each partition, inserting the pvot in between
        </p>

        <p>
            See <a href="https://www.geeksforgeeks.org/quick-sort/">here</a> for pseudocode.
        </p>

        <p>
            Key:
            <ul>
                <li>The algorithm implemented below is <strong>in-place</strong> quick sort, which is more space efficient than the obvious recursive solution</li>
                <li>The yellow bar shows the current pivot. If you inspect the pseudocode, when finding the splitpoint, there is a left pointer and a right pointer,
                    represented by green bars. When swaps are made, these bard turn red
                </li>
            </ul>
        </p>

    </div>
);

const getHeapSortContent = () => (
    <div>
        <p>
            Heap sort meakes use of a structure called a <strong>binary maxheap</strong>. A binary heap is a tree-like structure where
            each item has two children, and every item must be greater than or equal to all of its children. Furthermore, every element
            is greater than or equal to all nodes to the right on the samle level. The typical implementation
            is to use an array, where for an item at index i, the left child is stored at index 2i + 1 and the right child is stored at
            2i + 2
        </p>

        <p>
            Heap sort consists of two stages:
            <ol>
                <li>
                    Converting the input array into a binary heap. This is a simple recursive procedure that is applied
                    to all non-leaf nodes - see the pseudocode below
                </li>
                <li>
                    Repeatedly taking the last elements of the array (the leaves of the heap, which we know are the smallest elements) and putting
                    them at the front where they belong. Then recreating the heap structure accordingly
                </li>
            </ol>
        </p>

        <p>
            See <a href="https://www.geeksforgeeks.org/heap-sort/">here</a> for pseudocode.
        </p>

        <p>
            Key:
            <ul>
                <li>The yellow bar shows the element currently being placed in the array to form a heap</li>
                <li>The green bar shows the yellow bars largest child, which it is about to be swapped with</li>
                <li>The red bars are used to animate the second stage of the algorithm - they show the bars at index "i" (which is the smallest item)
                    and index 0 in the loop defined in teh pseudocode
                </li>
            </ul>
        </p>

    </div>
);



const SortingForm = (props) => {

    let modalTitle, modalContent;
    [modalTitle, modalContent] = getModalTitleAndContent(props.algorithm);

    return (

        <div className="SortingForm">

            <p>
                <label>Choose Array Size: </label>
                <input type="range" disabled={props.sorting} min="0" max="50" value={props.arrayLen.toString()} onChange={props.changeArrayLen} />
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


            <button disabled={props.sorting} type="button" className="btn btn-outline-info" onClick={props.regenArray}>Regenerte array</button>
            <button disabled={props.sorting} type="button" className="btn btn-outline-info" onClick={props.sort}>Sort!</button>
            <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#helpModal">Help</button>


            <div className="modal fade" id="helpModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-left">
                            {modalContent}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )


};

export default SortingForm;