import { useCallback } from 'react';
import { Article, Pagination, Spinner } from '@/components';
import { useGetGlobalFeedQuery } from '@/hooks/articles';
import { usePaginationStore, changeOffset } from '@/store/pagination.store';

export function GlobalFeed(props: { tag?: string }) {
  const { tag } = props;
  const { globalFeed } = usePaginationStore();
  const { data, isLoading } = useGetGlobalFeedQuery(globalFeed.limit, globalFeed.offset, tag);
  const articles = data?.data.articles;
  const totalCount = data?.data.articlesCount;

  const handlePagination = useCallback(
    (offset: number) => {
      changeOffset(offset, 'globalFeed');
    },
    [changeOffset],
  );

  return !isLoading ? (
    <>
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
      {totalCount ? (
        <div className="row">
          <Pagination
            totalCount={totalCount}
            offset={globalFeed.offset}
            limit={globalFeed.limit}
            onChange={handlePagination}
          />
        </div>
      ) : null}
    </>
  ) : (
    <Spinner />
  );
}
