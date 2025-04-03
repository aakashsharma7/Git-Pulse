'use client';
import { Button, Typography } from '@mui/material';
import { Bot } from 'lucide-react';
import React, { useState } from 'react';
import chillguyImage from '../public/img/chill_guy.png';

interface AnalyzerProps {
  username: string;
}

export function GitHubAnalyzer({ username }: AnalyzerProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeProfile = () => {
    setLoading(true);
    setError(null);
    setAnalysis(''); // Reset analysis state

    const eventSource = new EventSource(`https://be-gitpulse.vercel.app/api/analyze/${username}`);

    eventSource.onmessage = function (event) {
      try {
        const data = JSON.parse(event.data);
        const content = data.content;
        // Append each chunk to the existing analysis text and format it

        // Append each chunk to the existing analysis text and format it
        setAnalysis(prevAnalysis => prevAnalysis + formatText(content) + '\n');
      } catch (error) {
        setLoading(false);
        eventSource.close();
      }
    };

    eventSource.onerror = function (err) {
      console.error('EventSource failed:', err);
      setError('An error occurred while analyzing the profile.');
      setLoading(false);
      eventSource.close();
    };

    eventSource.onopen = function () {
      setLoading(true); // Show loading indicator when streaming starts
    };

    eventSource.addEventListener('done', () => {
      setLoading(false); // Stop loading when the stream ends
      eventSource.close(); // Close the EventSource connection
    });
  };

  // // Helper to append text progressively
  // const appendText = (content: string) => {
  //   if (!content) return; // Skip if content is empty
  //   let i = 0;
  //   const formattedContent = formatText(content); // Format text once before typing effect
  
  //   const typingEffect = setInterval(() => {
  //     if (i < formattedContent.length) {
  //       setAnalysis((prev) => prev + formattedContent[i]);
  //       i++;
  //     } else {
  //       clearInterval(typingEffect);
  //     }
  //   }, 20);
  // };
  
  
  // Helper function to format the text before rendering
  const formatText = (text: string) => {
    if (!text) return ''; // Ensure text is valid
    // Format the content before appending
    text = text.replace(/Chill Score: (\d+\/\d+)/g, '<strong>$&</strong>'); // Bold "Chill Score"
    text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); // Convert **bold** syntax to HTML <b> tag
    text = text.replace(/^\*\s?(.*)$/gm, '<li>$1</li>'); // Convert * code syntax to HTML <li> tag (not <code>)
    text = text.replace(/__(.*?)__/g, '<i>$1</i>'); // Convert __italic__ syntax to HTML <i> tag
    return text;
  };
  

  return (
    <div className="z-[100] [box-shadow:0_0.25rem_0.5rem_rgba(0,_0,_0,_0.15)] md:max-w-[88%] w-full relative p-6 bg-[var(--color-bg-primary)] rounded-[2rem] shadow-lg">
  {/* Left Image */}
  <div className="absolute hidden sm:block left-0 top-1/2 transform -translate-y-1/2 p-4">
  <img
    src={'https://res.cloudinary.com/dywhcxdix/image/upload/v1732869063/q2wmfoqxjyatpeuqqpjh.png'}
    alt="Left Image"
    className="w-28 h-28 transform scale-x-[-1] object-contain"
  />
</div>

  {/* Right Image */}
  <div className="absolute hidden sm:block right-0 top-1/2 transform -translate-y-1/2 p-4">
    <img src={'https://res.cloudinary.com/dywhcxdix/image/upload/v1732869063/q2wmfoqxjyatpeuqqpjh.png'} alt="Right Image" className="w-28 h-28  object-contain" />
  </div>

  <Typography className="text-2xl text-center font-bold mb-4">Github analysis with AI 🤖</Typography>
  
  {!analysis && (
    <Button
      onClick={analyzeProfile}
      disabled={loading}
      className="bg-[#05B1AF] flex items-center justify-center py-3 gap-1 hover:bg-[#279391] text-white mx-auto my-auto normal-case font-medium px-4 rounded-xl disabled:opacity-90"
    >
      {loading ? 'Analyzing...' : 'Analyze Profile'}
      <Bot size={22} />
    </Button>
  )}

  {error && (
    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
      {error}
    </div>
  )}

  {analysis && (
    <div className="mt-6 sm:mx-[5rem] text-center p-4 rounded whitespace-pre-wrap">
      {/* Render the formatted HTML content */}
      <div dangerouslySetInnerHTML={{ __html: analysis }} />
    </div>
  )}
</div>

  );
}
