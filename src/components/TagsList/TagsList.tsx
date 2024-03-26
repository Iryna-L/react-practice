import classNames from 'classnames';
import { memo } from 'react';

type TagsListProps = {
  tags: Array<string>;
  theme?: 'light' | 'dark';
  onTagClick?: (tag: string) => void;
};

export function TagListMemo(props: TagsListProps) {
  const { tags, theme = 'light', onTagClick } = props;
  return (
    <div className="tag-list">
      {tags.map((tag) => {
        return (
          <button
            key={tag}
            type="button"
            className={classNames({
              'tag-default tag-pill': true,
              'tag-outline': theme === 'light',
            })}
            onClick={() => (onTagClick ? onTagClick(tag) : null)}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

export const TagList = memo(TagListMemo);
