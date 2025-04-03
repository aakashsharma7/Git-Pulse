import React from "react";
import { GitFork, Star, Book } from "lucide-react";

interface GithubStatsProps {
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

export function GithubStats({ stats, languages }: GithubStatsProps) {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <Star size={16} className="text-yellow-500" />
          <span className="font-semibold">{stats.stars.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <GitFork size={16} className="text-blue-500" />
          <span className="font-semibold">{stats.forks.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Book size={16} className="text-purple-500" />
          <span className="font-semibold">{stats.repos.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Top Languages:
        </p>
        <div className="flex h-2 rounded-full overflow-hidden">
          {languages.map((lang) => (
            <div
              key={lang.name}
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color,
              }}
              className="first:rounded-l-full last:rounded-r-full"
              title={`${lang.name} ${lang.percentage.toFixed(1)}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {languages.slice(0, 4).map((lang) => (
            <div key={lang.name} className="flex items-center space-x-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-gray-700 dark:text-gray-500">
                {lang.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}