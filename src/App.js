import React, { Component } from 'react';
import Header from "./components/Header/Header";
import SortingForm from './components/SortingForm/SortingForm';
import Bars from "./components/Bars/Bars";
import StopSortingButton from "./components/StopSortingButton/StopSortingButton";
import { merge, flatten } from "./helper_functions";

const colors = {
  BLUE: "#6399F1",
  GREEN: "#6CDB7B",
  RED: "#DD5C5C",
  PURPLE: "#B578E8",
  YELLOW: "yellow"
}



class App extends Component {

  state = {
    algorithm: "merge",
    array: [],
    colors: [],
    sorting: false,
    sortingIntervalVar: null
  }

  componentDidMount() {
    this.resetArray(10);
  }

  stopSorting = () => {
    clearInterval(this.state.sortingIntervalVar);
    this.setState({ sorting: false });
  }



  resetArray = (n) => {
    const newArray = [];
    const newColors = [];
    for (let i = 0; i < n; i++) {
      newArray.push(Math.round(Math.random() * 100));
      newColors.push(colors.BLUE);
    }

    this.setState({ array: newArray, colors: newColors });
  }


  algorithmChanged = (event) => {
    this.setState({ algorithm: event.target.value });
    this.resetArray(this.state.array.length);
  }


  bubbleSort = () => {

    let i = 0;
    let swapsMade = false;

    let intervalVar = setInterval(() => {
      if (this.state.array[i] > this.state.array[i + 1]) {
        let newArray = [...this.state.array];
        let temp = newArray[i];
        newArray[i] = newArray[i + 1];
        newArray[i + 1] = temp;


        let newColors = [];
        for (let j in this.state.array) {
          if (j == i || j == i + 1) {
            newColors[j] = colors.RED;
          } else {
            newColors[j] = colors.BLUE;
          }
        }


        this.setState({ array: newArray, colors: newColors }, () => {


          if (i == this.state.array.length - 2) {
            i = 0;
            swapsMade = false;
          } else {
            i++;
            swapsMade = true;
          }

        });

      } else {


        let newColors = [];
        for (let j in this.state.array) {
          if (j == i || j == i + 1) {
            newColors[j] = colors.GREEN;
          } else {
            newColors[j] = colors.BLUE;
          }
        }

        this.setState({ colors: newColors }, () => {


          if (i == this.state.array.length - 2) {
            if (!swapsMade) {


              //Loop finished
              let newColors = [];
              for (let j in this.state.array) {
                newColors[j] = colors.PURPLE;
              }

              clearInterval(intervalVar);
              this.setState({ colors: newColors, sorting: false });

            } else {
              i = 0;
              swapsMade = false;
            }
          } else {
            i++;
          }

        });

      }

    }, 100);

    this.setState({ sortingIntervalVar: intervalVar });

  }

  mergeSort = () => {

    let arraysToMerge = [];
    for (let i of this.state.array) {
      arraysToMerge.push([i]);
    }

    let i = 0;

    let lengthsInThisIteration = 1;
    let startIndex = 0;

    let intervalVar = setInterval(() => {
      if (arraysToMerge.length == 1) {

        //Sorting finished
        const newColors = [...this.state.colors];

        for (let j in this.state.array) {
          newColors[j] = colors.PURPLE;
        }

        this.setState({ array: arraysToMerge[0], sorting: false, colors: newColors });
        clearInterval(intervalVar);
      } else {
        let arr1, arr2;
        [arr1, arr2] = arraysToMerge.splice(i, 2);

        let endIndex1 = startIndex + lengthsInThisIteration;
        let endIndex2 = startIndex + lengthsInThisIteration * 2;


        arraysToMerge.splice(i, 0, merge(arr1, arr2));

        const newColors = [];
        for (let j in this.state.colors) {
          if (j >= startIndex && j < endIndex1) {
            newColors[j] = colors.GREEN;
          } else if (j >= endIndex1 && j < endIndex2) {
            newColors[j] = colors.RED;
          } else {
            newColors[j] = colors.BLUE;
          }
        }



        this.setState({ array: flatten(arraysToMerge), colors: newColors }, () => {
          i++;
          startIndex = endIndex2;
          if (i >= arraysToMerge.length - 1) {
            i = 0;
            lengthsInThisIteration *= 2;
            startIndex = 0;
          }

        });
      }
    }, 100);

    this.setState({ sortingIntervalVar: intervalVar });

  }

