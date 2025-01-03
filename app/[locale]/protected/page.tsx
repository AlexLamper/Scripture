import { createClient } from "@/utils/supabase/server";
// import { InfoIcon, Mail, User } from 'lucide-react';
import { redirect } from "next/navigation";
import Link from "next/link";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: sections, error } = await supabase
    .from("sections")
    .select("section_id, title");

  if (error) {
    console.error("Error fetching sections:", error.message);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 sm:p-6">
      
      {/* User Details */}
      {/* <Card className="w-full sm:w-[90%]">
        <CardHeader>
          <CardTitle>Your User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium leading-none">Name</p>
                <p className="text-sm text-muted-foreground">{user.user_metadata.full_name || 'Not provided'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium leading-none mb-1">Last Sign In</p>
              <p className="text-sm text-muted-foreground">
                {new Date(user.last_sign_in_at || '').toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Sections */}
      <div className="flex flex-col gap-6 w-full min-h-[100vh]">
        <h2 className="font-bold text-2xl mb-4">Explore Sections</h2>
        {sections && sections.length > 0 ? (
          <ul className="space-y-4 w-full">
            {sections.map((section) => (
              <li
                key={section.section_id}
                className="border rounded-md p-4 hover:bg-accent transition w-full sm:w-[90%]"
              >
                <Link
                  href={`/map/${section.section_id}`}
                  className="text-blue-500 underline font-semibold text-lg"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No sections available to explore yet.</p>
        )}
      </div>
    </div>
  );
}