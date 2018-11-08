import React, { Component } from 'react';
import Card from '../Card/Card';
import EditCard from '../EditCard/EditCard';
import EditWord from '../EditWord/EditWord';

/*
 * Props:
 * - word
 * - isAuthenticated
 */
class WordCard extends Component {
  state = {
    editing: false,
    word: this.props.word,
  }

  startEditing = () => {
    this.setState({editing: true});
  }

  cancelEditing = () => {
    this.setState({editing: false});
  }

  editWord = (text, image, notes, gender) => {
    const word = {...this.state.word};
    word.text = text;
    word.image = image;
    word.notes = notes;
    word.gender = gender;
    this.setState({word});
  }

  render() {
    const w = this.state.word;

    if (this.state.editing) {
      return (
        <EditCard onClickCancel={this.cancelEditing}>
          <EditWord word={w}
                    editWord={this.editWord}
                    cancelEditing={this.cancelEditing} />
        </EditCard>
      );
    }

    let extraClassName = '';
    if (w.gender) {
      extraClassName = `WordCard_gender_${w.gender}`;
    }
    return <Card extraClassName={extraClassName}
                 header={w.text}
                 image={w.image}
                 notes={w.notes}
                 days_ago={w.days_ago}
                 canEdit={this.props.isAuthenticated}
                 onClickEdit={this.startEditing} />;
  }
}

export default WordCard;
