// @ts-nocheck
import { GQL_LOGOUT } from 'graphql/mutations/auth';
import { authDataManager } from 'graphql/reactve-var/auth';

export const logout = async (client, userName, callback) => {
  authDataManager.resetVar();

  try {
    await client.mutate({
      mutation: GQL_LOGOUT,
      variables: {
        userName,
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  if (callback) {
    callback();
  }
};
