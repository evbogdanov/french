import React from 'react';
import * as api from '../../api';

/*
 * Props:
 * - loading
 * - onPrevClick
 * - onNextClick
 * - cardsOnPage
 * - offset
 */
const Pagination = (props) => {
  if (props.loading ||
      (props.offset === 0 && props.cardsOnPage < api.CARDS_PER_PAGE)) {
    return null;
  }

  const hasPrev = props.offset > 0,
        hasNext = props.cardsOnPage === api.CARDS_PER_PAGE,
        prevDisabled = hasPrev ? '' : ' disabled',
        nextDisabled = hasNext ? '' : ' disabled',
        onPrevClick = hasPrev ? props.onPrevClick : null,
        onNextClick = hasNext ? props.onNextClick : null;

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item${prevDisabled}`}
            onClick={onPrevClick}>
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
