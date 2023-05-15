'use client';
import { LoginInput } from '@/__generated__/graphql';
import { EMAIL_PATTERN } from '@/common/common.constants';
import { FormError } from '@/components/FormError';
import { LOGIN_MUTATION } from '@/graphql/mutation';
import { ApolloError, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface ILoginForm extends LoginInput {}

export default function LoginPage() {
  const [loginMutation, loginMutationResult] = useMutation(LOGIN_MUTATION);
  const { loading, error, data } = loginMutationResult;

  const form = useForm<ILoginForm>({
    mode: 'onChange',
    defaultValues: {},
  });

  console.log({ error, data });

  const { errors: formErrors } = form.formState;

  const onSubmit = async () => {
    console.log({ loading });
    if (!loading) {
      const { email, password } = form.getValues();
      await loginMutation({
        variables: { loginInput: { email, password } },
        onCompleted: ({ login: data }) => {
          console.log('onCompleeed');
          if (data?.token) {
            console.log({ token: data.token });
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
                Register
              </button>
              {error && <FormError errorMessage={error.message} />}
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">OR</p>
              </div>
              <p className="text-center">
                <Link href="/login" className="font-medium">
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
