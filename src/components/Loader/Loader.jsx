import React, { Component } from 'react';

const DOTS_MIN = 0,
      DOTS_MAX = 3;

/*
 * Props:
 * - text (optional)
 */
class Loader extends Component {
  state = {
    dots: DOTS_MIN,
    intervalId: null
  }

  componentDidMount() {
    const intervalId = setInterval(this.tick, 333);
    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  tick = () => {
    this.setState((prevState, props) => {
      if (prevState.dots === DOTS_MAX) {
        return {dots: DOTS_MIN};
      }
      return {dots: prevState.dots + 1};
    });
  }

  render() {
    let dotsStr = '';
    for (let i = 0; i < this.state.dots; i += 1) {
      dotsStr += '.';
    }
    const text = this.props.text || 'Loading';

    return (
      <span className="Loader">{text}{dotsStr}</span>
    );
  }
}

export default Loader;
