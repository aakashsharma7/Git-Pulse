import { forwardRef } from "react";
import Image from "next/image";
import {
  MapPin,
  Link as LinkIcon,
  Twitter,
  Building,
  Github,
} from "lucide-react";
import { GithubStats } from "./GithubStats";
import { GitHubQRCode } from "./GithubQR";

interface GithubCardProps {
  user: {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    location: string;
    blog: string;
    twitter_username: string;
    followers: number;
    following: number;
    company: string;
    created_at: string;
    html_url: string;
  };
  stats: {
    stars: number;
    forks: number;
    repos: number;
  };
  languages: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
}

const GithubCard = forwardRef(function (
  { user, stats, languages }: GithubCardProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className="w-full h-[38rem] sm:h-[22rem] bg-[var(--color-bg-primary)] aspect-[1.75/1] overflow-hidden relative"
    >
      <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-purple-600 to-blue-600" />
      {/* Main content */}
      <div className="flex flex-col sm:flex-row h-full">
        {/* Left section with avatar and name */}
        <div className="sm:w-2/5 w-full pt-4 pl-6 pr-4 pb-4 flex flex-col justify-between sm:border-r border-gray-100">
          <div>
            <div className="mb-4 ">
              <Image
                src={user.avatar_url}
                alt={user.name || "User Avatar"}
                width={96}
                height={96}
                className="rounded-full border-2 border-gray-200 shadow-lg mb-4"
              />
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-purple-600 font-medium">@{user.login}</p>
            </div>
            {user.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {user.bio}
              </p>
            )}
          </div>
          <div className="flex items-center text-gray-500 text-sm space-x-2">
            <Github size={18} />
            <span>github.com/{user.login}</span>
          </div>
        </div>

        {/* Right section with details */}
        <div className="flex-1 pt-4 px-4 pb-4 flex flex-col justify-between">
          {/* Stats section */}
          <div className="space-y-6">
            <div className="flex space-x-6">
              <div>
                <p className="text-2xl font-bold">
                  {user.followers.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Followers
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {user.following.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Following
                </p>
              </div>
            </div>

            <GithubStats stats={stats} languages={languages} />
          </div>

          <div className="flex items-end justify-between">
            {/* Contact details */}
            <div className="space-y-2 text-sm">
              {user.company && (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Building size={16} />
                  <span className="font-medium">{user.company}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin size={16} />
                  <span>{user.location}</span>
                </div>
              )}
              {user.blog && (
                <div className="flex items-center space-x-2">
                  <LinkIcon
                    size={16}
                    className="text-gray-600 dark:text-gray-400"
                  />
                  <a
                    href={user.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                  >
                    {user.blog.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              {user.twitter_username && (
                <div className="flex items-center space-x-2">
                  <Twitter
                    size={16}
                    className="text-gray-600 dark:text-gray-400"
                  />
                  <a
                    href={`https://twitter.com/${user.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    @{user.twitter_username}
                  </a>
                </div>
              )}
            </div>

            <GitHubQRCode url={user.html_url} />
          </div>
        </div>
      </div>
    </div>
  );
});

GithubCard.displayName = "GithubCard";

export { GithubCard };