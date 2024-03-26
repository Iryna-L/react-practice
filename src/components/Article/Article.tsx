import { Link } from 'react-router-dom';
import { User } from '@/types';
import { TagList } from '../TagsList';

type ArticleProps = {
  author: User;
  description: string;
  slug: string;
  tagList: Array<string>;
  title: string;
};

export function Article(props: ArticleProps) {
  const { author, description, tagList, title, slug } = props;
  return (
    <div className="article-preview">
      <div>{author.username}</div>
      <div className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <Link to={`/article/${slug}`}>Read more...</Link>
        <TagList tags={tagList} />
      </div>
    </div>
  );
}
