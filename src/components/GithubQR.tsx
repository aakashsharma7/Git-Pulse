import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

interface QRCodeProps {
  url: string;
  size?: number;
}

export function GitHubQRCode({ url, size = 80 }: QRCodeProps) {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: size,
      margin: 1,
      color: {
        dark: "#1a1a1a",
        light: "#ffffff",
      },
    })
      .then(setQrUrl)
      .catch(console.error);
  }, [url, size]);

  return qrUrl ? (
    <Image
      src={qrUrl}
      alt="GitHub Profile QR Code"
      width={size}
      height={size}
    />
  ) : null;
}