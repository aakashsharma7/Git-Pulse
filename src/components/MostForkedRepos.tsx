'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

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
  forks_count: number;
}

interface ReposComponentProps {
  reposData: Repo[];
}

const MostForkedRepos: React.FC<ReposComponentProps> = ({ reposData }) => {
  const topForkedRepos = reposData.sort((a, b) => b.forks_count - a.forks_count).slice(0, 10);

  const data = {
    labels: topForkedRepos.map(repo => repo.name),
    datasets: [
      {
        label: 'Forks',
        data: topForkedRepos.map(repo => repo.forks_count),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  };

  return (
    <Box
      className='bg-[var(--color-bg-primary)] z-[100] rounded-[2rem] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] p-6  md:h-[450px] w-full mx-auto sm:mx-0 max-w-[800px] sm:w-full my-4'
    >
      <Typography sx={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Most Forked Repositories
      </Typography>
      <Box style={{ height: '300px' }} className=' flex items-center justify-center ' >
        <Line data={data} />
      </Box>
    </Box>
  );
};

export default MostForkedRepos;