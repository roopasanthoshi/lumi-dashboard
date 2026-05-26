import { useEffect, useState } from "react";
import {
  Search,
  ExternalLink,
} from "lucide-react";

export default function Github() {
  const [username, setUsername] =
    useState(
      localStorage.getItem(
        "lumi_github_user"
      ) || "roopasanthoshi"
    );

  const [input, setInput] =
    useState(username);

  const [profile, setProfile] =
    useState(null);

  const [repos, setRepos] =
    useState([]);

  const [showSearch, setShowSearch] =
    useState(false);

  async function loadGitHub(user) {
    try {
      const profileRes = await fetch(
        `https://api.github.com/users/${user}`
      );

      const profileData =
        await profileRes.json();

      setProfile(profileData);

      const repoRes = await fetch(
        `https://api.github.com/users/${user}/repos`
      );

      const repoData =
        await repoRes.json();

      setRepos(repoData);

      localStorage.setItem(
        "lumi_github_user",
        user
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadGitHub(username);
  }, [username]);

  function handleSearch(e) {
    e.preventDefault();

    if (!input.trim()) return;

    setUsername(input);

    setShowSearch(false);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-white/90">
            GitHub Integration
          </h1>

          <p className="text-white/40 text-sm mt-1">
            View GitHub profile and repositories
          </p>
        </div>

        <button
          onClick={() =>
            setShowSearch(!showSearch)
          }
          className="text-sm px-4 py-2 rounded-lg bg-[#7c6aff] text-white"
        >
          Change User
        </button>
      </div>

      {showSearch && (
        <form
          onSubmit={handleSearch}
          className="flex gap-3 mb-6"
        >
          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Enter GitHub username"
            className="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white outline-none"
          />

          <button
            type="submit"
            className="bg-[#7c6aff] px-5 py-3 rounded-lg text-white flex items-center gap-2"
          >
            <Search size={16} />
            Search
          </button>
        </form>
      )}

      {profile && (
        <div className="glass rounded-xl p-5 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-20 h-20 rounded-full"
            />

            <div>
              <h2 className="text-2xl text-white">
                {profile.login}
              </h2>

              <p className="text-white/40">
                {profile.public_repos} repositories
              </p>

              <p className="text-white/40">
                {profile.followers} followers
              </p>

              <a
                href={profile.html_url}
                target="_blank"
                className="text-[#8b5cf6] text-sm flex items-center gap-2 mt-2"
              >
                Open Profile
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <p className="text-white/60 mt-4">
            {profile.bio}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="glass rounded-xl p-4"
          >
            <h3 className="text-white font-medium">
              {repo.name}
            </h3>

            <p className="text-white/40 text-sm mt-2">
              {repo.description ||
                "No description"}
            </p>

            <a
              href={repo.html_url}
              target="_blank"
              className="text-[#8b5cf6] text-sm inline-block mt-3"
            >
              View Repository
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}