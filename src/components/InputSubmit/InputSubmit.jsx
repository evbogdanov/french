import React from 'react';
import Loader from '../Loader/Loader';
import FormRow from '../FormRow/FormRow';

/*
 * Props
 * - simple (optional)
 * - small (optional)
 * - text (optional)
 * - loadingText (optional)
 * - loading (optional)
 * - theme (optional)
 * - textTheme (optional)
 */
const InputSubmit = (props) => {
  const text = props.text || 'Submit',
        loadingText = props.loadingText || 'Loading',
        theme = props.theme || 'primary',
        textTheme = props.textTheme || 'light';

  let loader = null;
  if (props.loading) {
    loader = <Loader text={loadingText} />;
  }

  if (props.simple) {
    const btnText = loader || text,
          sm = props.small ? ' btn-sm' : '';
    return (
      <div className="form-group InputSubmit">
        <button type="submit"
                className={`btn btn-block btn-${theme} text-${textTheme}${sm}`}>
          {btnText}
        </button>
      </div>
    );
  }

  return (
    <FormRow extraClassName="InputSubmit">
      <button type="submit"
              className={`btn btn-${theme} text-${textTheme}`}>{text}</button>
      <div className="InputSubmit__loader">
        {loader}
      </div>
    </FormRow>
  );
};

export default InputSubmit;
