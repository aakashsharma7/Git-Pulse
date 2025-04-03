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
  language: string;
  stargazers_count: number;
}

interface ReposComponentProps {
  reposData: Repo[];
}

const StartperLanguage: React.FC<ReposComponentProps> = ({ reposData }) => {
  const [languageData, setLanguageData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const languages: { [key: string]: number } = {};
    reposData.forEach((repo) => {
      const language = repo.language;
      const stars = repo.stargazers_count;
      if (language) {
        languages[language] = (languages[language] || 0) + stars;
      }
    });
    setLanguageData(languages);
  }, [reposData]);

  const totalStars = Object.values(languageData).reduce((a, b) => a + b, 0);

  const data = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: '# of Stars',
        data: Object.values(languageData),
        hoverOffset: 4,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
          '#9966FF',
          '#C9CBCF',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ], // Add more colors if needed
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
          '#9966FF',
          '#C9CBCF',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ], // Should match backgroundColor for the legend colors
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
          '#9966FF',
          '#C9CBCF',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ], // Should match backgroundColor for hover effect
      },
    ],
  };

  return (
    <Box
      className='bg-[var(--color-bg-primary)] z-[100] rounded-[2rem] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] p-6 md:h-[450px] md:max-w-[400px] w-full mx-auto sm:mx-0 max-w-[500px] sm:w-full my-4'
    >
      <Typography sx={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Stars per Language
      </Typography>
      {totalStars > 0 ? (
        <Box  className="flex items-center justify-center">
          <Pie data={data} />
        </Box>
      ) : (
        <Typography sx={{ fontSize: '1rem', color: 'gray', textAlign: 'center', marginTop: '2rem' }}>
          No Stars available in the Repos!
        </Typography>
      )}
    </Box>
  );
};

export default StartperLanguage;