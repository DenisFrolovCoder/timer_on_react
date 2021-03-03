import React, {Component} from "react";

import './App.css';

class App extends Component{

  constructor(props) {
    super(props);

    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isStarting: false
    }
  }

  start = () => {
    this.setState({isStarting: true});
    this.timerId = setInterval(() => {
      this.setState({seconds: this.state.seconds + 1});
      if (this.state.seconds === 60) {
        this.setState({seconds: 0});
        this.setState({minutes: this.state.minutes + 1});
      } else if (this.state.minutes === 60) {
        this.setState({minutes: 0});
        this.setState({hours: this.state.hours + 1});
      }
    }, 1000);
  }

  stop = () => {
    this.setState({isStarting: false});
    clearInterval(this.timerId);
  }

  reset = () => {
    if (this.state.isStarting === false)
      this.setState({hours: 0, minutes: 0, seconds: 0});
  }

  componentDidMount() {
    const h = localStorage.getItem('hours'),
          m = localStorage.getItem('minutes'),
          s = localStorage.getItem('seconds');
    if (h && m && s) {
      this.setState({hours: +h, minutes: +m, seconds: +s});
    }
  }

  componentDidUpdate() {
    localStorage.setItem("hours", this.state.hours);
    localStorage.setItem("minutes", this.state.minutes);
    localStorage.setItem("seconds", this.state.seconds);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  formatTimer = (i) => {
    return i < 10 ? '0' + i : i;
  }

  render() {
    return (
        <div className="App">

          <div className="wrapper">

            <div className="box_timer">

              <h1 className="title">Timer</h1>
              <p className="timer">
                {this.formatTimer(this.state.hours)} : {this.formatTimer(this.state.minutes)} : {this.formatTimer(this.state.seconds)}
              </p>
              <div className="box_timer_btn">
                {!this.state.isStarting ?
                    <button className="btn_start" onClick={this.start}>Start</button> :
                    <button className="btn_start" onClick={this.stop}>Stop</button>
                }

                <button className="btn_reset" onClick={this.reset}>Reset</button>
              </div>

            </div>

          </div>

        </div>
    );
  }
}

export default App;
