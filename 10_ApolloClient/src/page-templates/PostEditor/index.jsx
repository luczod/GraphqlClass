// @ts-nocheck
import { PostForm } from '../../components/PostForm';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GQL_POST } from 'graphql/queries/post';
import { useEffect } from 'react';
import { Loading } from 'components/Loading';
import { GQL_CREATE_POST, GQL_UPDATE_POST } from 'graphql/mutations/post';
import { GQL_FRAGMENT_POST } from 'graphql/fragments/posts';

export const PostEditor = () => {
  const { id } = useParams();
  const history = useHistory();
  const [getPost, { loading, error, data }] = useLazyQuery(GQL_POST);

  const [updatePost, { error: updateError }] = useMutation(GQL_UPDATE_POST, {
    onError() {},
    onCompleted() {
      toast.success('Post atualizado com sucesso!', {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  const [createPost, { error: createError }] = useMutation(GQL_CREATE_POST, {
    onError() {},
    onCompleted(data) {
      toast.success('Post Criado com sucesso!', {
        position: toast.POSITION.TOP_CENTER,
      });

      history.push(`/post/${data.createPost.id}/edit`);
    },

    update(cache, { data }) {
      const newPostRef = cache.writeFragment({
        fragment: GQL_FRAGMENT_POST,
        data: data.createPost,
        variables: { id: data.createPost.id },
      });

      cache.modify({
        fields: {
          posts(existing = []) {
            // o novo post fica no top dos outros posts
            return [newPostRef, ...existing];
          },
        },
      });
    },
  });

  useEffect(() => {
    if (!id) return;

    getPost({
      variables: {
        id,
      },
    });
  }, [id, getPost]);

  if (loading) return <Loading loading={true} />;

  const handleSubmit = (formValue) => {
    if (id) return handleUpdate(formValue);
    return handleCreate(formValue);
  };

  const handleUpdate = async (formValue) => {
    console.log('update ', formValue);
    await updatePost({
      variables: {
        postId: id,
        title: formValue.title,
        body: formValue.body,
      },
    });
  };

  const handleCreate = async (formValue) => {
    await createPost({
      variables: {
        title: formValue.title,
        body: formValue.body,
      },
    });
  };

  // if terciario encadeado
  const formError = error
    ? error.message
    : updateError
    ? updateError.message
    : createError
    ? createError.message
    : '';

  return (
    <>
      <Helmet title="Edit/Create Post - GraphQL + Apollo-Client" />

      <PostForm
        handleSubmitCb={handleSubmit}
        post={data?.post}
        formError={formError}
      />
    </>
  );
};