  partition = (low, high, callback) => {
    let i = low - 1;
    let pivot = this.state.array[high];
    let j = low;
    let intervalVar = null;

    let incrementJ = () => {
      j++;
      if (j == high) {
        let arrCopy = [...this.state.array];
        let temp = arrCopy[i + 1];
        arrCopy[i + 1] = arrCopy[high];
        arrCopy[high] = temp;

        const newColors = [];
        for (let n in this.state.colors) {
          if (n == i + 1 || n == high) {
            newColors.push(colors.GREEN);
          } else {
            newColors.push(colors.BLUE);
          }
        }
        this.setState({ array: arrCopy, colors: newColors }, () => {
          //This iteration of partition has finished
          clearInterval(intervalVar);
          callback(i + 1);
        })
      }
    };

    intervalVar = setInterval(() => {
      if (this.state.array[j] <= pivot) {
        i++;

        let arrCopy = [...this.state.array];
        let temp = arrCopy[i];
        arrCopy[i] = arrCopy[j];
        arrCopy[j] = temp;

        const newColors = [];
        for (let n in this.state.array) {
          if (n == high) {
            newColors.push(colors.YELLOW);
          } else if (n == i || n == j) {
            newColors.push(colors.RED);
          } else {
            newColors.push(colors.BLUE);
          }
        }


        this.setState({ array: arrCopy, colors: newColors }, () => {
          incrementJ();
        });
      } else {
        const newColors = [];
        for (let n in this.state.array) {
          if (n == high) {
            newColors.push(colors.YELLOW);
          } else if (n == i || n == j) {
            newColors.push(colors.GREEN);
          } else {
            newColors.push(colors.BLUE);
          }
        }


        this.setState({ colors: newColors }, () => {
          incrementJ();
        });
      }
    }, 100);

    this.setState({ sortingIntervalVar: intervalVar });
  }

  quickSortHelper = (low, high, callback) => {
    if (low < high) {
      this.partition(low, high, (splitpoint) => {
        this.quickSortHelper(low, splitpoint - 1, () => {
          this.quickSortHelper(splitpoint + 1, high, () => {
            if (callback) {
              callback();
            }
          });
        });

      })
    } else {
      if (callback) {
        callback();
      }
    }

  }


  quickSort = () => {
    this.quickSortHelper(0, this.state.array.length - 1, () => {
      const newColors = [];
      for (let n in this.state.array) {
        newColors.push(colors.PURPLE);
      }
      this.setState({ sorting: false, colors: newColors });
    });
  }


  sort = () => {

    switch (this.state.algorithm) {
      case "bubble": {
        this.setState({ sorting: true }, () => this.bubbleSort());

        break;
      } case "merge": {
        this.setState({ sorting: true }, () => this.mergeSort());
        break;
      } case "quick": {
        this.setState({ sorting: true }, () => this.quickSort());
        break;
      } case "heap": {
        break;
      }
    }

  }



  render() {


    return (
      <div className="App">

        <Header />
        <SortingForm
          arrayLen={this.state.array.length}
          algorithm={this.state.algorithm}
          changeArrayLen={(event) => this.resetArray(event.target.value)}
          algorithmChanged={this.algorithmChanged}
          regenArray={() => this.resetArray(this.state.array.length)}
          sort={this.sort}
          sorting={this.state.sorting} />

        <Bars array={this.state.array} colors={this.state.colors}></Bars>

        {this.state.sorting ? <StopSortingButton stopSorting={this.stopSorting} /> : null}

      </div>
    )
  };
}

export default App;
