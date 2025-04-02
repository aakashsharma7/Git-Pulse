import ProfileComponent from '@/components/ProfileComponent';
import AnimatedListDemo from '@/components/FollowersComponent';
import ReposComponent from '@/components/ReposComponent';
import LanguageChart from '@/components/LanguageChart';
import StartperLanguage from '@/components/StartperLanguage';
import MostStarredRepos from '@/components/MostStarredRepos';
import MostForkedRepos from '@/components/MostForkedRepos';
import Footer from '@/components/Footer';
import { Box, Typography } from '@mui/material';
import { env } from 'process';
import React from 'react';
import Link from 'next/link';
import GitpulseCard from '@/components/GitpulseCard';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { GitHubAnalyzer } from '@/components/GitHubAnalyzer';

interface PageProps {
  params: {
    username: string;
  };
}

const token = env.GITHUB_ACCESS_TOKEN;

const UserProfilePage: React.FC<PageProps> = async ({ params }) => {
  let userData = null;
  let followersData = null;
  let ReposData = null;
  let error = null;

  try {
    const res = await fetch(`https://api.github.com/users/${params.username}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const res2 = await fetch(`https://api.github.com/rate_limit`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    const res3 = await fetch(`https://api.github.com/users/${params.username}/followers`, {
      headers: {
        'Authorization': `Bearer ${token}`,

      }
    });
    const res4 = await fetch(`https://api.github.com/users/${params.username}/repos`, {
      headers: {
        'Authorization': `Bearer ${token}`,

      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    userData = await res.json();
    followersData = await res3.json()
    ReposData = await res4.json()
  } catch (err) {
    console.log(err);
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  if (!userData) {
    return (
      <Box className='flex items-center gap-3 flex-col font-bold justify-center mt-10'>
    <Typography  >Username &apos;{params.username}&apos; does not Exist</Typography>
    <Link href={'/'} >Back to home</Link>
    </Box>
  );
  }

  return (
    <>
    <Box className="fixed inset-0 z-0">
    <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    </Box>
      <Box className='flex flex-col lg:flex-row gap-0 mx-4 lg:gap-4 justify-center items-center ' >
        {/* <ProfileComponent userData={userData} /> */}
        <GitpulseCard userData={userData} reposData={ReposData}/>
        {followersData.length !== 0 && <AnimatedListDemo followersData={followersData} />}
      </Box>
      <Box className='flex gap-3 flex-col mx-4 my-3 lg:flex-row items-center justify-center  ' >
    <GitHubAnalyzer username={params.username} />
      </Box>
      <Box className='flex gap-3 flex-col mx-4 lg:flex-row items-center justify-center  ' >
        <LanguageChart reposData={ReposData} />
        <MostStarredRepos reposData={ReposData} />
        {/* <MostForkedRepos reposData={ReposData} /> */}
      </Box>
      <Box className='flex gap-3 flex-col mx-4 lg:flex-row items-center justify-center  ' >
        {/* <MostStarredRepos reposData={ReposData} /> */}
        <MostForkedRepos reposData={ReposData} />
        <StartperLanguage reposData={ReposData} />
      </Box>
      <ReposComponent reposData={ReposData} />
      {/* <Meteors number={30} /> */}
    </>
  );
};

export default UserProfilePage;