import React from 'react';
import { getPagesArray } from '../../utils/pages';

const MyPagination = ({ page, changePage, totalPage }) => {
  let pagesArray = getPagesArray(totalPage);
  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? 'page page__current' : 'page'}
        >
          {p}
        </span>
      ))}
    </div>
  );
};

export default MyPagination;
