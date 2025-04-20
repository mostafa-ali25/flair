"use client";
import { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import {
  BehaviorsIcon,
  ChatIcon,
  GeneralIcon,
  KnowledgeIcon,
  PublishIcon,
  ToolsIcon,
} from "@/components/icons/icons";

import { useRouter, usePathname } from "next/navigation";

// Secondary sidebar navigation items
const AgentSidebarItems = [
  {
    icon: <GeneralIcon className="w-5 h-5" />,
    label: "General",
    link: "",
  },
  {
    icon: <KnowledgeIcon className="w-5 h-5" />,
    label: "Knowledge",
    link: "knowledge",
  },
  {
    icon: <ToolsIcon className="w-5 h-5" />,
    label: "Tools",
    link: "tools",
  },
  {
    icon: <BehaviorsIcon className="w-5 h-5" />,
    label: "Behaviors",
    link: "behaviors",
  },
  {
    icon: <ChatIcon className="w-5 h-5" />,
    label: "Chat with Agent",
    link: "chat",
  },
  {
    icon: <PublishIcon className="w-5 h-5" />,
    label: "Publish",
    link: "publish",
  },
];

const AgentLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const agentId = pathname.split("/")[2]; // Extract the agent ID from the URL

  return (
    <div className="relative flex min-h-screen">
      {/* Secondary sidebar */}
      <aside className="flex flex-col w-full bg-neutral-00 min-w-[215px]">
        <div className="flex items-center gap-2 p-3">
          <Button
            variant="outline"
            size="icon"
            className="p-2 rounded-xl bg-neutral-50 border-white"
            onClick={() => router.push("/workforce")}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
          <h2 className="font-title-2 text-neutral-950">CRM Zendesk</h2>
        </div>

        <Separator className="w-full" />

        <nav className="flex flex-col gap-1 py-3">
          {AgentSidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              //   title={`/worksforce/${agentId}/${item.link}`}
              title={pathname}
              className={`flex justify-start h-10 px-5 py-2 gap-2 rounded-xl ${pathname === `/workforce/${agentId}/${item.link}`
                  ? "bg-neutral-50 border-r-2 border-r-[#262626] rounded-none"
                  : ""
                }`}
              onClick={() => router.push(`/workforce/${agentId}/${item.link}`)}
            >
              {item.icon}
              <span
                className={`${pathname === `/workforce/${agentId}/${item.link}`
                    ? "font-title-3"
                    : "font-body-3"
                  } text-neutral-950`}
              >
                {item.label}
              </span>
            </Button>
          ))}
        </nav>
        {/* tutorial card */}
        {/* <div className="flex flex-col items-start justify-end gap-1 px-2 py-3 flex-1">
            <Card className="w-full bg-neutral-900 rounded-lg">
              <CardHeader className="p-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="flex-1 mt-[-1.00px] font-bold text-neutral-00 text-[15px] leading-[18.0px]">
                    Become a wizard with 5 easy steps
                  </h3>
                  <Button variant="ghost" size="icon" className="p-0 h-4 w-4">
                    <XIcon className="w-4 h-4 text-neutral-00" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative w-full h-[101.25px] bg-[#c5c6f2] rounded overflow-hidden overflow-y-auto">
                    <div className="relative w-[142px] h-[77px] top-3 left-3.5 bg-[url(/image-26.png)] bg-cover bg-[50%_50%]">
                      <img
                        className="absolute w-8 h-8 top-[22px] left-[60px]"
                        alt="Frame"
                        src="/frame-2147225343.svg"
                      />
                    </div>
                  </div>
                </a>
                <p className="p-2 font-body-4 text-neutral-300">
                  Watch tutorial on how to create your agent team on Flair.
                </p>
              </CardContent>
              <CardFooter className="p-2">
                <Button
                  variant="link"
                  className="p-0 h-auto flex items-center gap-1 text-neutral-00"
                >
                  <span className="font-body-4">View help articles</span>
                  <ChevronRightIcon className="w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          </div> */}
      </aside>

      <div className="min-w-[calc(100vw-272px)]">
        <div className="relative h-full bg-neutral-50 flex">
          <div className="flex flex-1 h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLayout;
