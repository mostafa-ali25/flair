"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/custom/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart2,
  Menu,
  MessageCircle,
  Plus,
  Search,
  ShoppingBag,
  User,
  Users,
} from "lucide-react"
import { useState } from "react"


// Define tool cards data
const toolCards = [
  {
    id: 1,
    icon: <User className="w-[18px] h-[18px]" />,
    title: "Lead Management",
    description:
      "Track, qualify, and nurture leads efficiently, ensuring no opportunity is missed in the sales pipeline.",
    enabled: false,
  },
  {
    id: 2,
    icon: <ShoppingBag className="w-[18px] h-[18px]" />,
    title: "Deal Tracking",
    description:
      "Monitor sales progress, update deal stages in real time, and forecast revenue trends to refine sales strategies.",
    enabled: true,
  },
  {
    id: 3,
    icon: <Users className="w-[18px] h-[18px]" />,
    title: "Client Engagement",
    description:
      "Automate follow-ups, schedule meetings, and maintain strong relationships through personalized communication.",
    enabled: true,
  },
  {
    id: 4,
    icon: <BarChart2 className="w-[18px] h-[18px]" color="#262626" />,
    title: "Sales Insights & Reporting",
    description: "Analyze sales performance, generate reports, and gain actionable insights to drive revenue growth.",
    enabled: false,
  },
  {
    id: 5,
    icon: <MessageCircle className="w-[18px] h-[18px]" />,
    title: "Performance & Feedback",
    description:
      "Provide real-time coaching, track individual sales performance, and offer data-driven feedback to enhance team productivity.",
    enabled: false,
  },
  {
    id: 6,
    icon: <Menu className="w-[18px] h-[18px]" />,
    title: "Automated Task",
    description:
      "Streamline daily sales activities by automating follow-ups, reminders, and administrative tasks to improve efficiency and close deals faster.",
    enabled: false,
  },
  {
    id: 7,
    icon: <User className="w-[18px] h-[18px]" />,
    title: "Lead Management",
    description:
      "Track, qualify, and nurture leads efficiently, ensuring no opportunity is missed in the sales pipeline.",
    enabled: false,
  },
  {
    id: 8,
    icon: <ShoppingBag className="w-[18px] h-[18px]" />,
    title: "Deal Tracking",
    description:
      "Monitor sales progress, update deal stages in real time, and forecast revenue trends to refine sales strategies.",
    enabled: true,
  },
]


export default function AgentTools() {
  const [toolStates, setToolStates] = useState(toolCards.map((tool) => ({ id: tool.id, enabled: tool.enabled })));

  const handleToolToggle = (id: number, checked: boolean) => {
    setToolStates((prev) => prev.map((tool) => (tool.id === id ? { ...tool, enabled: checked } : tool)));
  };

  const isToolEnabled = (id: number) => {
    return toolStates.find((tool) => tool.id === id)?.enabled || false;
  };

  // Array of enabled tools
  const enabledTools = toolStates
    .filter((tool) => tool.enabled)
    .map((tool) => tool.id);

  console.log("Enabled Tools:", enabledTools); // Debugging purpose 

  return (
    <main className="flex flex-col flex-1 p-3 gap-3">
      <Card className="flex flex-col items-start flex-1 h-full rounded-xl overflow-hidden overflow-y-auto">
        {/* Main Content */}
        <CardHeader className="flex flex-row items-center px-4 py-2 w-full">
          <div className="flex-1 flex-col">
            <h1 className="font-title-2 text-neutral-950">Tools</h1>
            <p className="font-body-3 text-neutral-800">Extend your agent capabilities</p>
          </div>
          <div className="flex flex-col w-[361px] items-start  mt-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input className="pl-10 w-[300px]" type="text" placeholder="Search by name" />
            </div>
          </div>

          <Button className="bg-neutral-950 text-white mt-1 rounded-lg ">
            Save changes
          </Button>
        </CardHeader>

        <Separator className="w-full" />

        {/* Content */}
        <div className="flex flex-col items-start gap-4 px-4 py-3 flex-1 w-full overflow-auto">
          {/* Tabs */}
          <div defaultValue="agent-capabilities" className="w-full border-b border-neutral-50">
            <div className="mt-4 p-0">
              {/* Tool Cards Grid */}
              <div className="flex flex-wrap items-start gap-[12px] w-full">
                {toolCards.map((tool) => (
                  <Card
                    key={tool.id}
                    className="flex flex-col w-[calc((100%/3)-10px)] w-xl-[calc(100%/3)] items-start gap-3 p-4 border-neutral-200"
                  >
                    <CardContent className="p-0 w-full">
                      <div className="flex items-center justify-between w-full">
                        <div className="inline-flex items-center gap-2">
                          <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                            {tool.icon}
                          </div>
                          <h3 className="font-title-2 text-neutral-950 whitespace-nowrap overflow-hidden text-ellipsis">
                            {tool.title}
                          </h3>
                        </div>
                        <Switch
                          checked={isToolEnabled(tool.id)}
                          onCheckedChange={(checked) => handleToolToggle(tool.id, checked)}
                        />
                      </div>
                      <p className="mt-3 font-body-3 text-neutral-500 line-clamp-3">{tool.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Add New Tool Button */}
              <Button variant="ghost" className="mt-4 inline-flex items-center gap-1 px-3">
                <Plus className="w-6 h-6" />
                <span className="font-title-3 text-neutral-950">Add new tool</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}


