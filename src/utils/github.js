import { useEffect, useState } from "react";

export default function Github() {
  const [username, setUsername] = useState("roopasanthoshi");
  const [input, setInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  async function fetchGitHub(user) {
    try {
      const profileRes = await fetch(
        `https://api.github.com/users/${user}`
      );

      const profileData = await profileRes.json();

      const repoRes = await fetch(
        `https://api.github.com/users/${user}/repos`
      );

      const repoData = await repoRes.json();

      setProfile(profileData);
      setRepos(repoData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGitHub(username);
  }, [username]);

  function handleSearch() {
    if (input.trim() !== "") {
      setUsername(input);
      setShowSearch(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl text-white font-semibold">
            GitHub Integration
          </h1>

          <p className="text-white/40 mt-1">
            View GitHub profile and repositories
          </p>
        </div>

        <button
          onClick={() =>
            setShowSearch(!showSearch)
          }
          className="px-4 py-2 rounded-lg bg-[#7c6aff] text-white"
        >
          Change User
        </button>
      </div>

      {showSearch && (
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            className="flex-1 bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white outline-none"
          />

          <button
            onClick={handleSearch}
            className="px-5 py-3 rounded-lg bg-[#7c6aff] text-white"
          >
            Search
          </button>
        </div>
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
              <h2 className="text-2xl text-white font-semibold">
                {profile.login}
              </h2>

              <p className="text-white/50">
                {profile.public_repos} repositories
              </p>

              <p className="text-white/50">
                {profile.followers} followers
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="glass rounded-xl p-4"
          >
            <h3 className="text-white font-medium mb-3">
              {repo.name}
            </h3>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-[#a78bfa] text-sm"
            >
              View Repository
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}