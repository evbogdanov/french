import React from 'react';
import Loader from '../Loader/Loader';
import FormRow from '../FormRow/FormRow';

/*
 * Props
 * - simple (optional)
 * - text (optional)
 * - loadingText (optional)
 * - loading (optional)
 */
const InputSubmit = (props) => {
  const text = props.text || 'Submit',
        loadingText = props.loadingText || 'Loading';

  let loader = null;
  if (props.loading) {
    loader = <Loader text={loadingText} />;
  }

  if (props.simple) {
    return (
      <div className="form-group InputSubmit">
        <button type="submit" className="btn btn-primary">{text}</button>
        <div className="InputSubmit__loader">
          {loader}
        </div>
      </div>
    );
  }

  return (
    <FormRow extraClassName="InputSubmit">
      <button type="submit" className="btn btn-primary">{text}</button>
      <div className="InputSubmit__loader">
        {loader}
      </div>
    </FormRow>
  );
};

export default InputSubmit;
