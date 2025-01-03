"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function SectionPage() {
  const [markers, setMarkers] = useState<any[]>([]);
  const { section } = useParams();
  const supabase = createClient();

  useEffect(() => {
    const fetchMarkers = async () => {
      if (!section) {
        console.error("Section parameter is missing.");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("markers")
          .select()
          .eq("section_id", section);

        if (error) {
          console.error(`Error fetching markers for section ${section}:`, error.message);
          return;
        }

        setMarkers(data);
      } catch (err) {
        console.error("Unexpected error fetching markers:", err);
      }
    };

    fetchMarkers();
  }, [section, supabase]);

  if (!section) {
    return <div className="text-center text-red-500">Section not found.</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12 min-h-[100vh] p-6">
      <h2 className="font-bold text-3xl mb-6">Markers for Section: {section}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {markers.map((marker) => (
          <Card key={marker.marker_id} className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold">
                <Link
                  href={`/map/${section}/${marker.marker_id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {marker.name}
                </Link>
              </CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
