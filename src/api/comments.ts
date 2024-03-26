import { Api } from './axios';
import { Comment } from '@/types';

export type CommentsResponse = {
  comments: Array<Comment>;
};
export type CommentResponse = {
  comment: Comment;
};
export type ArticleCommentRequest = {
  comment: {
    body: string;
  };
};
export type DeleteArticleParams = {
  slug: string;
  id: number;
};

export const getArticleComments = (slug: string) =>
  Api.get<CommentsResponse>(`/articles/${slug}/comments`);
export const createArticleComment = (slug: string, data: ArticleCommentRequest) =>
  Api.post<CommentResponse>(`/articles/${slug}/comments`, data);
export const deleteArticleComment = (params: DeleteArticleParams) =>
  Api.delete<CommentResponse>(`/articles/${params.slug}/comments/${params.id}`);
