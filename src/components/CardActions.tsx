import { useState } from "react";
import { Download, Share2, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { Box, Button } from "@mui/material";

interface CardActionsProps {
  cardRef: React.RefObject<HTMLDivElement>;
  username: string;
}

export function CardActions({ cardRef, username }: CardActionsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  

  const downloadCard = async () => {
    if (!cardRef.current) return;
  
    setIsDownloading(true);
    try {
      // Wait for images to load
      const images = cardRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve, reject) => {
              if (img.complete) {
                resolve(true);
              } else {
                img.onload = () => resolve(true);
                img.onerror = () => reject(new Error("Image failed to load"));
              }
            })
        )
      );
  
      // Detect device type and adjust pixel ratio
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIPhone = /iPhone/i.test(navigator.userAgent);
      const isMobile = isAndroid || isIPhone;
      const pixelRatio = isMobile ? 1 : 2; // Lower resolution for mobile devices
  
      // Generate the card image
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio,
      });
  
      // Trigger download
      const link = document.createElement("a");
      link.download = `gitpulse-card-${username}.png`;
      link.href = dataUrl;
      link.click();
  
      toast.success("Card downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download card");
    } finally {
      setIsDownloading(false);
    }
  };
  
  

  const shareCard = async () => {
    if (!cardRef.current) return;
  
    setIsSharing(true);
    try {
      // Wait for images to load
      const images = cardRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve, reject) => {
              if (img.complete) {
                resolve(true);
              } else {
                img.onload = () => resolve(true);
                img.onerror = () => reject(new Error("Image failed to load"));
              }
            })
        )
      );
  
      // Detect mobile and adjust pixel ratio
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIPhone = /iPhone/i.test(navigator.userAgent);
      const isMobile = isAndroid || isIPhone;
      const pixelRatio = isMobile ? 1 : 2;
  
      // Generate the card image
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio,
      });
  
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `github-card-${username}.png`, {
        type: "image/png",
      });
  
      // Check if sharing with files is supported
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `GitHub Card - ${username}`,
          text: "Check out my GitHub stats created with Gitpulse!",
          files: [file], // Include file here
        });
        toast.success("Card shared successfully!");
      } else {
        // Fallback for unsupported sharing with files
        const fallbackLink = document.createElement("a");
        fallbackLink.download = `gitpulse-card-${username}.png`;
        fallbackLink.href = dataUrl;
        fallbackLink.click();
        toast.info("Sharing with files is not supported; Image downloaded instead.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to share card");
    } finally {
      setIsSharing(false);
    }
  };  

  return (
    <Box className="flex mb-1 gap-1">
      {/* Download Button */}
      <Button
        onClick={downloadCard}
        className="normal-case text-blue-600"
        disabled={isDownloading}
      >
        {isDownloading ? (
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
        ) : (
          <Download className="w-4 mr-1 h-4" />
        )}
        Download
      </Button>

      {/* Share Button */}
      <Button
        onClick={shareCard}
        className="normal-case text-blue-600"
        disabled={isSharing}
      >
        {isSharing ? (
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
        ) : (
          <Share2 className="w-4 mr-1 h-4" />
        )}
        Share
      </Button>
    </Box>
  );
}
