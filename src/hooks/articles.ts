import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ResponseErrors } from '@/types';
import {
  getGlobalFeed,
  getYourFeed,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getTags,
  ArticleResponse,
  ArticleRequest,
} from '@/api/articles';
import { RouterConfig } from '@/constants/routes';

export function useGetGlobalFeedQuery(limit: number, offset: number, tag?: string) {
  return useQuery({
    queryFn: () => getGlobalFeed(limit, offset, tag),
    queryKey: ['globalFeed', limit, offset, tag],
  });
}

export function useGetYourFeedQuery(limit: number, offset: number, tag?: string) {
  return useQuery({
    queryFn: () => getYourFeed(limit, offset, tag),
    queryKey: ['yourFeed', limit, offset, tag],
  });
}

export function useGetArticleQuery(slug: string) {
  return useQuery({
    queryFn: () => getArticle(slug),
    queryKey: ['article', slug],
    enabled: !!slug,
  });
}

export function useCreateArticleMutation() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    AxiosResponse<ArticleResponse>,
    AxiosError<ResponseErrors, null>,
    ArticleRequest
  >({
    mutationFn: (article) => createArticle(article),
    onSuccess: (res) => {
      qc.setQueryData(['article'], res);
      navigate(`/article/${res.data.article.slug}`);
    },
  });
}

export function useUpdateArticleMutation() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    AxiosResponse<ArticleResponse>,
    AxiosError<ResponseErrors, null>,
    ArticleRequest
  >({
    mutationFn: (article) => updateArticle(article),
    onSuccess: (res) => {
      qc.setQueryData(['article'], res);
      navigate(`/article/${res.data.article.slug}`);
    },
  });
}
export function useDeleteArticleMutation() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<AxiosResponse<ArticleResponse>, AxiosError<ResponseErrors, null>, string>({
    mutationFn: (slug) => deleteArticle(slug),
    onSuccess: (res) => {
      qc.setQueryData(['article'], res);
      navigate(RouterConfig.Home);
    },
  });
}

export function useGetTags() {
  return useQuery({
    queryFn: getTags,
    queryKey: ['tags'],
    refetchOnMount: false,
    retryOnMount: false,
  });
}
