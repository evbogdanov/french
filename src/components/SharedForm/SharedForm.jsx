import React from 'react';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';
import Alert from '../Alert/Alert';
import FormAlert from '../FormAlert/FormAlert';
import {
  SHARED_NOTES_MAX_LENGTH,
  SHARED_IMAGE_MAX_LENGTH
} from '../../models/shared';
import { WORD_TEXT_MAX_LENGTH, WORD_GENDERS } from '../../models/word';
import { PHRASE_TEXT_MAX_LENGTH } from '../../models/phrase';

/*
 * Props:
 * - simple
 * - model ("word" or "phrase")
 *
 * - text
 * - image
 * - notes
 * - gender ("word" model only)
 *
 * - handleInputChange
 * - handleSubmit
 *
 * - headingText
 * - submitText
 * - loadingText
 *
 * - loading
 * - successText
 * - dangerText
 */
const SharedForm = (props) => {
  const formClassName = props.simple ? 'form-simple' : null;

  let heading = null;
  if (props.headingText) {
    heading = <h5>{props.headingText}</h5>;
  }

  let [alertSuccess, alertDanger] = [null, null];
  const Al = props.simple ? Alert : FormAlert;
  if (props.successText) {
    alertSuccess = <Al type="success" text={props.successText} />;
  }
  else if (props.dangerText) {
    alertDanger = <Al type="danger" text={props.dangerText} />;
  }

  let inputGender = null;
  if (props.model === 'word') {
    let [isInvalidGender, invalidGenderFeedback] = [false, null];
    if (!WORD_GENDERS.includes(props.gender)) {
      isInvalidGender = true;
      invalidGenderFeedback = "Invalid gender! Valid genders are 'f' or 'm'";
    }
    inputGender = (
      <Input simple={props.simple}
             id="word-gender"
             label="Gender"
             placeholder="Gender"
             maxLength="1"
             value={props.gender}
             handleChange={ev => props.handleInputChange(ev, 'gender')}
             isInvalid={isInvalidGender}
             invalidFeedback={invalidGenderFeedback} />
    );
  }

  const textMaxLength = props.model === 'word' ? WORD_TEXT_MAX_LENGTH
                                               : PHRASE_TEXT_MAX_LENGTH;

  return (
    <form onSubmit={props.handleSubmit} className={formClassName}>
      <fieldset disabled={props.loading}>
        {heading}
        <Input simple={props.simple}
               id={`${props.model}-text`}
               label="Text"
               placeholder="Text"
               maxLength={textMaxLength}
               value={props.text}
               handleChange={ev => props.handleInputChange(ev, 'text')} />
        <Input simple={props.simple}
               id={`${props.model}-notes`}
               label="Notes"
               placeholder="Notes"
               maxLength={SHARED_NOTES_MAX_LENGTH}
               value={props.notes}
               handleChange={ev => props.handleInputChange(ev, 'notes')}
               isTextarea="true" />
        {inputGender}
        <Input simple={props.simple}
               id={`${props.model}-image`}
               label="Image"
               placeholder="Paste image URL"
               maxLength={SHARED_IMAGE_MAX_LENGTH}
               value={props.image}
               handleChange={ev => props.handleInputChange(ev, 'image')} />
        <InputSubmit simple={props.simple}
                     text={props.submitText}
                     loadingText={props.loadingText}
                     loading={props.loading} />
      </fieldset>
      {alertSuccess}
      {alertDanger}
    </form>
  );
};

export default SharedForm;
