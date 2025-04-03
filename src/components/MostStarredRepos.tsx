'use client'
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RepoOwner {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface Repo {
  id: number;
  name: string;
  full_name: string;
  owner: RepoOwner;
  html_url: string;
  stargazers_count: number;
}

interface ReposComponentProps {
  reposData: Repo[];
}

const MostStarredRepos: React.FC<ReposComponentProps> = ({ reposData }) => {
  const topStarredRepos = reposData.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 10);

  const data = {
    labels: topStarredRepos.map(repo => repo.name),
    datasets: [
      {
        label: 'Stars',
        data: topStarredRepos.map(repo => repo.stargazers_count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      className='bg-[var(--color-bg-primary)] z-[100] rounded-[2rem] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] p-6  md:h-[450px] w-full mx-auto sm:mx-0 max-w-[800px] sm:w-full my-4'
    >
      <Typography sx={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Most Starred Repositories
      </Typography>
      <Box style={{ height: '300px' }} className=' flex items-center justify-center ' >
        <Bar data={data} />
      </Box>
    </Box>
  );
};

export default MostStarredRepos;
