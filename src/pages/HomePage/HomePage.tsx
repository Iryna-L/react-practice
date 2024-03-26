import { useCallback, useState, useMemo } from 'react';
import { Tabs, TagList } from '@/components';
import { GlobalFeed } from './GlobalFeed';
import { YourFeed } from './YourFeed';
import { useGetTags } from '@/hooks/articles';
import { useGetUserQuery } from '@/hooks/auth';
import { Tab } from '@/types';

export default function HomePage() {
  const { isAuthenticated } = useGetUserQuery();

  const [activeTab, setActiveTab] = useState('Global Feed');
  const [tags, setTags] = useState<Array<string>>([]);
  const { data, isLoading } = useGetTags();

  const tagList = data?.data.tags || [];
  const handleTagFilter = useCallback(
    (tagProp: string) => {
      setTags(tags?.concat([tagProp]));
      setActiveTab(tagProp);
    },
    [tags],
  );

  const removeTab = (tagProp: string) => {
    setTags(
      tags?.filter((tag) => {
        return tagProp !== tag;
      }),
    );
    setActiveTab('Global Feed');
  };

  const tabs: Tab[] = useMemo(() => {
    const dynamicTabs: Tab[] = tags?.map((t) => {
      return {
        name: t,
        show: true,
        close: () => removeTab(t),
      };
    });
    return [
      {
        name: 'Your Feed',
        show: isAuthenticated,
      },
      {
        name: 'Global Feed',
        show: true,
      },
    ].concat(dynamicTabs);
  }, [tags, isAuthenticated]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Tabs
              tabs={tabs}
              active={activeTab}
              onToggle={setActiveTab}
            >
              <GlobalFeed data-key="Global Feed" />

              {isAuthenticated ? <YourFeed data-key="Your Feed" /> : null}
              {tags?.map((tag) => {
                return (
                  <GlobalFeed
                    data-key={tag}
                    tag={tag}
                    key={tag}
                  />
                );
              })}
            </Tabs>
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              {!isLoading ? (
                <TagList
                  tags={tagList}
                  theme="dark"
                  onTagClick={handleTagFilter}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
