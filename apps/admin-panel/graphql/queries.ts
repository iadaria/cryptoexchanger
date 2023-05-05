import { graphql } from "@/__generated__/gql";

export const ME_QUERY = graphql(`
  query me{
    me {
      role
      email
    }
  }
`);

/* export const GOOGLE_LOGIN_QUERY = graphql(`
  query googleAuth($input: SocialAuthInput!) {
    googleAuth(input: $input) {
      _id
    }
  }
`);

export const GET_GOOGLE_LOG_LINK = graphql(`
  query getGoogleAuthURL {
    getGoogleAuthURL
  }
`);
 */