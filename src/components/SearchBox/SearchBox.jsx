import React, { Component } from 'react';

/*
 * Props:
 * - placeholder
 * - value
 * - onChange
 * - onClear
 * - onSearchStart
 */
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focus = () => {
    this.inputRef.current.focus();
  }

  clearAndFocus = () => {
    this.props.onClear();
    this.focus();
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.onSearchStart();
    }
  }

  render() {
    let clearButton = null;
    if (this.props.value !== '') {
      clearButton = (
        <button className="SearchBox__button SearchBox__clear-button"
                onClick={this.clearAndFocus}>
          <svg className="SearchBox__button-svg SearchBox__clear-button-svg"
               version="1.1" viewBox="0 0 32 32" width="32" height="32">
            <path d="M25.33 8.55l-1.88-1.88-7.45 7.45-7.45-7.45-1.88 1.88 7.45 7.45-7.45 7.45 1.88 1.88 7.45-7.45 7.45 7.45 1.88-1.88-7.45-7.45z"></path>
          </svg>
        </button>
      );
    }

    return (
      <div className="SearchBox">
        <input ref={this.inputRef}
               className="form-control SearchBox__form-control"
               type="text"
               placeholder={this.props.placeholder}
               value={this.props.value}
               onKeyPress={this.onKeyPress}
               onChange={this.props.onChange} />
        <button className="SearchBox__button SearchBox__search-button"
                onClick={this.props.onSearchStart}>
          <svg className="SearchBox__button-svg"
               version="1.1" viewBox="0 0 32 32" width="32" height="32">
            <path d="M31 28.64l-7.57-7.57a12.53 12.53 0 1 0-2.36 2.36l7.57 7.57zm-17.5-6a9.17 9.17 0 1 1 6.5-2.64 9.11 9.11 0 0 1-6.5 2.67z"></path>
          </svg>
        </button>
        {clearButton}
      </div>
    );
  }
}

export default SearchBox;
