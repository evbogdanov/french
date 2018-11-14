import React from 'react';

/*
 * Props:
 * - onPreviousClick
 * - onNextClick
 */
const Pagination = (props) => {
  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center">
        <li className="page-item"
            onClick={props.onPreviousClick}>
          <span className="page-link">Previous</span>
        </li>
        <li className="page-item"
            onClick={props.onNextClick}>
          <span className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
