import React from 'react';
import Input from '../Input/Input';
import InputSubmit from '../InputSubmit/InputSubmit';
import Alert from '../Alert/Alert';
import FormAlert from '../FormAlert/FormAlert';

const GENDERS = ['f', 'm', ''];

/*
 * Props:
 * - simple
 *
 * - text
 * - image
 * - notes
 * - gender
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
const WordForm = (props) => {
  let [alertSuccess, alertDanger] = [null, null];
  const Al = props.simple ? Alert : FormAlert;
  if (props.successText) {
    alertSuccess = <Al type="success" text={props.successText} />;
  }
  else if (props.dangerText) {
    alertDanger = <Al type="danger" text={props.dangerText} />;
  }

  let [isInvalidGender, invalidGenderFeedback] = [false, null];
  if (!GENDERS.includes(props.gender)) {
    isInvalidGender = true;
    invalidGenderFeedback = "Invalid gender! Valid genders are 'f' or 'm'";
  }

  let heading = null;
  if (props.headingText) {
    heading = <h5>{props.headingText}</h5>;
  }

  const formClassName = props.simple ? 'form-simple' : null;

  return (
    <form onSubmit={props.handleSubmit} className={formClassName}>
      <fieldset disabled={props.loading}>
        {heading}
        <Input simple={props.simple}
               id="word-text"
               label="Text"
               placeholder="Text"
               maxLength="40"
               value={props.text}
               handleChange={ev => props.handleInputChange(ev, 'text')} />
        <Input simple={props.simple}
               id="word-notes"
               label="Notes"
               placeholder="Notes"
               maxLength="500"
               value={props.notes}
               handleChange={ev => props.handleInputChange(ev, 'notes')}
               isTextarea="true" />
        <Input simple={props.simple}
               id="word-gender"
               label="Gender"
               placeholder="Gender"
               maxLength="1"
               value={props.gender}
               handleChange={ev => props.handleInputChange(ev, 'gender')}
               isInvalid={isInvalidGender}
               invalidFeedback={invalidGenderFeedback} />
        <Input simple={props.simple}
               id="word-image"
               label="Image"
               placeholder="Paste image URL"
               maxLength="100"
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

export default WordForm;
