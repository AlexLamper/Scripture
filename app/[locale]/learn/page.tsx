"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Map from "@/components/map/Map";
import Statistics from "@/components/home/Statistics";
import { Suspense } from 'react'
import {Spinner} from "@nextui-org/spinner";

export default function MapPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const { data, error } = await supabase.from("sections").select();

        if (error) {
          setError(`Error fetching sections: ${error.message}`);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          setSections(data);
        } else {
          setSections([]);
        }
        setLoading(false);
      } catch (err: any) {
        setError(`Error during sections fetch: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSections();
  }, [supabase]);

  if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen flex-col">
          <Spinner color="default" label="Loading data..." labelColor="foreground" />
        </div>
      );    
    ;
  }

  if (error) {
    return <div className="text-red-500 text-center min-h-screen flex justify-center">{error}</div>;
  }

  if (sections.length === 0) {
    return <div className="text-center min-h-screen flex justify-center">No sections found.</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col min-h-[100vh] p-6">
      <div className="flex w-full gap-6">
        <div id="map-section" className="lg:w-8/12 w-auto">
          <Suspense fallback={<p>Loading map...</p>}>
            <Map />
          </Suspense>
        </div>

        <div id="statistics-section" className="lg:w-4/12 hidden md:block w-auto">
          <h2 className="font-bold text-3xl mb-6">Statistics</h2>
          <Suspense fallback={<p>Loading statistics...</p>}>
            <Statistics />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
