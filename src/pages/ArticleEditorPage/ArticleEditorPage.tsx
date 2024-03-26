import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from '@/hooks/articles';
import { Input, Button, TextArea, TagList, FormErrors } from '@/components';
import { validationArticleEditorSchema } from '@/utils';

type FormValues = {
  description: string;
  tagList?: string;
  title: string;
  body: string;
};

export default function ArticleEditorPage() {
  const { slug = '' } = useParams();
  const articleResponse = useGetArticleQuery(slug);

  const articleData = articleResponse?.data?.data.article;

  const defaultValues = {
    title: articleData?.title || '',
    description: articleData?.description || '',
    body: articleData?.body || '',
    tagList: articleData?.tagList.join(' ') || '',
  };

  const updateMutation = useUpdateArticleMutation();
  const createMutation = useCreateArticleMutation();

  const tags: Array<string> = articleData?.tagList || [];

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(validationArticleEditorSchema),
  });

  const onSubmit = (article: FormValues) => {
    if (slug) {
      updateMutation.mutate({
        article: { ...article, slug, tagList: article.tagList?.split(' ') || [] },
      });
    } else {
      createMutation.mutate({
        article: { ...article, tagList: article.tagList?.split(' ') || [] },
      });
    }
  };

  const responseErrors = slug
    ? updateMutation.error?.response?.data
    : createMutation.error?.response?.data;

  const isLoading = slug ? updateMutation.isLoading : createMutation.isLoading;

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = methods;
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <FormErrors error={responseErrors} />

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <Input
                    name="title"
                    type="text"
                    errors={errors}
                    registerProps={register('title')}
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    name="description"
                    type="text"
                    errors={errors}
                    registerProps={register('description')}
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <TextArea
                    name="body"
                    registerProps={register('body')}
                    errors={errors}
                    placeholder="Write your article (in markdown)"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    name="tagList"
                    errors={errors}
                    registerProps={register('tagList')}
                    placeholder="Enter tags"
                  />
                </fieldset>
                <TagList tags={tags} />
                <Button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  text={slug ? 'Edit Article' : 'Publish Article'}
                  loading={isLoading}
                  disabled={!isDirty}
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
