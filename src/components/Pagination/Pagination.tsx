import classNames from 'classnames';
import { memo } from 'react';

type PaginationProps = {
  totalCount: number;
  limit: number;
  offset: number;
  onChange: (page: number) => void;
};

function PaginationMemo(props: PaginationProps) {
  const { totalCount, limit, offset, onChange } = props;

  const pagesCount: number = Math.ceil(totalCount / limit);
  const pagesArr = Array.from({ length: pagesCount }, (_, idx) => idx + 1);
  const currentPage: number = offset === 0 ? 1 : offset / limit + 1;

  const handleChangePage = (page: number) => {
    onChange((page - 1) * limit);
  };

  if (pagesArr.length < 2) return null;

  return (
    <ul className="pagination">
      {pagesArr.map((page) => {
        return (
          <li
            key={page}
            className={classNames({ 'page-item': true, active: currentPage === page })}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => handleChangePage(page)}
            >
              {page}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export const Pagination = memo(PaginationMemo);
