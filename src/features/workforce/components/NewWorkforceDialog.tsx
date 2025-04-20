import {
    AppWindow,
    ArrowLeft,
    GamepadIcon,
    PlusIcon,
    TextIcon,
    UsersIcon,
    SearchIcon,
} from 'lucide-react';
import { PromptIcon, ScratchIcon, LibraryIcon } from '@/components/icons/icons';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';


import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type OptionType = 'library' | 'scratch' | 'prompt';

interface DialogOption {
    id: OptionType;
    title: string;
    description: string;
    icon: React.ReactNode;
}
interface Template {
    id: string;
    name: string;
    description: string;
    recommended?: boolean;
    avatar: string;
}
export function NewWorkforceDialog({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [open, setOpen] = useState(false);
    const [libraryOpen, setLibraryOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const dialogOptions: DialogOption[] = [
        {
            id: 'library',
            title: 'From library ',
            description:
                'Choose a pre-built agent from the library and customize it to fit your needs.',
            icon: <LibraryIcon className="w-12 h-12" />,
        },
        {
            id: 'scratch',
            title: 'From scratch',
            description:
                'Build a fully tailored agent with custom workflows and integrations.',
            icon: <ScratchIcon className="w-12 h-12" />,
        },
        {
            id: 'prompt',
            title: 'From prompt',
            description:
                'Just describe what you want and Flair will generate your agent.',
            icon: <PromptIcon className="w-12 h-12" />,
        },
    ];

    const templates: Template[] = [
        {
            id: 'customer-support',
            name: 'Customer Support',
            recommended: true,
            description:
                'AI agent that handles customer inquiries and support tickets',
            avatar: '🎯',
        },
        {
            id: 'data-analysis',
            name: 'Data Analyst',
            recommended: true,
            description: 'Process and analyze data, generate reports and insights',
            avatar: '📊',
        },
        {
            id: 'content-writer',
            name: 'Content Writer',
            recommended: true,
            description:
                'Create engaging content for blogs, social media, and marketing',
            avatar: '✍️',
        },
    ];

    const filteredTemplates = templates.filter(
        (template) =>
            template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleContinue = () => {
        if (!selectedOption) return;

        switch (selectedOption) {
            case 'library':
                setLibraryOpen(true);
                setOpen(false);
                break;
            case 'scratch':
                router.push(`/workforce/agent?mode=${selectedOption}`);
                break;
            case 'prompt':
                router.push(`/workforce/agent?mode=${selectedOption}`);

                break;
        }
        setOpen(false);
    };

    return (
        <>

            <div className="">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="default"
                            className="h-10 px-3 py-2 bg-neutral-950 rounded-lg"
                        >
                            <PlusIcon className="w-6 h-6 mr-2" />
                            <span className="font-title-3 text-[length:var(--title-3-font-size)] font-[number:var(--title-3-font-weight)] tracking-[var(--title-3-letter-spacing)] leading-[var(--title-3-line-height)] [font-style:var(--title-3-font-style)] text-neutral-00">
                                {children}
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] min-w-[720px] max-w-[920px]">
                        <DialogHeader>
                            <DialogTitle className="pb-3">New agent</DialogTitle>
                            <Separator className="my-5 mt-8" />
                        </DialogHeader>
                        <div className="grid grid-cols-3 gap-4">
                            {dialogOptions.map((option) => (
                                <Button
                                    key={option.id}
                                    variant="outline"
                                    className={`h-auto py-6 px-3 flex flex-col items-center gap-4  whitespace-normal ${selectedOption === option.id ? 'ring-1 ring-neutral-950' : ''
                                        }`}
                                    onClick={() => setSelectedOption(option.id)}
                                >
                                    {option.icon}
                                    <div className="space-y-2 text-center">
                                        <h3 className="font-bold text-neutral-950">{option.title}</h3>
                                        <p className="font-normal text-neutral-500">
                                            {option.description}
                                        </p>
                                    </div>
                                </Button>
                            ))}
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <DialogTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogTrigger>
                            <Button
                                onClick={() => {
                                    handleContinue();
                                    setOpen(false);
                                }}
                                disabled={!selectedOption}
                            >
                                Continue
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={libraryOpen} onOpenChange={setLibraryOpen}>
                    <DialogContent className="sm:max-w-[864px] p-0 rounded-lg">
                        <DialogHeader>
                            <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setLibraryOpen(false);
                                        setOpen(true);
                                        setSelectedTemplate(null);
                                    }}
                                >
                                    <ArrowLeft className="h-4 w-4 text-gray-700" />
                                </Button>
                                <DialogTitle className="text-base font-normal text-gray-700">
                                    Library
                                </DialogTitle>
                                {/* <Button
                                variant="ghost"
                                size="icon"
                                className="ml-auto"
                                onClick={() => setLibraryOpen(false)}
                            >  x
                            </Button> */}
                            </div>
                        </DialogHeader>
                        <div className="relative px-6 py-4">
                            <SearchIcon className="absolute left-9 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by agent name, skills, ..."
                                className="w-full rounded-lg border border-gray-200 bg-white px-9 py-3 outline-none focus:border-gray-700 text-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[400px] px-6 pb-6">
                            {filteredTemplates.map((template) => (
                                <div
                                    key={template.id}
                                    className={`cursor-pointer rounded-xl border p-5 transition-all hover:border-gray-700 ${selectedTemplate?.id === template.id
                                        ? 'border-gray-700'
                                        : 'border-gray-200'
                                        }`}
                                    onClick={() => setSelectedTemplate(template)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl">{template.avatar}</div>
                                        <div>
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="text-base font-semibold text-gray-700">
                                                    {template.name}
                                                </h3>
                                                {template.recommended && (
                                                    <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                                                        Recommended
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                {template.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                            <Button
                                variant="outline"
                                onClick={() => setLibraryOpen(false)}
                                className="border-gray-700 text-gray-700 hover:bg-transparent"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    if (selectedTemplate) {
                                        router.push(`/workforce/agent?mode=${selectedOption}&template=${selectedTemplate.id}`);
                                        setLibraryOpen(false);
                                    }
                                }}
                                disabled={!selectedTemplate}
                                className="bg-gray-700 text-white hover:bg-gray-700/90"
                            >
                                Confirm
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

// import { AppWindow, GamepadIcon, PlusIcon, TextIcon, UsersIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// export function NewWorkforceDialog({ children }: { children: React.ReactNode }) {

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button
//                     variant="default"
//                     className="h-10 px-3 py-2 bg-neutral-950 rounded-lg"
//                 >
//                     <PlusIcon className="w-6 h-6 mr-2" />
//                     <span className="font-title-3 text-[length:var(--title-3-font-size)] font-[number:var(--title-3-font-weight)] tracking-[var(--title-3-letter-spacing)] leading-[var(--title-3-line-height)] [font-style:var(--title-3-font-style)] text-neutral-00">
//                         {children}
//                     </span>
//                 </Button>
//             </DialogTrigger>

//             <DialogContent className="min-w-[720px] max-w-[920px]">
//                 <DialogHeader>
//                     <DialogTitle>New agent</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid grid-cols-3 gap-4">
//                     <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-4 whitespace-normal">
//                         <AppWindow className="w-12 h-12" />
//                         <div className="space-y-2 text-center">
//                             <h3 className="font-bold">From library</h3>
//                             <p className="text-sm text-neutral-400">Choose a pre-built agent from the library and customize it to fit your needs.</p>
//                         </div>
//                     </Button>

//                     <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-4 whitespace-normal">
//                         <GamepadIcon className="w-12 h-12" />
//                         <div className="space-y-2 text-center">
//                             <h3 className="font-bold">From scratch</h3>
//                             <p className="text-sm text-neutral-400">Build a fully tailored agent with custom workflows and integrations.</p>
//                         </div>
//                     </Button>
//                     <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-4 whitespace-normal">
//                         <TextIcon className="w-12 h-12" />
//                         <div className="space-y-2 text-center">
//                             <h3 className="font-bold">From prompt</h3>
//                             <p className="text-sm text-neutral-400">Just describe what you want and Flair will generate your agent.</p>
//                         </div>
//                     </Button>
//                 </div>

//                 <div className="flex justify-end gap-2 mt-6">
//                     <DialogTrigger asChild>
//                         <Button variant="outline">Cancel</Button>
//                     </DialogTrigger>
//                     <Button>Continue</Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }
