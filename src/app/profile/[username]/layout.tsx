import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { FunctionComponent, PropsWithChildren } from 'react';

interface ProfilePageProps {
  params: { username: string };
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = params;

  return {
    title: `${username}'s Profile`,
    description: `Check out ${username}'s GitHub profile!`,
    openGraph: {
      title: `${username}'s Profile | GitPulse`,
      description: `Explore ${username}'s GitHub profile, followers, and projects.`,
      url: `https://github.com/aakashsharma7/${username}`,
      siteName: "GitPulse",
      images: [
        {
          url: `https://github.com/aakashsharma7/${username}`, // Dynamic OG image endpoint
          width: 1200,
          height: 630,
          alt: `${username}'s GitHub Profile Card`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${username}'s Profile | GitPulse`,
      description: `Check out ${username}'s GitHub profile!`,
      images: [
        `https://github.com/aakashsharma7/${username}`, // Dynamic OG image endpoint
      ],
    },
  };
}

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <>{children}</>;
  };
  
export default RootLayout;
