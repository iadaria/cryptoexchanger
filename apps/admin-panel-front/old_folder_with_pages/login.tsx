'use client';
import { LoginInput } from '@/__generated__/graphql';
import { EMAIL_PATTERN, LOCALSTORAGE_TOKEN } from '@/common/common.constants';
import { FormError } from '@/components/FormError';
import { authTokenVar, isLoggedInVar } from '@/config/apollo';
import { LOGIN_MUTATION } from '@/graphql/mutation';
import { ApolloError, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface ILoginForm extends LoginInput {}

export default function LoginPage() {
  const [loginMutation, loginMutationResult] = useMutation(LOGIN_MUTATION);
  const { loading, error, data } = loginMutationResult;

  const router = useRouter();

  const form = useForm<ILoginForm>({
    mode: 'onChange',
    defaultValues: {},
  });
  const { errors: formErrors } = form.formState;

  const onSubmit = async () => {
    console.log({ loading });
    if (!loading) {
      const { email, password } = form.getValues();
      await loginMutation({
        variables: { loginInput: { email, password } },
        onCompleted: ({ login: data }) => {
          console.log('onCompleted', { data });
          if (data.ok && data?.token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, data.token);
            authTokenVar(data?.token);
            isLoggedInVar(true);
            console.log({ isLoggedIn: isLoggedInVar(), token: authTokenVar() })
            router.push('/users');
          }
        },
        onError: (error: ApolloError) => {
          console.log('error', error.message);
        },
      });
    }
  };

  return (
    <section className="h-screen">
      <div className="container h-full">
        <div className="flex justify-center items-center flex-wrap h-full">
          <div className="form-control sm:w-8/12 lg:w-5/12 lg:ml-20">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <input
                {...form.register('email', {
                  required: 'Email is required',
                  pattern: EMAIL_PATTERN,
                })}
                type="email"
                className="input input-bordered input-primary w-full"
                placeholder="Email address"
                name="email"
                required
              />
              <label className="label">
                {formErrors.email?.message && (
                  <FormError errorMessage={formErrors.email?.message}/>
                )}
                {formErrors.email?.type === 'pattern' && (
                  <FormError errorMessage="Please enter a valid email"/>
                )}
              </label>

              <input
                {...form.register('password', {
                  required: 'Passwrod is requried',
                  minLength: 4,
                })}
                name="password"
                type="password"
                className="input input-bordered input-primary w-full"
                placeholder="Password"
                required
              />
              <label className="label">
                {formErrors.password?.message && (
                  <FormError errorMessage={formErrors.password.message} />
                )}
                {formErrors.password?.type === 'minLength' && (
                  <FormError errorMessage="Password must be more than 10 chars." />
                )}
              </label>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={form.formState.isSubmitting}
              >
                Login
              </button>
              {error && <FormError errorMessage={error.message} />}
              <div className='divider'>OR</div>
              <p className="text-center">
                <Link href="/register" className="font-medium">
                  Have you registered?
                </Link>
              </p>
              <div>{JSON.stringify(data, null, 4)}</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
