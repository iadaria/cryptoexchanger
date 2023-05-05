import { graphql } from "@/__generated__/gql";

export const CREATE_ACCOUNT_MUTATION = graphql(`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }`
);

export const LOGIN_MUTATION = graphql(`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`);
