import React, { Component } from 'react';
import Card from '../Card/Card';
import EditCard from '../EditCard/EditCard';
import EditPhrase from '../EditPhrase/EditPhrase';

/*
 * Props:
 * - phrase
 * - isAuthenticated
 */
class PhraseCard extends Component {
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
    const p = this.props.phrase;

    if (this.state.editing) {
      return (
        <EditCard onClickCancel={this.cancelEditing}>
          <EditPhrase phrase={p}
                      cancelEditing={this.cancelEditing} />
        </EditCard>
      );
    }

    let relatedWords = null;
    if (Array.isArray(p.related_words)) {
      const words = p.related_words.map(w => {
        return (
          <span key={w.id}
                className="card-link PhraseCard__related-word">{w.text}</span>
        );
      });
      relatedWords = <p className="card-text">{words}</p>;
    }
    return <Card extraClassName="PhraseCard"
                 header={p.text}
                 image={p.image}
                 notes={p.notes}
                 extraBody={relatedWords}
                 days_ago={p.days_ago}
                 canEdit={this.props.isAuthenticated}
                 onClickEdit={this.startEditing} />;
  }
}

export default PhraseCard;
