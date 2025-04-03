"use client"
import React, { useContext } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { themeContext } from "@/theme/ThemeProvider";


const Navbar = () => {
    const { theme } = useContext(themeContext) ?? {};
    const imageUrl =
        theme === 'light'
            ? 'https://res.cloudinary.com/dywhcxdix/image/upload/v1718447422/idf0zsys6mlyz9f6dqmd.svg'
            : 'https://res.cloudinary.com/dywhcxdix/image/upload/v1718439235/qzaflvrvcz05spxiy39k.svg';
    const logoUrl =
        theme === 'light'
            ? 'https://res.cloudinary.com/dywhcxdix/image/upload/v1718785342/g8kt9jvb9lfsyspmmkmg.svg'
            : 'https://res.cloudinary.com/dywhcxdix/image/upload/v1718785342/eke0k6ldkoqxq9ghqgrt.svg';

    return (
        <Box className="bg-[var(--color-bg-primary)] z-[100] relative rounded-[2rem] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] p-4 mt-4 md:max-w-[80%] w-full mx-[auto] my-[0] flex items-center justify-between h-15 font-bold ">
                <Link href={'/'} ><Box className='flex justify-center items-center gap-3 ' >
                    <Image priority src={imageUrl} alt="github_icon" height={288} width={288} className="h-[36px] w-[36px] " />
                    <Image priority src={logoUrl} alt="logo" height={64} width={177} className="w-[115px]" />
                </Box></Link>
                <ThemeToggle />
        </Box>
    );
};

export default Navbar;
