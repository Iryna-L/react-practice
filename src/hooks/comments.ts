import { useQuery, useQueryClient, useMutation, QueryState } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import {
  getArticleComments,
  createArticleComment,
  deleteArticleComment,
  ArticleCommentRequest,
  CommentsResponse,
  CommentResponse,
} from '@/api/comments';
import { ResponseErrors } from '@/types';

export function useGetArticleCommentsQuery(slug: string) {
  return useQuery({
    queryFn: () => getArticleComments(slug),
    queryKey: ['articleComments'],
    staleTime: Infinity,
  });
}

export function useCreateArticleComments(slug: string) {
  const qc = useQueryClient();
  return useMutation<
    AxiosResponse<CommentResponse>,
    AxiosError<ResponseErrors, null>,
    ArticleCommentRequest
  >({
    mutationFn: (data) => createArticleComment(slug, data),
    onSuccess: (res) => {
      const oldState: QueryState<AxiosResponse<CommentsResponse>> | undefined = qc.getQueryState([
        'articleComments',
      ]);

      if (oldState) {
        const newComment = res.data?.comment;
        const existingComments = oldState.data?.data?.comments || [];
        const updatedComments = [...existingComments, newComment];

        qc.setQueryData(['articleComments'], {
          ...oldState.data,
          data: {
            ...oldState.data?.data,
            comments: updatedComments,
          },
        });
      }
    },
  });
}

export function useDeleteArticleComments(slug: string) {
  const qc = useQueryClient();
  return useMutation<AxiosResponse<CommentResponse>, AxiosError<ResponseErrors, null>, number>({
    mutationFn: (id) => deleteArticleComment({ id, slug }),
    onSuccess: (res, deletedCommentId) => {
      const oldState: QueryState<AxiosResponse<CommentsResponse>> | undefined = qc.getQueryState([
        'articleComments',
      ]);

      if (oldState) {
        const existingComments = oldState.data?.data?.comments || [];
        const updatedComments = existingComments.filter(
          (comment) => comment.id !== deletedCommentId,
        );

        qc.setQueryData(['articleComments'], {
          ...oldState.data,
          data: {
            ...oldState.data?.data,
            comments: updatedComments,
          },
        });
      }
    },
  });
}
