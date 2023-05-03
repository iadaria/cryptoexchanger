import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query me{
    me {
      role
      email
    }
  }
`;

export const GOOGLE_LOGIN_QUERY = gql`
  query googleAuth($input: SocialAuthInput!) {
    googleAuth(input: $input) {
      _id
    }
  }
`;

export const GET_GOOGLE_LOG_LINK = gql`
  query getGoogleAuthURL {
    getGoogleAuthURL
  }
`;
