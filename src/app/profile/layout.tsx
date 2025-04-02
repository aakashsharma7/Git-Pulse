import { FunctionComponent, PropsWithChildren } from 'react';
import { Metadata } from 'next';
import '../index.css';


export const metadata: Metadata = {
  title: {
    default: `Developer's Profile`,
    template: `%s | GitPulse`,
  },
  description: "Developer's Github Profile to share it with everyone!",
};

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default RootLayout;