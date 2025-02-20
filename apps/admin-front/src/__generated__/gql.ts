/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createAccount($input: CreateAccountInput!) {\n    createAccount(input: $input) {\n      ok\n      error\n    }\n  }": types.CreateAccountDocument,
    "\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      error\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  query me{\n    me {\n      role\n      email\n    }\n  }\n": types.MeDocument,
    "\n  query allUsers {\n    allUsers {\n      ok\n      users {\n        email\n        role\n        verified\n      }\n    }\n  }\n": types.AllUsersDocument,
    "\n  query getGoogleAuthURL {\n    getGoogleAuthURL\n  }\n": types.GetGoogleAuthUrlDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAccount($input: CreateAccountInput!) {\n    createAccount(input: $input) {\n      ok\n      error\n    }\n  }"): (typeof documents)["\n  mutation createAccount($input: CreateAccountInput!) {\n    createAccount(input: $input) {\n      ok\n      error\n    }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      error\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      error\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me{\n    me {\n      role\n      email\n    }\n  }\n"): (typeof documents)["\n  query me{\n    me {\n      role\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allUsers {\n    allUsers {\n      ok\n      users {\n        email\n        role\n        verified\n      }\n    }\n  }\n"): (typeof documents)["\n  query allUsers {\n    allUsers {\n      ok\n      users {\n        email\n        role\n        verified\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGoogleAuthURL {\n    getGoogleAuthURL\n  }\n"): (typeof documents)["\n  query getGoogleAuthURL {\n    getGoogleAuthURL\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;