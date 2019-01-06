import React, { Component } from 'react';
import { connect } from 'react-redux';
import SharedForm from '../SharedForm/SharedForm';
import FormDeleteAndCancel from '../FormDeleteAndCancel/FormDeleteAndCancel';
import * as api from '../../api';
import * as actions from '../../store/actions';
import makeTrashable from 'trashable';
import { getNextStateForChangedInput, selectWordProps } from '../../utils';

/*
 * Props:
 * - word
 * - cancelEditing
 */
class EditWord extends Component {
  constructor(props) {
    super(props);

    const word = selectWordProps(this.props.word);
    this.state = {
      ...word,

      loading: false,
      successText: '',
      dangerText: '',

      loadingDelete: false,
      dangerTextDelete: '',
    }
  }

  componentWillUnmount() {
    if (this.trashableRequestEdit) this.trashableRequestEdit.trash();
    if (this.trashableRequestDelete) this.trashableRequestDelete.trash();
  }

  handleInputChange = (event, inputName) => {
    const nextState = getNextStateForChangedInput(event, inputName);
    this.setState(nextState);
  }

  handleSubmitEdit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      successText: '',
      dangerText: '',
    });
    this.trashableRequestEdit = makeTrashable(
      api.put(`/v1/words/${this.props.word.id}`, selectWordProps(this.state))
    );
    this.trashableRequestEdit
      .then(() => {
        this.props.editWord(
          this.props.word.id,
          this.state.text,
          this.state.image,
          this.state.notes,
          this.state.gender,
        );
        this.props.cancelEditing();
      })
      .catch(error => {
        console.log(error);
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
    this.trashableRequestDelete = makeTrashable(
      api.del(`/v1/words/${this.props.word.id}`)
    );
    this.trashableRequestDelete
      .then(() => {
        this.props.deleteWordById(this.props.word.id);
      })
      .catch(error => {
        console.log(error);
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
                    model="word"
                    text={this.state.text}
                    image={this.state.image}
                    notes={this.state.notes}
                    gender={this.state.gender}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={this.handleSubmitEdit}
                    headingText={null}
                    submitText="Save"
                    loadingText="Saving"
                    loading={this.state.loading}
                    successText={this.state.successText}
                    dangerText={this.state.dangerText} />
        <FormDeleteAndCancel handleSubmit={this.handleSubmitDelete}
                             dangerText={this.state.dangerTextDelete}
                             loading={this.state.loadingDelete}
                             cancelEditing={this.props.cancelEditing}
                             cancelText="Back to word" />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editWord: (id, text, image, notes, gender) => dispatch({
      type: actions.EDIT_WORD,
      data: {id, text, image, notes, gender}
    }),
    deleteWordById: id => dispatch({
      type: actions.DELETE_WORD,
      data: {id}
    })
  };
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  {pure: false}
)(EditWord);
