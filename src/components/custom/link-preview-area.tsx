import { GlobeIcon, PaperclipIcon, Trash2Icon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; 

interface LinkPreview {
  title: string;
  description: string;
  image: string;
}

export function LinkPreviewArea() {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState<LinkPreview | null>(null);

  const handleUrlSubmit = async () => {
    if (!url) return;

    try {
      const response = await fetch(`https://api.linkpreview.net/?key=${process.env.LINKPREVIEW_API_KEY}&q=${encodeURIComponent(url)}`);
      const data = await response.json();
      setPreview({
        title: data.title || "No title available",
        description: data.description || "No description available",
        image: data.image || "/image.png"
      });
    } catch (error) {
      console.error("Error fetching link preview:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUrlSubmit();
    }
  };

  const handleRemovePreview = () => {
    setPreview(null);
    setUrl("");
  };

  return (
      <Card className="w-full   bg-neutral-50 rounded-lg overflow-hidden border-none">
        <CardContent className="p-4 space-y-4 w-full">
          <h3 className="text-sm font-medium text-neutral-950">
            Input your website link:
          </h3>

          <div className="">
            <div className="flex items-center w-full h-10 gap-2 px-3 py-2 bg-neutral-00 rounded-lg border border-solid border-[#454446]">
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm text-neutral-600 placeholder-neutral-400"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL here"
                onKeyPress={handleKeyPress}
              />
              <PaperclipIcon className="w-6 h-6 text-neutral-600" />
            </div>
          </div>

          <Separator className="" />

          {preview && (
            <div className="gap-2 flex w-full max-w-[400px] items-center bg-white rounded-lg overflow-hidden border border-solid border-neutral-200 hover:border-neutral-300 transition-colors">
              <img
                className="w-[65px] h-16 object-cover bg-black/80"
                alt="Link preview thumbnail"
                src={preview.image}
              />

              <div className="p-3 flex-1 flex items-center">
                <div className="flex flex-col items-start justify-center flex-1">
                  <h4 className="text-sm font-medium text-neutral-950 line-clamp-1">
                    {preview.title}
                  </h4>
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {preview.description}
                  </p>
                </div>
                <button onClick={handleRemovePreview} className="p-1 hover:bg-neutral-50 rounded-full transition-colors">
                  <Trash2Icon className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    
    
  );
};