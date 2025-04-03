'use client';
import React, { useRef } from 'react'
import { GithubCard } from './GithubCard';
import { CardActions } from './CardActions';
import { Box, Typography } from '@mui/material';

interface GitpulseCardProps {
  userData: any;
  reposData: any;
}

const GitpulseCard: React.FC<GitpulseCardProps> = ({userData,reposData}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const fetchUserStats= (reposData:any) => {

    const stats = {
      stars: 0,
      forks: 0,
      repos: reposData.length,
    };
  
    const languageMap = new Map();
    let totalSize = 0;
  
    for (const repo of reposData) {
      stats.stars += repo.stargazers_count;
      stats.forks += repo.forks_count;
  
      if (repo.language) {
        const currentSize = languageMap.get(repo.language) || 0;
        languageMap.set(repo.language, currentSize + repo.size);
        totalSize += repo.size;
      }
    }
  
    const languageColors: Record<string, string> = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      Ruby: "#701516",
      PHP: "#4F5D95",
      CSS: "#563d7c",
      HTML: "#e34c26",
      Go: "#00ADD8",
      Rust: "#dea584",
      Swift: "#ffac45",
      Kotlin: "#A97BFF",
      Dart: "#00B4AB",
    };
  
    const languages = Array.from(languageMap.entries())
      .map(([name, size]) => ({
        name,
        percentage: (size / totalSize) * 100,
        color: languageColors[name] || "#8B8B8B",
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
  
    return { stats, languages };
  }

  const { stats, languages } = fetchUserStats(reposData);
  
  return (
    <Box className='bg-[var(--color-bg-secondary)] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] relative rounded-[2rem] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] overflow-hidden md:max-w-[600px] w-full mx-auto sm:mx-0 max-w-[600px] sm:w-full my-4'>
      {userData && reposData && (
        <>
        <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-purple-600 to-blue-600" />
        <Typography className="text-lg  my-1 font-mono text-center font-normal">{userData.login}&apos;s Gitpulse Card</Typography>
            <div className="flex justify-center">
              <div className="overflow-x-auto">
                <GithubCard
                  ref={cardRef}
                  user={userData}
                  stats={stats}
                  languages={languages}
                />
                <div className="flex justify-center mt-2">
              <CardActions cardRef={cardRef} username={userData.login} />
            </div>
              </div>
            </div>
          </>
        )}
    </Box>
  )
}

export default GitpulseCard
