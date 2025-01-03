import { createClient } from "@/utils/supabase/server";
import { Mail, User, Shield } from 'lucide-react';
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const userRole = user.user_metadata?.role || "user"; // Default to 'user' if no role is set

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 sm:p-6 min-h-screen">
      
      {/* User Details */}
      <Card className="w-full sm:w-[90%]">
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
            <div className="flex items-center space-x-4">
              <Shield className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium leading-none">Role</p>
                <p className={`text-sm font-semibold ${userRole === 'admin' ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)} {/* Capitalize role */}
                </p>
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
      </Card>
    </div>
  );
}
