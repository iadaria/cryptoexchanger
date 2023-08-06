import { ApolloContextProvider } from '@/context/apollo.context';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authorization',
  description: 'Login/register',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ApolloContextProvider>{children}</ApolloContextProvider>
      </body>
    </html>
  );
}
