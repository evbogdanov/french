import React from 'react';
import Loader from '../Loader/Loader';

/*
 * Props
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

  return (
    <div className="form-group row InputSubmit">
      <div className="col-sm-2"></div>
      <div className="col-sm-10">
        <button type="submit" className="btn btn-primary">{text}</button>
        <div className="InputSubmit__loader">
          {loader}
        </div>
      </div>
    </div>
  );
};

export default InputSubmit;
