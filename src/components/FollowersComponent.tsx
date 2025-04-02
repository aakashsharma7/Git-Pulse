"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface FollowerData {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface FollowersComponentProps {
  followersData: FollowerData[];
}

const Notification: React.FC<FollowerData> = ({ login, avatar_url, html_url }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl py-2 px-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-[var(--color-bg-secondary)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-[var(--color-bg-secondary)] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <Image height={40} width={40} src={avatar_url} alt={`${login}'s avatar`} className="rounded-full w-10 h-10" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-[14px] font-medium  ">
            <Typography sx={{ fontSize: '16px' }}>@{login}</Typography>
          </figcaption>
          <Link href={html_url} target="_blank">
            <Typography sx={{ fontSize: '12px' }}>{html_url}</Typography>
          </Link>
        </div>
      </div>
    </figure>
  );
};

export default function AnimatedListDemo({ followersData }: FollowersComponentProps) {
  // Showing only the 10 most recent followers
  const recentFollowers = followersData.slice(-10);
  return (
    <Box className="relative bg-[var(--color-bg-primary)] pb-2 rounded-[2rem] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] p-4 md:max-w-[400px] w-full h-[500px] md:h-[430px] mx-auto sm:mx-0 max-w-[500px] sm:w-full my-4">
      <Typography className="text-lg mb-2 font-semibold">Recent Followers</Typography>
      <Box className="h-[430px] md:h-[360px] overflow-auto">
      {recentFollowers.length > 0 ? (
        <AnimatedList>
          {recentFollowers.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      ) : (
        <Typography className="text-center text-lg">No followers found</Typography>
      )}
      </Box>
    </Box>
  );
}
