import React, { Component } from 'react';
import { connect } from 'react-redux';
import SharedForm from '../SharedForm/SharedForm';
import FormDeleteAndCancel from '../FormDeleteAndCancel/FormDeleteAndCancel';
import EditRelatedWords from '../EditRelatedWords/EditRelatedWords';
import * as api from '../../api';
import * as actions from '../../store/actions';
import makeTrashable from 'trashable';
import { getNextStateForChangedInput } from '../../utils';

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

    suggestionsText: '',
  }

  componentWillUnmount() {
    if (this.trashableRequestEdit) this.trashableRequestEdit.trash();
    if (this.trashableRequestDelete) this.trashableRequestDelete.trash();
    if (this.trashableRequestAddWord) this.trashableRequestAddWord.trash();
    if (this.trashableRequestRemoveWord) this.trashableRequestRemoveWord.trash();
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
      api.put(`/v1/phrases/${this.props.phrase.id}`, this.state)
    );
    this.trashableRequestEdit
      .then(() => {
        this.props.editPhrase(
          this.props.phrase.id,
          this.state.text,
          this.state.image,
          this.state.notes,
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
      api.del(`/v1/phrases/${this.props.phrase.id}`)
    );
    this.trashableRequestDelete
      .then(() => {
        this.props.deletePhraseById(this.props.phrase.id);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loadingDelete: false,
          dangerTextDelete: "Couldn't delete"
        });
      });
  }

  addWord = (wordId, wordText) => {
    const relatedWords = this.props.phrase.related_words || [];
    if (relatedWords.some(w => w.id === wordId)) {
      // Word already added
      return;
    }

    const phraseId = this.props.phrase.id;
    this.trashableRequestAddWord = makeTrashable(
      api.put(`/v1/phrases/${phraseId}/words/${wordId}`)
    );
    this.trashableRequestAddWord
      .then(() => {
        this.setState({suggestionsText: ''});
        this.props.addRelatedWord(phraseId, wordId, wordText);
      })
      .catch(error => {
        console.log(error);
      });
  }

  removeWord = (wordId) => {
    const phraseId = this.props.phrase.id;
    this.trashableRequestRemoveWord = makeTrashable(
      api.del(`/v1/phrases/${phraseId}/words/${wordId}`)
    );
    this.trashableRequestRemoveWord
      .then(() => {
        this.props.removeRelatedWord(phraseId, wordId);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSuggestionsTextChange = (event) => {
    this.setState({suggestionsText: event.target.value});
  }

  render() {
    const relatedWords = this.props.phrase.related_words || [];
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
        <EditRelatedWords relatedWords={relatedWords}
                          addWord={this.addWord}
                          removeWord={this.removeWord}
                          suggestionsText={this.state.suggestionsText}
                          onSuggestionsTextChange={this.handleSuggestionsTextChange} />
        <FormDeleteAndCancel handleSubmit={this.handleSubmitDelete}
                             dangerText={this.state.dangerTextDelete}
                             loading={this.state.loadingDelete}
                             cancelEditing={this.props.cancelEditing}
                             cancelText="Back to phrase" />
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
    }),
    addRelatedWord: (phraseId, wordId, wordText) => dispatch({
      type: actions.ADD_RELATED_WORD,
      data: {phraseId, wordId, wordText}
    }),
    removeRelatedWord: (phraseId, wordId) => dispatch({
      type: actions.REMOVE_RELATED_WORD,
      data: {phraseId, wordId}
    })
  };
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  {pure: false}
)(EditPhrase);
