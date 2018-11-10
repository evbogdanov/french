import React, { Component } from 'react';
import { connect } from 'react-redux';
import WordForm from '../WordForm/WordForm';
import * as api from '../../api';
import * as actions from '../../store/actions';

/*
 * Props:
 * - word
 * - cancelEditing
 */
class EditWord extends Component {
  state = {
    text: this.props.word.text,
    image: this.props.word.image,
    notes: this.props.word.notes,
    gender: this.props.word.gender,

    loading: false,
    successText: '',
    dangerText: '',
  }

  handleInputChange = (event, inputName) => {
    const nextState = {
      successText: '',
      dangerText: '',
    };
    nextState[inputName] = event.target.value;
    this.setState(nextState);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      successText: '',
      dangerText: '',
    });
    api.put(`/v1/words/${this.props.word.id}`, this.state)
      .then(res => {
        this.props.editWord(
          this.props.word.id,
          this.state.text,
          this.state.image,
          this.state.notes,
          this.state.gender,
        );
        this.props.cancelEditing();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          dangerText: 'Server error',
        });
      });
  }

  render() {
    return (
      <WordForm simple={true}
                text={this.state.text}
                image={this.state.image}
                notes={this.state.notes}
                gender={this.state.gender}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                headingText=""
                submitText="Save"
                loadingText="Saving"
                loading={this.state.loading}
                successText={this.state.successText}
                dangerText={this.state.dangerText} />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editWord: (id, text, image, notes, gender) => dispatch({
      type: actions.EDIT_WORD,
      data: {id, text, image, notes, gender}
    })
  };
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  {pure: false}
)(EditWord);
