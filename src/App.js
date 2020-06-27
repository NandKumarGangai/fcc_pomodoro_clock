import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: true,
      startCounter: false,
      isPause: false,
      sessionCount: 25,
      breakCount: 5,
      counter: null
    }
  };

  resetAll = (e) => {
    this.setState({
      isPlay: true,
      isPause: false,
      startCounter: false,
      sessionCount: 25,
      breakCount: 5,
      counter: null
    });
  }

  onPlayOrPause = (e) => {
    e.preventDefault();
    const { isPause, isPlay, startCounter } = this.state;
    this.setState({
      isPlay: !isPlay,
      isPause: !isPause,
      startCounter: !startCounter
    }, () => {
      const interval = setInterval(() => {
        if (this.state.startCounter && this.state.sessionCount) {
          this.setState(state => ({
            counter: state.counter ? state.counter-- : (state.counter === 0 ? 0 : state.sessionCount * 60)
          }));
        }
        else {
          clearInterval(interval);
        };
        if (!this.state.counter) {
          clearInterval(interval);
        }
      }, 1000);
    });
  }

  formatCounter = count => {
    const time = this.state.counter || count * 60;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  handleBreakCountDec = (e) => {
    e.preventDefault();
    if (!this.state.startCounter) {
      this.setState(state => ({
        breakCount: state.breakCount > 1 ? state.breakCount-- : 1
      }));
    }
  };

  handleBreakCountInc = (e) => {
    e.preventDefault();
    if (!this.state.startCounter) {
      this.setState(state => ({
        breakCount: state.breakCount !== 60 ? state.breakCount++ : 60
      }));
    }
  };

  handleSessionCountDec = (e) => {
    e.preventDefault();
    if (!this.state.startCounter) {
      this.setState(state => {
        let dec = state.sessionCount ? state.sessionCount-- : 0;
        // if (dec === 0) {
        //   dec = 1;
        // }
        return {
          sessionCount: dec,
          counter: dec * 60
        }
      });
    }
  };

  handleSessionCountInc = (e) => {
    e.preventDefault();
    if (!this.state.startCounter) {
      this.setState(state => ({
        sessionCount: state.sessionCount !== 60 ? state.sessionCount++ : 60
      }));
    }
  };

  handleTimerTick = () => {
    this.setState(state => ({
      counter: state.counter ? state.counter-- : state.sessionCount
    }));
  }

  render() {
    const {
      isPause,
      isPlay,
      sessionCount,
      breakCount,
      counter
    } = this.state;

    return (
      <div className='container'>
        <div>
          <h1>{'Pomodoro Clock'}</h1>
        </div>
        <div className='sessions'>
          <div className='break-timer' id="break-label">
            <h3 className='heading'>Break Length</h3>
            <div className='counter'>
              <i
                id="break-decrement"
                className='fa fa-arrow-down fa-2x'
                onClick={this.handleBreakCountDec}
              >
              </i>
              <p
                id="break-length"
                className='count mlr1'>
                {breakCount}
              </p>
              <i
                id="break-increment"
                className='fa fa-arrow-up fa-2x'
                onClick={this.handleBreakCountInc}
              >
              </i>
            </div>
          </div>
          <div className='session-timer' id="session-label">
            <h3 className='heading'>Session Length</h3>
            <div className='counter'>
              <i
                id="session-decrement"
                className='fa fa-arrow-down fa-2x'
                onClick={this.handleSessionCountDec}
              >
              </i>
              <p
                id="session-length"
                className='count mlr1'>
                {sessionCount}
              </p>
              <i
                id="session-increment"
                className='fa fa-arrow-up fa-2x'
                onClick={this.handleSessionCountInc}
              >
              </i>
            </div>
          </div>
        </div>
        <div className='timer'>
          <div className='rounded-border'>
            <h2 id="timer-label" className='heading'>Session</h2>
            <p id="time-left" className='session-count'>
              { counter !== null ? this.formatCounter(counter) : this.formatCounter(sessionCount)}
            </p>
          </div>
          <div className='controls'>
            {
              isPlay &&
              <i id="start_stop" className="fa fa-2x fa-play" onClick={this.onPlayOrPause}></i>
            }
            {
              isPause &&
              <i id="start_stop" className="fa fa-2x fa-pause" onClick={this.onPlayOrPause}></i>
            }
            <i id="reset" className="fa fa-refresh fa-2x" onClick={this.resetAll}></i>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
