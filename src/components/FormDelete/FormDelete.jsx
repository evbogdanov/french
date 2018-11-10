import React from 'react';
import InputSubmit from '../InputSubmit/InputSubmit';
import Alert from '../Alert/Alert';

/*
 * Props:
 * - handleSubmit
 * - loading
 * - dangerText
 */
const FormDelete = (props) => {
  let alertDanger = null;
  if (props.dangerText) {
    alertDanger = <Alert type="danger" text={props.dangerText} />;
  }

  return (
    <form onSubmit={props.handleSubmit}
          className="form-simple form-slim">
      <fieldset disabled={props.loading}>
        <InputSubmit simple={true}
                     small={true}
                     theme="link"
                     textTheme="danger"
                     text="Delete"
                     loadingText="Deleting"
                     loading={props.loading} />
      </fieldset>
      {alertDanger}
    </form>
  );
};

export default FormDelete;
