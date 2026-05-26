import { useEffect, useState } from "react";

export default function GithubCard() {
  const [profile, setProfile] =
    useState(null);

  const username =
    localStorage.getItem(
      "lumi_github_user"
    ) || "roopasanthoshi";

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );

        const data =
          await response.json();

        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProfile();
  }, [username]);

  if (!profile) {
    return (
      <div className="glass rounded-xl p-4">
        Loading GitHub...
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-4 fade-up fade-up-2">
      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">
        GitHub
      </p>

      <div className="flex items-center gap-3">
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-14 h-14 rounded-full border border-white/10"
        />

        <div>
          <h3 className="text-white font-medium">
            {profile.login}
          </h3>

          <p className="text-xs text-white/40">
            {profile.public_repos} repositories
          </p>

          <p className="text-xs text-white/40">
            {profile.followers} followers
          </p>
        </div>
      </div>
    </div>
  );
}