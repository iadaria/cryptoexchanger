import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AllUsersOutput = {
  readonly __typename?: 'AllUsersOutput';
  readonly error?: Maybe<Scalars['String']['output']>;
  readonly ok: Scalars['Boolean']['output'];
  readonly users?: Maybe<ReadonlyArray<User>>;
};

export type CreateAccountInput = {
  readonly email: Scalars['String']['input'];
  readonly password: Scalars['String']['input'];
  readonly role?: UserRole;
};

export type CreateAccountOutput = {
  readonly __typename?: 'CreateAccountOutput';
  readonly error?: Maybe<Scalars['String']['output']>;
  readonly ok: Scalars['Boolean']['output'];
};

export type EditProfileInput = {
  readonly email?: InputMaybe<Scalars['String']['input']>;
  readonly password?: InputMaybe<Scalars['String']['input']>;
};

export type EditProfileOutput = {
  readonly __typename?: 'EditProfileOutput';
  readonly error?: Maybe<Scalars['String']['output']>;
  readonly ok: Scalars['Boolean']['output'];
};

export type LoginInput = {
  readonly email: Scalars['String']['input'];
  readonly password: Scalars['String']['input'];
};

export type LoginOutput = {
  readonly __typename?: 'LoginOutput';
  readonly error?: Maybe<Scalars['String']['output']>;
  readonly ok: Scalars['Boolean']['output'];
  readonly token?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly createAccount: CreateAccountOutput;
  readonly editProfile: EditProfileOutput;
  readonly login: LoginOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly allUsers: AllUsersOutput;
  readonly getGoogleAuthURL: Scalars['String']['output'];
  readonly googleAuth: User;
  readonly me: User;
  readonly userProfile: UserProfileOutput;
};


export type QueryGoogleAuthArgs = {
  input: SocialAuthInput;
};


export type QueryUserProfileArgs = {
  userId: Scalars['Int']['input'];
};

export type SocialAuthInput = {
  readonly code?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  readonly __typename?: 'User';
  readonly email: Scalars['String']['output'];
  readonly password: Scalars['String']['output'];
  readonly role: UserRole;
  readonly verified: Scalars['Boolean']['output'];
};

export type UserProfileOutput = {
  readonly __typename?: 'UserProfileOutput';
  readonly error?: Maybe<Scalars['String']['output']>;
  readonly ok: Scalars['Boolean']['output'];
  readonly user?: Maybe<User>;
};

export enum UserRole {
  ADMIN = 'Admin',
  ASSISTANT = 'Assistant',
  CLIENT = 'Client'
}

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { readonly __typename?: 'Mutation', readonly createAccount: { readonly __typename?: 'CreateAccountOutput', readonly ok: boolean, readonly error?: string | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { readonly __typename?: 'Mutation', readonly login: { readonly __typename?: 'LoginOutput', readonly ok: boolean, readonly error?: string | null, readonly token?: string | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { readonly __typename?: 'Query', readonly me: { readonly __typename?: 'User', readonly role: UserRole, readonly email: string } };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { readonly __typename?: 'Query', readonly allUsers: { readonly __typename?: 'AllUsersOutput', readonly ok: boolean, readonly users?: ReadonlyArray<{ readonly __typename?: 'User', readonly email: string, readonly role: UserRole, readonly verified: boolean }> | null } };

export type GetGoogleAuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleAuthUrlQuery = { readonly __typename?: 'Query', readonly getGoogleAuthURL: string };


export const CreateAccountDocument = gql`
    mutation createAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ok
    error
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const LoginDocument = gql`
    mutation login($loginInput: LoginInput!) {
  login(input: $loginInput) {
    ok
    error
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    role
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AllUsersDocument = gql`
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
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const GetGoogleAuthUrlDocument = gql`
    query getGoogleAuthURL {
  getGoogleAuthURL
}
    `;

/**
 * __useGetGoogleAuthUrlQuery__
 *
 * To run a query within a React component, call `useGetGoogleAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoogleAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoogleAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGoogleAuthUrlQuery(baseOptions?: Apollo.QueryHookOptions<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>(GetGoogleAuthUrlDocument, options);
      }
export function useGetGoogleAuthUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>(GetGoogleAuthUrlDocument, options);
        }
export type GetGoogleAuthUrlQueryHookResult = ReturnType<typeof useGetGoogleAuthUrlQuery>;
export type GetGoogleAuthUrlLazyQueryHookResult = ReturnType<typeof useGetGoogleAuthUrlLazyQuery>;
export type GetGoogleAuthUrlQueryResult = Apollo.QueryResult<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>;