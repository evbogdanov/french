import React, { Component } from 'react';
import Card from '../Card/Card';
import EditCard from '../EditCard/EditCard';

/*
 * Props:
 * - word
 * - isAuthenticated
 */
class WordCard extends Component {
  state = {
    editing: false,
  }

  handleClickEdit = () => {
    this.setState({editing: true});
  }

  handleClickCancel = () => {
    this.setState({editing: false});
  }

  render() {
    const w = this.props.word;

    if (this.state.editing) {
      return (
        <EditCard onClickCancel={this.handleClickCancel}>
          Edit word: {w.text}
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
                 onClickEdit={this.handleClickEdit} />;
  }
}

export default WordCard;
