import React from "react";
import { Card } from "@/components/ui/card";
import { NoWorkforceIcon } from "@/components/icons/icons";
import { NewWorkforceDialog } from "@/features/workforce/components/NewWorkforceDialog";

export function NoWorkforce() {
    return (
        <div className="flex flex-col items-center gap-4 py-16 rounded-xl bg-white">
            <Card className="inline-flex items-center justify-center p-4 bg-neutral-50 border border-white rounded-xl">
                <NoWorkforceIcon className="" />
            </Card>

            <div className="flex flex-col max-w-[500px] items-center gap-2">
                <h1 className="text-center text-neutral-700 font-headline-3 text-[length:var(--headline-3-font-size)] font-[number:var(--headline-3-font-weight)] tracking-[var(--headline-3-letter-spacing)] leading-[var(--headline-3-line-height)] [font-style:var(--headline-3-font-style)]">
                    Welcome to Agents
                </h1>

                <p className="text-center text-neutral-400 font-body-4 text-[length:var(--body-4-font-size)] font-[number:var(--body-4-font-weight)] tracking-[var(--body-4-letter-spacing)] leading-[var(--body-4-line-height)] [font-style:var(--body-4-font-style)]">
                    Build your AI-powered agents to streamline tasks and enhance
                    productivity.
                </p>
            </div>

            <NewWorkforceDialog> Create new </NewWorkforceDialog>
        </div>
    );
};




// import { Button } from "@/components/ui/button";
// import { NoWorkforceIcon } from "@/components/icons/icons";
// import { SearchIcon, PlusIcon } from "@/components/icons/icons";

// export function NoWorkforce() {
//     return (
//         <div className="flex flex-col items-center w-full justify-center min-h-[600px] p-4">
//             <div className="relative mb-6">
//                 <div className="w-20 h-20 bg-gray-100 rounded-xl border border-white flex items-center justify-center">
//                     <NoWorkforceIcon className="" />
//                 </div>
//             </div>

//             <div className="text-center max-w-[600px] mb-8">
//                 <h2 className="text-gray-700 text-lg font-medium mb-4">Welcome to My Workforce</h2>
//                 <p className="text-gray-500 text-sm">
//                 Build your AI-powered agents to streamline tasks and enhance productivity.
//                 </p>
//             </div>

//             <Button className="flex gap-2 justify-center items-center px-3 py-2 h-10 text-sm font-semibold text-white rounded-lg cursor-pointer bg-neutral-800 max-sm:w-full hover:bg-neutral-700   ">
//                 <PlusIcon className="text-white" />
//                 <span>Create new </span>
//             </Button>
//         </div>
//     );
// }