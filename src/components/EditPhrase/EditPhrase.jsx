import React, { Component } from 'react';
import { connect } from 'react-redux';
import SharedForm from '../SharedForm/SharedForm';
import FormDelete from '../FormDelete/FormDelete';
import * as api from '../../api';
import * as actions from '../../store/actions';

/*
 * Props:
 * - phrase
 * - cancelEditing
 */
class EditPhrase extends Component {
  state = {
    text: this.props.phrase.text,
    image: this.props.phrase.image,
    notes: this.props.phrase.notes,

    loading: false,
    successText: '',
    dangerText: '',

    loadingDelete: false,
    dangerTextDelete: '',
  }

  handleInputChange = (event, inputName) => {
    const nextState = {
      successText: '',
      dangerText: '',
    };
    nextState[inputName] = event.target.value;
    this.setState(nextState);
  }

  handleSubmitEdit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      successText: '',
      dangerText: '',
    });
    api.put(`/v1/phrases/${this.props.phrase.id}`, this.state)
      .then(res => {
        this.props.editPhrase(
          this.props.phrase.id,
          this.state.text,
          this.state.image,
          this.state.notes,
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

  handleSubmitDelete = (event) => {
    event.preventDefault();
    this.setState({
      loadingDelete: true,
      dangerTextDelete: '',
    });
    api.del(`/v1/phrases/${this.props.phrase.id}`)
      .then(res => {
        this.props.deletePhraseById(this.props.phrase.id);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loadingDelete: false,
          dangerTextDelete: "Couldn't delete"
        });
      });
  }

  render() {
    return (
      <>
        <SharedForm simple={true}
                    model="phrase"
                    text={this.state.text}
                    image={this.state.image}
                    notes={this.state.notes}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={this.handleSubmitEdit}
                    headingText={null}
                    submitText="Save"
                    loadingText="Saving"
                    loading={this.state.loading}
                    successText={this.state.successText}
                    dangerText={this.state.dangerText} />
        <FormDelete handleSubmit={this.handleSubmitDelete}
                    dangerText={this.state.dangerTextDelete}
                    loading={this.state.loadingDelete} />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editPhrase: (id, text, image, notes) => dispatch({
      type: actions.EDIT_PHRASE,
      data: {id, text, image, notes}
    }),
    deletePhraseById: id => dispatch({
      type: actions.DELETE_PHRASE,
      data: {id}
    })
  };
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  {pure: false}
)(EditPhrase);
