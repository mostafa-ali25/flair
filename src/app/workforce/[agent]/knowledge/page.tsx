"use client"
import { PlusSquareIcon, SendIcon, Trash2Icon } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { GoogleDriveIcon, OneDriveIcon, EmojiesIcon, AttachmentsIcon, LinkIcon } from '@/components/icons/icons';
import { LinkPreviewArea } from '@/components/custom/link-preview-area';
interface CloudStorageState {
  google: boolean;
  onedrive: boolean;
}

export default function AgentKnowledge() {
  const [showAttachments, setShowAttachments] = useState(false);
  const [showLink, setShowLink ] = useState(false);
 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [instructions, setInstructions] = useState('');
  const [cloudConnected, setCloudConnected] = useState<CloudStorageState>({
    google: false,
    onedrive: false
  });
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "user",
      content:
        "Can you share your strategy for boosting sales performance this quarter?",
      timestamp: "Today, 14:39",
    },
    {
      sender: "agent",
      content:
        "Absolutely! I'm focusing on optimizing our lead conversion process, strengthening client relationships, and refining our sales pitch based on market insights.",
      timestamp: "Today, 14:39",
    },
  ]);



 
  const [linkPreview, setLinkPreview] = useState<{ url: string, title: string } | null>(null);
 
   const handleAddLink = (url: string, title: string) => {
     setLinkPreview({ url, title });
     // In a real application, you would insert the link into your content
     console.log("Link added:", { url, title });
   };

   


  useEffect(() => {
    checkCloudConnections();
  }, []);

  const checkCloudConnections = async () => {
    try {
      // Check Google Drive connection
      const googleToken = localStorage.getItem('googleDriveToken');
      // Check OneDrive connection
      const onedriveToken = localStorage.getItem('onedriveToken');

      setCloudConnected({
        google: !!googleToken,
        onedrive: !!onedriveToken
      });
    } catch (error) {
      console.error('Error checking cloud connections:', error);
    }
  };

  const handleGoogleDriveConnect = async () => {
    try {
      // Initialize Google OAuth flow
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const redirectUri = window.location.origin + '/google-callback';
      const scope = 'https://www.googleapis.com/auth/drive.file';

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;

      window.location.href = authUrl;
    } catch (error) {
      console.error('Error connecting to Google Drive:', error);
    }
  };

  const handleOneDriveConnect = async () => {
    try {
      // Initialize OneDrive OAuth flow
      const clientId = process.env.ONEDRIVE_CLIENT_ID;
      const redirectUri = window.location.origin + '/onedrive-callback';
      const scope = 'files.readwrite';

      const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;

      window.location.href = authUrl;
    } catch (error) {
      console.error('Error connecting to OneDrive:', error);
    }
  };

  // File data for mapping
  const [files, setFiles] = useState([
    { name: "file-name.pdf" },
    { name: "file-name_2.pdf" },
    { name: "file-name_4.pdf" },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(file => ({
        name: file.name
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDeleteFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    setShowAttachments(false);
    fileInputRef.current?.click();
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setIsSending(true);

    // Add the new message to the chat
    const newMessage = {
      sender: "user",
      content: message,
      timestamp: "Just now",
    };

    setMessages([...messages, newMessage]);

    // Clear the input field
    setMessage("");

    // Simulate a response after a short delay
    setTimeout(() => {
      const response = {
        sender: "agent",
        content: "Thank you for your message. I'll get back to you shortly.",
        timestamp: "Just now",
      };

      setMessages(prev => [...prev, response]);
      setIsSending(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const commonEmojis = [
    "😊", "👍", "🙏", "👋", "🔥",
    "❤️", "😂", "🎉", "👏", "🤔",
    "👀", "✅", "⭐", "🚀", "💯"
  ];
  // Chat messages data
  const chatMessages = [
    {
      sender: "user",
      content:
        "Can you share your strategy for boosting sales performance this quarter?",
      timestamp: "Today, 14:39",
    },
    {
      sender: "agent",
      content:
        "Absolutely! I'm focusing on optimizing our lead conversion process, strengthening client relationships, and refining our sales pitch based on market insights.",
      timestamp: "Today, 14:39",
    },
  ];

  return (
    <main className="flex flex-col flex-1 p-3 ">
      <div className="flex items-center gap-3 h-full">
        {/* Main area */}

        <Card className="flex flex-col items-start flex-1 self-stretch overflow-hidden">
          <CardHeader className="h-16 flex flex-row items-center justify-between w-full px-4 py-3 space-y-0">
            <div className="flex flex-col">
              <h2 className="font-title-2 text-neutral-950  ">
                Knowledge
              </h2>
              <p className="font-body-3 text-neutral-800 ">
                Your agent learns from your prompt, documents and links
              </p>
            </div>
            <Button className=" bg-neutral-950 text-white mt-1 rounded-lg ">
              Save changes
            </Button>
          </CardHeader>

          <Separator className="w-full" />

          <CardContent className="flex flex-col items-end justify-end flex-1 w-full gap-3 px-4 py-3">
            <div className="flex flex-col items-start gap-1 w-full flex-1">
              <div className="relative flex flex-col items-start gap-2 pt-2 pb-3 px-3 w-full flex-1 rounded-lg border border-solid border-[#e6e6e7]">
                <Textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Write instructions to your agent..."
                  className="w-full min-h-[100px] flex-1 bg-transparent border-none font-body-3 text-neutral-800 resize-none focus:outline-none"
                />

                <div className={`absolute h-[178px]  bottom-[70px] shadow-123 ${!showAttachments && 'hidden'}`}>
                  <Card className="flex flex-col w-[320px] items-start justify-center gap-1 py-3 border border-solid border-[#e6e6e7]">
                    <div
                      className={`flex h-10 items-center gap-2 px-5 py-2 w-full rounded-xl cursor-pointer hover:bg-neutral-50 ${cloudConnected.google ? 'text-primary-500' : ''}`}
                      onClick={cloudConnected.google ? () => { } : handleGoogleDriveConnect}
                    >
                      <GoogleDriveIcon />
                      <span className="font-body-3 text-neutral-950">
                        {cloudConnected.google ? 'Upload from Google Drive' : 'Connect to Google Drive'}
                      </span>
                    </div>

                    <div
                      className={`flex h-10 items-center gap-2 px-5 py-2 w-full rounded-xl cursor-pointer hover:bg-neutral-50 ${cloudConnected.onedrive ? 'text-primary-500' : ''}`}
                      onClick={cloudConnected.onedrive ? () => { } : handleOneDriveConnect}
                    >
                      <OneDriveIcon />
                      <span className="font-body-3 text-neutral-950 ">
                        {cloudConnected.onedrive ? 'Upload from OneDrive' : 'Connect to OneDrive'}
                      </span>
                    </div>

                    <Separator className="w-full my-3" />

                    <div
                      className="flex h-10 items-center gap-2 px-5 py-2 w-full rounded-xl cursor-pointer hover:bg-neutral-50"
                      onClick={handleUploadClick}
                    >
                      <PlusSquareIcon className="w-5 h-5" />
                      <div className="flex flex-col items-start mt-[-7.50px] mb-[-7.50px] mr-[-4.00px]">
                        <span className="font-body-3 text-neutral-950   ">
                          Upload from your computer
                        </span>
                        <span className="font-body-4 text-neutral-400 ">
                          (could be .pdf format maximum 100MB)
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      multiple
                      accept=".pdf"
                    />
                  </Card>
                </div>

 



                <div className={`absolute bottom-[70px] rounded-lg border border-solid border-[#e6e6e7]  w-full ${!showLink && 'hidden'}`}>  
                 <LinkPreviewArea />
                </div>


                























                <div className="inline-flex items-start gap-2">
                <div className={"inline-flex items-center justify-center gap-1 pl-1 pr-4 py-1  rounded border border-solid  hover:border-[#4c4fff] hover:bg-primary-100 cursor-pointer"  + ` ${ showAttachments ? 'border-[#4c4fff] bg-[#EBF1FF]' : 'bg-whites border-[#e6e6e7]'} ` }
                    onClick={() => setShowAttachments(!showAttachments)}>
                    <div className="p-2 inline-flex items-center gap-2.5 rounded-xl">
                      <AttachmentsIcon />
                    </div>
                    <div className="inline-flex flex-col items-start">
                      <span className="font-body-3 text-neutral-950">
                        Attachments
                      </span>
                    </div>
                  </div>

                  <div className={"inline-flex items-center justify-center gap-1 pl-1 pr-4 py-1  rounded border border-solid  hover:border-[#4c4fff] hover:bg-primary-100 cursor-pointer"  + ` ${ showLink ? 'border-[#4c4fff] bg-[#EBF1FF]' : 'bg-whites border-[#e6e6e7]'} ` }
                    onClick={() => setShowLink(!showLink)}>
                    <div className="p-2  inline-flex items-center gap-2.5 rounded-xl">
                      <LinkIcon />
                    </div>
                    <div className="inline-flex flex-col items-start">
                      <span className="font-body-3 text-neutral-950">
                        Link
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 w-full">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex h-14 items-center gap-3 px-3 py-0 flex-1 bg-neutral-50 rounded-lg overflow-hidden"
                  >
                    <span className="flex-1 font-title-3 text-neutral-950  truncate  ">
                      {file.name}
                    </span>
                    <Trash2Icon
                      className="w-5 h-5 cursor-pointer hover:text-red-500"
                      onClick={() => handleDeleteFile(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat area */}
        <Card className="flex flex-col w-[375px] items-start self-stretch overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 w-full">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/ellipse-1.svg" alt="CRM Zendesk" />
              <AvatarFallback>CZ</AvatarFallback>
            </Avatar>
            <span className="font-title-3 text-neutral-950 ">
              CRM Zendesk
            </span>
          </div>

          <Separator className="w-full" />

          <div className="flex flex-col items-end gap-5 px-4 py-3 flex-1 w-full">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${message.sender === "user" ? "items-end pl-8 pr-0" : "items-start pl-0 pr-8"} justify-center w-full`}
              >
                <div
                  className={`flex flex-col items-start gap-2 p-3 w-full ${message.sender === "user"
                    ? "bg-neutral-50 rounded-lg"
                    : "bg-neutral-950 rounded-lg"
                    }`}
                >
                  <p
                    className={`font-body-3 ${message.sender === "user"
                      ? "text-neutral-950"
                      : "text-neutral-50"
                      } `}
                  >
                    {message.content}
                  </p>
                  <span
                    className={`font-body-4 ${message.sender === "user"
                      ? "text-neutral-500"
                      : "text-neutral-300"
                      }  `}
                  >
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Separator className="w-full" />

          <div className="flex items-center gap-2 px-4 py-3 w-full">
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <div className="p-2 inline-flex items-center gap-2.5 rounded-xl cursor-pointer hover:bg-neutral-100">
                  <EmojiesIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2">
                <div className="grid grid-cols-5 gap-2">
                  {commonEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      className="text-xl p-2 hover:bg-neutral-100 rounded cursor-pointer"
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Chat with CRM Zendesk..."
              className="flex-1 border-none bg-transparent font-body-3 text-neutral-950 focus:ring-0 focus:outline-none"
            />
            <Button
              variant="outline"
              className="p-3 bg-neutral-50 border border-solid border-white rounded-xl"
              onClick={handleSendMessage}
              disabled={isSending || !message.trim()}
            >
              <SendIcon className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
};