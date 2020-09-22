import React, { Component } from 'react';
import Header from "./components/Header/Header";
import SortingForm from './components/SortingForm/SortingForm';
import Bars from "./components/Bars/Bars";
import StopSortingButton from "./components/StopSortingButton/StopSortingButton";
import { merge, flatten, swap } from "./helper_functions";

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
    const newColors = [];
    for (let n in this.state.array) {
      newColors.push(colors.PURPLE);
    }

    this.setState({ sorting: false, colors: newColors });
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

        let newArray = swap(this.state.array, i, i + 1);

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

              this.stopSorting();

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
        this.setState({ array: arraysToMerge[0] }, this.stopSorting);

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

        let arrCopy = swap(this.state.array, i + 1, high);

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

    const getNewColors = (pivotColor, ijColor) => {
      const newColors = [];
      for (let n in this.state.array) {
        if (n == high) {
          newColors.push(pivotColor);
        } else if (n == i || n == j) {
          newColors.push(ijColor);
        } else {
          newColors.push(colors.BLUE);
        }
      }

      return newColors;
    }

    intervalVar = setInterval(() => {
      if (this.state.array[j] <= pivot) {
        i++;

        let arrCopy = swap(this.state.array, i, j);
        const newColors = getNewColors(colors.YELLOW, colors.RED);

        this.setState({ array: arrCopy, colors: newColors }, () => {
          incrementJ();
        });

      } else {

        const newColors = getNewColors(colors.YELLOW, colors.GREEN);

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
            callback();
          });
        });

      })
    } else {
      callback();
    }

  }

  quickSort = () => {
    this.quickSortHelper(0, this.state.array.length - 1, this.stopSorting);
  }


  heapify = (n, i, callback) => {
    if (!this.state.sorting) {
      return;
    }

    setTimeout(() => {
      let largest = i;

      let l = 2 * i + 1;
      let r = 2 * i + 2;

      if (l < n && this.state.array[i] < this.state.array[l]) {
        largest = l;
      }


      if (r < n && this.state.array[largest] < this.state.array[r]) {
        largest = r;
      }

      if (largest != i) {
        let arrCopy = [...this.state.array];
        let temp = arrCopy[i];
        arrCopy[i] = arrCopy[largest];
        arrCopy[largest] = temp;

        let newColors = [];
        for (let j in this.state.colors) {
          if (j == i) {
            newColors.push(colors.YELLOW);
          } else if (j == largest) {
            newColors.push(colors.GREEN);
          } else {
            newColors.push(colors.BLUE);
          }
        }

        this.setState({ array: arrCopy, colors: newColors }, () => {
          this.heapify(n, largest, callback);
        });

      } else {


        if (callback) {
          callback();
        }
      }

    }, 100);
  }

  heapSortHeapifyLoop = (i, callback) => {
    const n = this.state.array.length;
    this.heapify(n, i, () => {
      if (i == 0) {
        callback();
      } else {
        this.heapSortHeapifyLoop(i - 1, callback);
      }
    })

  }

  heapSortMainLoop = (i, callback) => {

    const newArr = [...this.state.array];
    let temp = newArr[i];
    newArr[i] = newArr[0];
    newArr[0] = temp;


    const newColors = [];
    for (let j in this.state.colors) {
      if (j == i || j == 0) {
        newColors.push(colors.RED);
      } else {
        newColors.push(colors.BLUE);
      }
    }
    this.setState({ array: newArr, colors: newColors }, () => {
      this.heapify(i, 0, () => {
        if (i > 1) {
          this.heapSortMainLoop(i - 1, callback);
        } else {
          callback();
        }
      })
    })


  }

  heapSort = () => {
    const n = this.state.array.length;
    const iInitial = Math.floor(n / 2) - 1;

    this.heapSortHeapifyLoop(iInitial, () => {
      this.heapSortMainLoop(n - 1, this.stopSorting);
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
        this.setState({ sorting: true }, () => this.heapSort());
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
