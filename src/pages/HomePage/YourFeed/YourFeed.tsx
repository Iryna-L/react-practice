import { useCallback } from 'react';
import { Article, Pagination, Spinner } from '@/components';
import { useGetYourFeedQuery } from '@/hooks/articles';
import { usePaginationStore, changeOffset } from '@/store/pagination.store';

export function YourFeed() {
  const { yourFeed } = usePaginationStore();
  const { data, isLoading } = useGetYourFeedQuery(yourFeed.limit, yourFeed.offset);
  const articles = data?.data.articles;
  const totalCount = data?.data.articlesCount;
  const handlePagination = useCallback(
    (offset: number) => {
      changeOffset(offset, 'yourFeed');
    },
    [changeOffset],
  );

  return !isLoading ? (
    <>
      <div className="article-preview">
        {articles?.map((a) => {
          return (
            <div key={a.slug}>
              <Article
                slug={a.slug}
                author={a.author}
                tagList={a.tagList}
                description={a.description}
                title={a.title}
              />
            </div>
          );
        })}
      </div>
      {totalCount ? (
        <div className="row">
          <Pagination
            totalCount={totalCount}
            offset={yourFeed.offset}
            limit={yourFeed.limit}
            onChange={handlePagination}
          />
        </div>
      ) : null}
    </>
  ) : (
    <Spinner />
  );
}
