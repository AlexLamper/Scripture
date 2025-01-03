"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const SectionsPage = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        // Fetch sections from Supabase
        const { data, error } = await supabase
          .from("sections")
          .select("*"); // Replace "*" with the necessary columns if needed

        if (error) {
          throw new Error(error.message);
        }

        // Set the sections data and update loading state
        setSections(data || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching sections:", err);
      }
    };

    fetchSections();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6">
        <p className="text-lg">Loading sections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6">
        <div className="bg-red-100 text-red-800 border border-red-300 rounded-md p-4">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6">
        <p className="text-lg">No sections found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 sm:p-6 min-h-screen">
      <h1 className="text-2xl font-bold">Sections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
            <Link
                href={`/map/${section.section_id}`}
            >
                <Card
                    key={section.section_id}
                    className="border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[#A67B5B] bg-opacity-0 hover:bg-opacity-5 dark:bg-white dark:bg-opacity-0 dark:hover:bg-opacity-10 "
                >
                    <CardContent className="p-4">
                        <CardTitle className="text-lg font-semibold">
                            {section.title}
                        </CardTitle>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionsPage;
