import React from "react";
// import LeaderboardHero from "@/components/leaderboard/LeaderboardHero";
import Leaderboard from "@/components/leaderboard/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 sm:p-6 min-h-screen">
      {/* <LeaderboardHero /> */}
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;
