import { Avatar, Box, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import DataObjectIcon from '@mui/icons-material/DataObject';
import SummarizeIcon from '@mui/icons-material/Summarize';

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
    language?: string;
    description?: string;
    stargazers_count:number;
    default_branch:string;
}

interface ReposComponentProps {
    reposData: Repo[];
}

const ReposComponent: React.FC<ReposComponentProps> = ({ reposData }) => {
    const sortedRepos = reposData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const recentRepos = sortedRepos.slice(0, 9);
    return (
        <Box
            className='m-6'
        >
            <Grid container spacing={2}>
                {recentRepos?.map((repo) => (
                    <Grid item xs={12} sm={6} md={4} key={repo.id}>
                        <Link href={repo.html_url} target='_blank'>
                        <Box className='flex items-start relative overflow-hidden justify-center flex-col gap-2 mb-4 h-[150px] bg-[var(--color-bg-primary)] rounded-[2rem] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] p-8'>
                        <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-purple-600 to-blue-600" />
                            <Box>
                                <Box className='text-[15px] flex items-center gap-1 font-semibold '>
                                <SummarizeIcon fontSize='small'/> {repo.name}
                                </Box>
                                {repo.description && <Typography className='text-[12px] mt-1 ' >
                                    {repo.description.slice(0,64)}...
                                </Typography>}

                            </Box>
                            <Box className='flex items-start gap-2' >
                                {repo.language && <Typography className='text-[14px]' >
                                    ·{repo.language} |
                                </Typography>}
                                <Box className='flex items-center  gap-1' ><StarOutlineRoundedIcon fontSize='small' /> {repo.stargazers_count} </Box>
                                <Box className='flex items-center gap-1' ><DataObjectIcon fontSize='small' /> {repo.default_branch} </Box>  
                            </Box>
                        </Box>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ReposComponent;