'use client';
import { useGoogleAuthQuery } from '@/generated';
import { useSearchParams } from 'next/navigation'

//localhost:3000/auth/google?code=4%2F0AZEOvhUzd0GT7PBLtn3AdZl6sB7rxw4hAdLhzkgTgiTuD53Eo-kCURc1pBRNB43UTaFxHw&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent

export default function AuthPage() {
  const params = useSearchParams();
  const code = params.get('code');

  const { error } = useGoogleAuthQuery({
    onCompleted: () => {
      window.close();
    },
    variables: { input: { code }}
  });

  if (!code) {
    return <div>No code</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return <p>Google auth</p>;
}