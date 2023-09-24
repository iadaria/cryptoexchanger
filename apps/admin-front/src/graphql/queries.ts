import { graphql } from "@/__generated__/gql";

// Fetch

export const ALL_USERS_QUERY_FETCH = `
query {
  allUsers {
    ok
    users {
      email
    }
  }
}`;

// or
/* { allUsers { ok users { email role } } } */

// Hooks

export const ME_QUERY = graphql(`
  query me {
    me {
      role
      email
    }
  }
`);

export const ALL_USERS_QUERY = graphql(`
  query allUsers {
    allUsers {
      ok
      users {
        email
        role
        verified
      }
    }
  }
`);

export const GOOGLE_LOGIN_QUERY = graphql(`
  query googleAuth($input: SocialAuthInput!) {
    googleAuth(input: $input) {
      email
    }
  }
`);

export const GET_GOOGLE_LOG_LINK = graphql(`
  query getGoogleAuthURL {
    getGoogleAuthURL
  }
`);
