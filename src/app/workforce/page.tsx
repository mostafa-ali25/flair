"use client";

import { useState, useEffect } from "react";
import { WorkforceHeader } from "@/features/workforce/components/Header";
import { WorkforceCard2 } from "@/features/workforce/components/WorkforceCard2";
import { NoWorkforce } from "@/features/workforce/components/NoWorkforce";

const workforceItemsArr0 = []
const workforceItemsArr = [
    {
        id: 1,
        title: "CRM Zendesk",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
        id: 2,
        title: "Agent",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
        id: 3,
        title: "Information Extraction Agent",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
        id: 4,
        title: "Performance",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
        id: 5,
        title: "Classifier Agent",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
        id: 6,
        title: "Isabella Hayes",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
];

export default function WorkforcePage() {
    const [activeCardMenu, setActiveCardMenu] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [workforceItems, setWorkforceItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch workforce items from the API
        const fetchWorkforceItems = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/agents"); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch workforce items");
                }
                const data = await response.json();
                setWorkforceItems(data);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkforceItems();
    }, []);

    return (

        <div className="flex flex-1 h-screen">
            <section className="flex flex-col flex-1 gap-2.5 p-3 bg-neutral-100">
                <WorkforceHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

                <div className="">
                    {workforceItemsArr0.length === 0 && <NoWorkforce />}
                </div>
                <hr />
                <div className="flex flex-wrap flex-1 gap-3 content-start items-start justify--center px-4 py-4 bg-white rounded-xl max-sm:p-2">

                    {workforceItemsArr.map((item) => (
                        <>
                            <WorkforceCard2 key={item.id} {...item} />

                        </>
                    ))}
                    {/* {workforceItemsArr.map((item) => (
                        <>
                            <WorkforceCard2 key={item.id} {...item} />
                        </>
                    ))} */}

                </div>
            </section>
        </div>


    );

    return (
        <main className="flex w-full h-screen bg--white">
            <div className="flex flex-1 h-screen">
                <section className="flex flex-col flex-1 gap-2.5 p-3 bg-neutral-100">
                    <WorkforceHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

                    <div className="flex flex-wrap flex-1 gap-3 content-start items-start justify--center px-4 py-4 bg-white rounded-xl max-sm:p-2">
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {!loading && !error && workforceItems.length === 0 && (
                            <p>No workforce items found.</p>
                        )}
                        {!loading &&
                            !error &&
                            workforceItems.map((item) => (
                                <>
                                    {JSON.stringify(item, null, 2)}
                                    <WorkforceCard2 key={item.slug} {...item} />
                                </>
                            ))}
                    </div>
                </section>
            </div>
        </main>


    );
}