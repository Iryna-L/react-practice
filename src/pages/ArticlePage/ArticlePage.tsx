import { useParams, Link } from 'react-router-dom';
import { useGetArticleQuery, useDeleteArticleMutation } from '@/hooks/articles';
import { useGetUserQuery } from '@/hooks/auth';
import { TagList, Spinner, Button } from '@/components';
import { Article } from '@/types';
import { Comments } from './Comments';

export default function ArticlePage() {
  const { slug } = useParams();

  const userData = useGetUserQuery();

  const deleteArticleMutation = useDeleteArticleMutation();

  const { data, isLoading } = useGetArticleQuery(slug as string);

  const article: Article | undefined = data?.data.article;

  const deleteArticle = () => {
    deleteArticleMutation.mutate(slug as string);
  };

  return !isLoading && article ? (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.author.bio}</h1>

          <div className="article-meta">
            <Link to="/profile/eric-simons">
              <img
                alt="profile-img"
                src={article.author.image}
              />
            </Link>
            <div className="info">
              <Link
                to="/profile/eric-simons"
                className="author"
              >
                {article.author.username}
              </Link>
              <span className="date">jan 29</span>
            </div>
            {userData.data?.data.user.username !== article.author.username ? (
              <>
                <Button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  icon="ion-plus-round"
                  text={`Follow ${article.author.username} (${article.favoritesCount})`}
                />
                <Button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  icon="ion-heart"
                  text={`Favorite Post (${article.favoritesCount})`}
                />
              </>
            ) : (
              <>
                <Link to={`/editor/${article.slug}`}>
                  <Button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    icon="ion-edit"
                    text="Edit Article"
                  />
                </Link>
                <Button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  icon="ion-trash-a"
                  text="Delete Article"
                  onClick={deleteArticle}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p>{article.body}</p>
            <TagList tags={article.tagList} />
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <Link to="/profile/eric-simons">
              <img
                alt="profile-img"
                src={article.author.image}
              />
            </Link>
            <div className="info">
              <Link
                to="/profile/eric-simons"
                className="author"
              >
                {article.author.username}
              </Link>
              <span className="date">January 20th</span>
            </div>
            {userData.data?.data.user.username !== article.author.username ? (
              <>
                <Button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  icon="ion-plus-round"
                  text={`Follow ${article.author.username} (${article.favoritesCount})`}
                />
                <Button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  icon="ion-heart"
                  text={`Favorite Post (${article.favoritesCount})`}
                />
              </>
            ) : (
              <>
                <Link to={`/editor/${article.slug}`}>
                  <Button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    icon="ion-edit"
                    text="Edit Article"
                  />
                </Link>
                <Button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  icon="ion-trash-a"
                  text="Delete Article"
                  onClick={deleteArticle}
                />
              </>
            )}
          </div>
        </div>

        <div className="row">
          <Comments slug={slug as string} />
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
