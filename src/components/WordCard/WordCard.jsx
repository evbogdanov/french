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
  }

  startEditing = () => {
    this.setState({editing: true});
  }

  cancelEditing = () => {
    this.setState({editing: false});
  }

  render() {
    const w = this.props.word;

    if (this.state.editing) {
      return (
        <EditCard onClickCancel={this.cancelEditing}>
          <EditWord word={w}
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
