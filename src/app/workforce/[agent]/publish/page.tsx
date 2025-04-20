'use client';
import { CopyIcon, ExternalLinkIcon } from 'lucide-react';
import React, { useState, useEffect } from "react";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast'; // Import use-toast

export default function publishPage() {
  const router = useRouter();
  const { toast } = useToast(); // Initialize toast

  // State to track the switches' states
  const [isPublic, setIsPublic] = useState(false);
  const [isCopilotPublic, setIsCopilotPublic] = useState(false);

  // Function to copy the link to the clipboard
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: 'Success',
      description: 'Link copied to clipboard!',
    });
  };

  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const socials = [
    {
      name: 'Facebook',
      icon: '/images/social-media/facebook.svg',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'X',
      icon: '/images/social-media/x-logo.svg',
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=Check%20out%20this%20awesome%20AI%20agent`
    },
    {
      name: 'Instagram',
      icon: '/images/social-media/instagram.svg',
      shareUrl: `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`, // Instagram doesn't support direct sharing
      isMobile: true
    },
    {
      name: 'LinkedIn',
      icon: '/images/social-media/linkedin.svg',
      shareUrl: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}&title=AI%20Agent`
    },
    {
      name: 'WhatsApp',
      icon: '/images/social-media/WhatsApp.svg',
      shareUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}&data-action="share/whatsapp/share"`
    }
  ];

  const handleShare = (platform: typeof socials[number]) => {
    if (platform.name === 'Instagram') {
      // Instagram requires special handling
      if (navigator.share) {
        // Use Web Share API on mobile
        navigator.share({
          title: 'Check out this AI Agent',
          url: currentUrl
        });
      } else {
        // Fallback for desktop
        window.open(`https://www.instagram.com/create/story?url=${encodeURIComponent(currentUrl)}`, '_blank');
      }
    } else {
      window.open(platform.shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className="flex flex-col flex-1 p-3 gap-3">
      {/* Main content */}
      <Card className="flex flex-col flex-1 rounded-xl overflow-hidden overflow-y-auto">
        <CardHeader className="flex flex-row items-start px-4 py-3">
          <div className="flex flex-col">
            <h1 className="font-title-2 text-neutral-950">Publish</h1>
            <p className="font-body-3 text-neutral-800">
              Publish your agent for public use
            </p>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col gap-6 p-3">
          {/* Publish on webapp section */}
          <div className="flex flex-col gap-4 p-4 bg-white rounded-lg border-2 border-neutral-100 max-w-[660px]">
            <div className="flex items-center justify-between">
              <h2 className="font-title-2 text-neutral-950">
                Publish on webapp
              </h2>
              <div className="flex items-center gap-2">
                <span className="font-body-3 text-neutral-800">
                  Public Link
                </span>
                <Switch
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(checked)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-body-3 text-neutral-800">SHARE LINK</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${isPublic
                    ? 'bg-green-100 text-green-600'
                    : 'bg-blue-100 text-blue-600'
                    }`}
                >
                  {isPublic ? 'Public Agent' : 'Private Agent'}
                </span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 px-3 py-2 bg-neutral-50 rounded-lg font-body-3 text-neutral-600">
                  https://bot.flair.com/id3423423424gjkfjkres22121
                </div>
                <Button
                  className="bg-[#F15A24] text-white hover:bg-[#D94E1F]"
                  onClick={() =>
                    handleCopyLink(
                      'https://bot.flair.com/id3423423424gjkfjkres22121'
                    )
                  }
                >
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>

          {/* Publish on Copilot section */}
          <div className="flex flex-col gap-4 p-4 bg-white rounded-lg border-2 border-neutral-100 max-w-[660px]">
            <div className="flex items-center justify-between">
              <h2 className="font-title-2 text-neutral-950">
                Publish on Copilot
              </h2>
              <div className="flex items-center gap-2">
                <span className="font-body-3 text-neutral-800">
                  Public Link
                </span>
                <Switch
                  checked={isCopilotPublic}
                  onCheckedChange={(checked) => setIsCopilotPublic(checked)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-body-3 text-neutral-800">
                  CO-PILOT LINK
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm ${isCopilotPublic
                    ? 'bg-green-100 text-green-600'
                    : 'bg-blue-100 text-blue-600'
                    }`}
                >
                  {isCopilotPublic ? 'Public Agent' : 'Private Agent'}
                </span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 px-3 py-2 bg-neutral-50 rounded-lg font-body-3 text-neutral-600">
                  https://bot.flair.com/id3423423424gjkfjkre...
                </div>
                <Button
                  className="bg-[#F15A24] text-white hover:bg-[#D94E1F]"
                  onClick={() =>
                    handleCopyLink(
                      'https://bot.flair.com/id3423423424gjkfjkre...'
                    )
                  }
                >
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-200 bg-black text-white hover:bg-neutral-500"
                  onClick={() => window.open('https://flair.com', '_blank')}
                >
                  <ExternalLinkIcon className="w-4 h-4 mr-2" />
                  Open in new Tab
                </Button>
              </div>
            </div>
          </div>

          {/* Share Agent section */}
          <div className="flex flex-col gap-4 p-4 bg-white rounded-lg border-2 border-neutral-100 max-w-[660px]">
            <div className="flex items-center justify-between">
              <h2 className="font-title-2 text-neutral-950">Share Agent</h2>
              <span className="font-body-3 text-neutral-600">
                Share your agent on social media
              </span>
            </div>

            <div className="flex gap-4">
              {socials.map((platform) => (
                <Button
                  key={platform.name}
                  title={`Share on ${platform.name}`}
                  variant="outline"
                  className="p-1 border-neutral-200"
                  size="icon"
                  onClick={() => handleShare(platform)}
                >
                  <img
                    src={platform.icon}
                    alt={`Share on ${platform.name}`}
                    className="w-6 h-6" // Ensure consistent icon sizing
                  />
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
