import React from 'react';

/*
 * Props:
 * - onPreviousClick
 * - onNextClick
 * - hasPrevious
 * - hasNext
 */
const Pagination = (props) => {
  const previousDisabled = props.hasPrevious ? '' : ' disabled',
        nextDisabled = props.hasNext ? '' : ' disabled',
        onPreviousClick = props.hasPrevious ? props.onPreviousClick : null,
        onNextClick = props.hasNext ? props.onNextClick : null;

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item${previousDisabled}`}
            onClick={onPreviousClick}>
          <span className="page-link">Previous</span>
        </li>
        <li className={`page-item${nextDisabled}`}
            onClick={onNextClick}>
          <span className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
