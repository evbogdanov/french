import React from 'react';
import * as api from '../../api';

/*
 * Props:
 * - onPreviousClick
 * - onNextClick
 * - cardsOnPage
 * - offset
 */
const Pagination = (props) => {
  if (props.offset === 0 && props.cardsOnPage < api.CARDS_PER_PAGE) {
    return null;
  }

  const hasPrevious = props.offset > 0,
        hasNext = props.cardsOnPage === api.CARDS_PER_PAGE,
        previousDisabled = hasPrevious ? '' : ' disabled',
        nextDisabled = hasNext ? '' : ' disabled',
        onPreviousClick = hasPrevious ? props.onPreviousClick : null,
        onNextClick = hasNext ? props.onNextClick : null;

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item${previousDisabled}`}
            onClick={onPreviousClick}>
          <span className="page-link">Newer</span>
        </li>
        <li className={`page-item${nextDisabled}`}
            onClick={onNextClick}>
          <span className="page-link">Older</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
