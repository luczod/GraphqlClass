// @ts-nocheck
import P from 'prop-types';
import * as Styled from './styles';
import { Heading } from 'components/Heading';
import { Post } from 'components/Post';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';
import { GQL_POSTS } from 'graphql/queries/post';
import { Loading } from 'components/Loading';
import { DefaultError } from 'components/DefaultError';
import { FormButton } from 'components/FormButton';
import { useAuthVar } from 'graphql/reactve-var/auth';

export const Home = () => {
  const authVar = useAuthVar();
  const { loading, error, data, fetchMore } = useQuery(GQL_POSTS, {
    onError() {},
    context: {
      fromHome: 'this came from home component',
    },
    notifyOnNetworkStatusChange: true,
  });
  if (loading) return <Loading loading={loading} />;
  if (error) return <DefaultError error={error} />;
  if (!data) return null;

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        start: data.posts.length,
      },
    });
  };

  return (
    <>
      <Helmet title="Home - GraphQL + Apollo-Client" />

      <Styled.Container>
        <Heading>Posts</Heading>
      </Styled.Container>

      {/* MOCKED RESULTS */}
      <Styled.PostsContainer>
        {data.posts.slice(-5).map((post) => {
          const uniqueKey = `home-post-${post.id}`;
          return (
            <Post
              key={uniqueKey}
              id={post.id}
              title={post.title}
              body={post.body}
              user={post.user}
              createdAt={post.createdAt}
              loggedUserId={authVar.userId}
              numberOfComments={post.numberOfComments}
            />
          );
        })}
      </Styled.PostsContainer>

      <Styled.Container>
        <FormButton clickedFn={handleLoadMore} disabled={loading}>
          {loading ? 'Carregando...' : 'Load more'}
        </FormButton>
      </Styled.Container>
    </>
  );
};

Home.propTypes = {
  children: P.node,
};
