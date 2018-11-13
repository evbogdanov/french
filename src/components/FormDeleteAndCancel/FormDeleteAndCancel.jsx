import React from 'react';
import InputSubmit from '../InputSubmit/InputSubmit';
import Alert from '../Alert/Alert';

/*
 * Props:
 * - handleSubmit
 * - loading
 * - dangerText
 * - cancelEditing
 * - cancelText
 */
const FormDeleteAndCancel = (props) => {
  let alertDanger = null;
  if (props.dangerText) {
    alertDanger = <Alert type="danger" text={props.dangerText} />;
  }

  return (
    <>
      {alertDanger}
      <div className="row">
        <div className="col">
          <form onSubmit={props.handleSubmit}
                className="form-simple form-slim">
            <fieldset disabled={props.loading}>
              <InputSubmit simple={true}
                           theme="link"
                           textTheme="danger"
                           text="Delete"
                           loadingText="Deleting"
                           loading={props.loading} />
            </fieldset>
          </form>
        </div>
        <div className="col">
          <button className="btn btn-sm btn-link btn-block"
                  onClick={props.cancelEditing}>
            {props.cancelText}
          </button>
        </div>
      </div>
    </>
  );
};

export default FormDeleteAndCancel;
