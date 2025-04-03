import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import ShimmerButton from './magicui/shimmer-btn';

interface UserData {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string;
    company?: string;
    blog?: string;
    location?: string;
    email?: string;
    bio?: string;
    followers?: number;
    following?: number;
}

interface ProfileComponentProps {
    userData: UserData;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ userData }) => {
    return (
        <Box className='bg-[var(--color-bg-primary)] rounded-[2rem] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] p-6 md:h-[378px] md:max-w-[400px] w-full mx-auto sm:mx-0 max-w-[500px] sm:w-full my-4'>
            <Box className='flex items-center justify-start gap-8 mb-4' >
                <Image priority src={userData.avatar_url} alt={`${userData.name}'s avatar`} width={32} height={32} className="rounded-full w-32 h-32 " />
                <Box className='flex flex-col gap-1 ' >
                    <Typography variant="h6">{userData.name}</Typography>
                    <Typography sx={{ fontSize: '14px' }}>@{userData.login.toLocaleLowerCase()}</Typography>
                    {userData.company && (
                        <Typography sx={{ fontSize: '14px' }}>
                            <CorporateFareRoundedIcon fontSize='small' />{' '}{userData.company.toLocaleLowerCase()}
                        </Typography>
                    )}

                    <Link href={userData.html_url} target="_blank" rel="noopener noreferrer" >
                        <ShimmerButton
                            // variant="contained"
                            className="normal-case mt-2 px-4 py-2"
                        // sx={{
                        //     width: "100px",
                        //     fontSize: "15px",
                        //     background: '#003140',
                        //     color: '#fff',
                        //     textTransform: 'none', // Normal case
                        //     marginTop: '8px', // mt-2 equivalent
                        //     paddingX: '8px', // px-2 equivalent
                        //     paddingY: '4px', // py-1 equivalent
                        //     '&:hover': {
                        //       backgroundColor: '#003140', // Maintain the same color
                        //       opacity: 0.9, // Set opacity to 0.8 on hover
                        //     },
                        //   }}
                        >
                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                                Follow
                            </span>
                        </ShimmerButton>
                    </Link>
                </Box>
            </Box>
            {userData.bio && (
                <Typography sx={{ marginBottom: '1rem', fontSize: '14px' }}>
                    {userData.bio}
                </Typography>
            )}
            <Box className='flex flex-col gap-1.5 items-start text-[14px]' >
                {userData.blog && (
                    <Typography sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem', // space-x-1 equivalent 
                        fontSize: '14px'
                    }}>
                        <LanguageRoundedIcon fontSize='small' />
                        <Link target='_blank' rel="noopener noreferrer" href={userData.blog}>
                            {userData.blog}
                        </Link>
                    </Typography>
                )}
                {userData.location && (
                    <Typography sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem', // space-x-1 equivalent 
                        fontSize: '14px'
                    }}>
                        <RoomOutlinedIcon fontSize='small' className='mr-1' />{userData.location}
                    </Typography>
                )}
                {userData.email && (
                    <Link href={`mailto:${userData.email}`} target='_blank' rel="noopener noreferrer"  >
                        <Typography sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem', // space-x-1 equivalent 
                            fontSize: '14px'
                        }}>
                            <MailOutlineRoundedIcon fontSize='small' className='mr-1' />{userData.email}
                        </Typography>
                    </Link>
                )}
                <Box className='flex items-start justify-center gap-2' >
                    <PeopleOutlineRoundedIcon fontSize='small' />
                    <Typography sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem', // space-x-1 equivalent 
                        fontSize: '14px'
                    }}>
                        {userData.followers} Followers ·
                    </Typography>
                    <Typography sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem', // space-x-1 equivalent 
                        fontSize: '14px'
                    }}>
                        {userData.following} Following
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileComponent;