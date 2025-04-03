'use client'
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

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
  created_at: string;
  language: string;
}

interface ReposComponentProps {
  reposData: Repo[];
}

const LanguageChart: React.FC<ReposComponentProps> = ({ reposData }) => {
  const [languageData, setLanguageData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const languages: { [key: string]: number } = {};
    reposData.forEach((repo) => {
      const language = repo.language;
      if (language) {
        languages[language] = (languages[language] || 0) + 1;
      }
    });
    setLanguageData(languages);
  }, [reposData]);

  const data = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: '# of Repositories',
        data: Object.values(languageData),
        hoverOffset: 4,
        backgroundColor: [
          '#05b1af',
          '#72CCFF',
          '#DA00FF',
          '#9002CA',
          '#2D96FE',
          '#9966FF',
          '#C9CBCF',
          '#FFCE56',
          '#36A2EB',
          '#FFCE56',
        ],
        
        borderColor: [
          '#05b1af',
          '#72CCFF',
          '#DA00FF',
          '#9002CA',
          '#2D96FE',
          '#9966FF',
          '#C9CBCF',
          '#FFCE56',
          '#36A2EB',
          '#FFCE56',
        ],
        
        hoverBackgroundColor: [
          '#05b1af',
          '#72CCFF',
          '#DA00FF',
          '#9002CA',
          '#2D96FE',
          '#9966FF',
          '#C9CBCF',
          '#FFCE56',
          '#36A2EB',
          '#FFCE56',
        ],        
      },
    ],
  };

  return (
    <Box
      className='bg-[var(--color-bg-primary)] z-[100] rounded-[2rem] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] p-6 md:h-[450px] md:max-w-[400px] w-full mx-auto sm:mx-0 max-w-[500px] sm:w-full my-4'
    >
      <Typography sx={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Top Languages
      </Typography>
      <Box className="flex items-center justify-center" >
        <Pie data={data} />
      </Box>
    </Box>
  );
};

export default LanguageChart;