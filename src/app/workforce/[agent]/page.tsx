"use client"
{/* <a href="https://bolt.new/~/sb1-4j3x8cty">Check this</a> */ }
import { EditIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function AgentDetailGeneral() {
  const [avatarUrl, setAvatarUrl] = useState("/ellipse-1.svg");
  const [responseStyle, setResponseStyle] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [persona, setPersona] = useState("friendly");


  const personaOptions = {
    friendly: { emoji: "😁", label: "Friendly" },
    professional: { emoji: "😎", label: "Professional" },
  };
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };


  return ( 
    <main className="flex flex-col flex-1 p-3 gap-3">
      {/* Main content */}
      <Card className="flex flex-col flex-1 rounded-xl overflow-hidden overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between px-4 py-3 h-16">
          <div className="flex flex-col">
            <h1 className="font-title-2 text-neutral-950 font-bold">General</h1>
            <p className="font-body-3 text-neutral-800">
              Customize how your AI will act and talk
            </p>
          </div>
          <Button className="bg-neutral-950 text-white  rounded-lg h-10">
            Save changes
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col gap-1 p-3 flex-1">
          {/* Agent avatar */}
          <div className="flex max-w-[800px] items-center gap-12 px-3 py-2 w-full rounded-xl">
            <label className="w-[100px] h-[17.5px] font-body-3 text-neutral-600">
              Agent avatar
            </label>
            <div className="relative">
              <Avatar
                className="w-16 h-16 cursor-pointer"
                onClick={handleAvatarClick}
              >
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>CZ</AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button
                size="icon"
                variant="outline"
                className="absolute w-6 h-6 p-1 top-10 left-11 bg-neutral-50 rounded-full border-white"
                onClick={handleAvatarClick}
              >
                <EditIcon className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Agent name */}
          <div className="flex max-w-[800px] items-center gap-12 px-3 py-2 w-full rounded-xl">
            <label className="w-[100px] h-[17.5px] font-body-3 text-neutral-600">
              Agent name
            </label>
            <div className="flex flex-col items-start gap-1 flex-1">
              <Input
                className="h-10 px-3 py-2 font-body-3 text-neutral-800 border-[#e6e6e7] rounded-lg"
                defaultValue="CRM Zendesk"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="flex max-w-[800px] items-start gap-12 px-3 py-2 w-full rounded-xl">
            <label className="w-[100px] h-[17.5px] mt-[-1.00px] font-body-3 text-neutral-600">
              Skills
            </label>
            <div className="flex flex-col items-start gap-4 flex-1">
              <div className="flex flex-col h-[120px] items-start gap-1 w-full">
                <Textarea
                  className="flex-1 w-full px-3 py-2 font-normal text-neutral-800 text-sm border-[#e6e6e7] rounded-lg"
                  defaultValue="CRM Zendesk, you lead with confidence and strategic vision, driving sales growth through insightful market analysis and decisive action. Your ability to motivate and mentor your team ensures peak performance, while your customer-centric approach fosters lasting client relationships."
                />
              </div>
            </div>
          </div>

          {/* Persona */}
          <div className="flex max-w-[800px] items-center gap-12 px-3 py-2 w-full rounded-xl">
            <label className="w-[100px] h-[17.5px] font-body-3 text-neutral-600">
              Persona
            </label>
            <div className="flex flex-col items-start gap-1 flex-1">
              <Select value={persona} onValueChange={setPersona}>
                <SelectTrigger className="h-10 px-3 py-2 font-body-3 text-neutral-800 border-[#e6e6e7] rounded-lg">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <span className="font-body-1 text-neutral-800">
                        {personaOptions[persona].emoji}
                      </span>
                      <span>{personaOptions[persona].label}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(personaOptions).map(([value, { emoji, label }]) => (
                    <SelectItem key={value} value={value}>
                      <div className="flex items-center gap-2">
                        <span className="font-body-1">{emoji}</span>
                        <span>{label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>


          {/* Response style */}
          <div className="flex max-w-[800px] items-start gap-12 px-3 py-2 w-full rounded-xl">
            <label className="w-fit mt-[-1.00px] font-body-3 text-neutral-600">
              Response style
            </label>
            <div className="flex flex-col items-start gap-3 flex-1">
              <input
                type="range"
                min="0"
                max="3"
                value={responseStyle}
                onChange={(e) => setResponseStyle(Number(e.target.value))}
                className="w-full h-2 bg-neutral-50 rounded-full appearance--none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3224ff99 ${(responseStyle / 3) * 100
                    }%, #e6e6e7 ${(responseStyle / 3) * 100}%)`,
                }}
                list="response-points"
              />
              <datalist
                id="response-points"
                className="flex justify-between w-full"
              >
                <option value="0" label="Minimal"></option>
                <option value="1" label="Short"></option>
                <option value="2" label="Long"></option>
                <option value="3" label="Chatty"></option>
              </datalist>

              <div className="flex items-start justify-between   w-full none hide hidden opacity-0">
                <div className="inline-flex items-center">
                  <div
                    className={`${responseStyle === 0 ? "font-title-3" : "font-body-3"
                      } text-neutral-800`}
                  >
                    Minimal
                  </div>
                </div>
                <div className="inline-flex items-center">
                  <div
                    className={`${responseStyle === 1 ? "font-title-3" : "font-body-3"
                      } text-neutral-800`}
                  >
                    Short
                  </div>
                </div>
                <div className="inline-flex items-center">
                  <div
                    className={`${responseStyle === 2 ? "font-title-3" : "font-body-3"
                      } text-neutral-800`}
                  >
                    Long
                  </div>
                </div>
                <div className="inline-flex items-center">
                  <div
                    className={`${responseStyle === 3 ? "font-title-3" : "font-body-3"
                      } text-neutral-800`}
                  >
                    Chatty
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>

  );
};