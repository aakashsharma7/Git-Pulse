import { NextPage } from 'next';
import { Box } from '@mui/material';
import GithubUsernameInput from '../../components/GithubUsernameInput';
import "../index.css";
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';

/**
 * Main page of the Application
 * @page Home
 */
const Home: NextPage = () => {
  return (
   <Box>
    <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    <GithubUsernameInput/>
    <Footer/>
   </Box>
  );
};

export default Home;
