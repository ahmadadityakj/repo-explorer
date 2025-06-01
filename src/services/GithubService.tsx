import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API,
  headers: {
    "Content-type": "application/json",
  },
});

interface UserListResponse {
  total_count: number;
  incomplete_result: boolean;
  items: GithubUsers[];
}

export interface GithubUsers {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  score: number;
}

export interface GithubUserRepos {
  name: string;
  description: string;
  stargazers_count: number;
}

const getUserList = async (searchQuery: string) => {
  const response = await apiClient.get<UserListResponse>('/search/users', {
    params: {
      q: searchQuery,
      per_page: 5,
    },
  });

  return response.data;
}

const getUserRepos = async (username: string) => {
  const response = await apiClient.get<GithubUserRepos[]>(`/users/${username}/repos`);

  return response.data;
}

const GithubService = {
  getUserList,
  getUserRepos,
}

export default GithubService;
