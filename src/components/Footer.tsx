import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";


const Footer = () => {
    return (
        <Box className="bg-[var(--color-bg-primary)] z-[100] absolute left-0 right-0 bottom-4 rounded-[2rem] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] p-4 mt-4 md:max-w-[80%] w-full mx-[auto] my-[0] flex items-center gap-1 justify-center h-15 font-bold">
                <Typography component={'span'} >Made with ❤️ by </Typography>
                <Link href="https://github.com/aakashsharma7" target='_blank' >{' '}Aakash Sharma</Link>
        </Box>
    );
};

export default Footer;
