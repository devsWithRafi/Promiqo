'use client';

import { Card, CardContent, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { TbCopy } from 'react-icons/tb';
import { useState } from 'react';
import { RiCheckFill } from 'react-icons/ri';

const ImagePromptBox = ({
  prompt,
  label,
}: {
  prompt: string;
  label?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard');
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="min-h-70 max-h-80 w-full gap-1 relative">
      {label && (
        <span className="absolute aspect-square size-6 top-2 left-2 flex items-center justify-center bg-muted rounded-full">
          {label}
        </span>
      )}
      <CardContent className="overflow-y-auto">
        <CardDescription className="font-mono">{prompt}</CardDescription>
      </CardContent>
      <CardContent className="w-full bg-card p-2 pt-0 absolute bottom-0 flex items-center justify-end text-xs">
        <Button
          onClick={handleCopy}
          className="text-xs rounded-full h-7 px-3 gap-0.5"
        >
          <IsCopied copied={copied} />
        </Button>
      </CardContent>
    </Card>
  );
};

const IsCopied = ({ copied }: { copied: boolean }) => {
  if (copied) {
    return (
      <>
        <RiCheckFill className="text-xs scale-[0.8] m-0" />
        Copied
      </>
    );
  } else {
    return (
      <>
        <TbCopy className="text-xs scale-[0.8] m-0" />
        Copy
      </>
    );
  }
};

export default ImagePromptBox;
