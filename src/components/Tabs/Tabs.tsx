import classNames from 'classnames';
import { Children } from 'react';
import { Tab } from '@/types';
import { Button } from '@/components';
import { TabItem } from './styles';

type TabsProps = {
  active: string;
  tabs: Array<Tab>;
  onToggle: (tab: string) => void;
  children?: React.ReactNode;
};

export function Tabs(props: TabsProps) {
  const { active, tabs, onToggle, children } = props;

  const ChildToShow = Children.toArray(children).find(
    (child) =>
      typeof child === 'object' &&
      'props' in child &&
      child.props &&
      child.props['data-key'] === active,
  );

  const filteredTabs = tabs.filter((tab) => {
    return tab.show;
  });

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {filteredTabs.map((tab) => {
          return (
            <TabItem
              className="nav-item"
              key={tab.name}
            >
              <Button
                type="button"
                onClick={() => onToggle(tab.name)}
                text={tab.name}
                className={classNames({ 'nav-link': true, active: tab.name === active })}
              />
              {tab.close ? (
                <Button
                  type="button"
                  onClick={tab.close}
                  className="nav-link"
                  icon="ion-close"
                />
              ) : null}
            </TabItem>
          );
        })}
      </ul>
      {ChildToShow}
    </div>
  );
}
