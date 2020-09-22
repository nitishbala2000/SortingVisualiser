import React, { Component } from 'react';
import Header from "./components/Header/Header";
import SortingForm from './components/SortingForm/SortingForm';
import Bars from "./components/Bars/Bars";
import StopSortingButton from "./components/StopSortingButton/StopSortingButton";




class App extends Component {

  state = {
    algorithm: "merge",
    array: [],
    colors: [],
    sorting : false,
  }

  componentDidMount() {
    this.resetArray(10);
  }

  stopSorting = () => {
    this.setState({sorting: false});
  }
  


  resetArray = (n) => {
    const newArray = [];
    const newColors = [];
    for (let i = 0; i < n; i++) {
      newArray.push(Math.round(Math.random() * 100));
      newColors.push("#6399F1");
    }

    this.setState({array : newArray, colors : newColors});
  }


  algorithmChanged = (event) => {
    this.setState({algorithm : event.target.value});
    this.resetArray(this.state.array.length);
  }


  sortHelper = (i, swapsMade) => {

    if (!this.state.sorting) {
      return;
    }

    setTimeout(() => {
      if (this.state.array[i] > this.state.array[i + 1]) {
        let newArray = [...this.state.array];
        let temp = newArray[i];
        newArray[i] = newArray[i + 1];
        newArray[i + 1] = temp;


        let newColors = [...this.state.colors];
        for (let j in this.state.array) {
          if (j == i || j == i + 1) {
            newColors[j] = "red";
          } else {
            newColors[j] = "#6399F1";
          }
        }
      

        this.setState({ array: newArray,  colors : newColors}, () => {

         
          if (i == this.state.array.length - 2) {
            this.sortHelper(0, false)
          } else {
            this.sortHelper(i + 1, true);
          }
          
        });
         
      } else {

        
        let newColors = [...this.state.colors];
        for (let j in this.state.array) {
          if (j == i || j == i + 1) {
            newColors[j] = "green";
          } else {
            newColors[j] =  "#6399F1";
          }
        }

        this.setState({colors : newColors}, () => {

      
          if (i == this.state.array.length - 2) {
            if (!swapsMade) {


              //Loop finished
              let newColors = [...this.state.colors];
              for (let j in this.state.array) {
                newColors[j] = "#B578E8";
              }

              this.setState({colors : newColors, sorting: false});

              return;
            } else {
              this.sortHelper(0, false)
            }
          } else {
            this.sortHelper(i + 1, swapsMade);
          }

        });

      }

    }, 100);

  }

  sort = () => {

    switch (this.state.algorithm) {
      case "bubble" : {
        this.setState({sorting: true}, () => this.sortHelper(0, false));
        break;
      } case "merge" : {
        break;
      } case "quick" : {
        break;
      } case "heap" : {
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
          sorting={this.state.sorting}/>

        <Bars array={this.state.array} colors={this.state.colors}></Bars>

        {this.state.sorting ? <StopSortingButton stopSorting={this.stopSorting}/> : null}

      </div>
    )
  };
}

export default App;
