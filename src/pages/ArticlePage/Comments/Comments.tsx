import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  useGetArticleCommentsQuery,
  useCreateArticleComments,
  useDeleteArticleComments,
} from '@/hooks/comments';
import { Comment } from '@/types';
import { Button, TextArea, FormErrors } from '@/components';

type CommetnsProps = {
  slug: string;
};

type FormValues = {
  comment: string;
};

export function Comments(props: CommetnsProps) {
  const { slug } = props;
  const { data, isLoading } = useGetArticleCommentsQuery(slug);

  const commentsArray = data?.data.comments;
  const deleteCommentMutation = useDeleteArticleComments(slug);
  const createCommentMutation = useCreateArticleComments(slug);

  const deleteComment = (id: number) => {
    deleteCommentMutation.mutate(id);
  };
  const createComment = (payload: FormValues) => {
    createCommentMutation.mutate({ comment: { body: payload.comment } });
  };
  const methods = useForm<FormValues>({
    defaultValues: { comment: '' },
  });

  const responseErrors = createCommentMutation.error?.response?.data;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      <form
        onSubmit={handleSubmit(createComment)}
        className="card comment-form"
      >
        <FormErrors error={responseErrors} />
        <div className="card-block">
          <TextArea
            name="comment"
            errors={errors}
            registerProps={register('comment')}
            placeholder="Write a comment..."
            rows={3}
          />
        </div>
        <div className="card-footer">
          <Button
            className="btn btn-outline-primary"
            type="submit"
            text="Post Comment"
            loading={createCommentMutation.isLoading}
          />
        </div>
      </form>
      {!isLoading && commentsArray
        ? commentsArray.map((comment: Comment) => {
            return (
              <div
                key={comment.id}
                className="card"
              >
                <div className="card-block">
                  <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-footer">
                  <Link
                    to="/"
                    className="comment-author"
                  >
                    <img
                      alt="profile-img"
                      src={comment.author.image}
                      className="comment-author-img"
                    />
                  </Link>
                  &nbsp;
                  <Link
                    to="/"
                    className="comment-author"
                  >
                    {comment.author.username}
                  </Link>
                  <span className="date-posted">{comment.createdAt}</span>
                  <Button
                    className="btn btn-outline-danger"
                    type="button"
                    text="Delete"
                    onClick={() => deleteComment(comment.id)}
                  />
                </div>
              </div>
            );
          })
        : 'Loading...'}
    </div>
  );
}
