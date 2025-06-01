import { useState } from "react";
import Accordion from "../components/Accordion";
import GithubService, { type GithubUserRepos, type GithubUsers } from "../services/GithubService";
import { useQuery } from "@tanstack/react-query";
import { StarIcon } from "@heroicons/react/16/solid";

const UserRepoList = ({ user }: { user: GithubUsers }) => {
  const [userRepos, setUserRepos] = useState<GithubUserRepos[]>([]);

  const fetchUserRepos = async(username: string) => {
    const data = await GithubService.getUserRepos(username);

    setUserRepos(data);
  }

  return (
    <Accordion
      title={user?.login}
      key={`user-${user?.id}`}
      onExpand={() => fetchUserRepos(user?.login)}
    >
      {userRepos?.map?.(repo => (
        <div className="flex flex-row justify-between p-2 bg-gray-300 mb-2">
          <div className="flex flex-col">
            <div className="font-bold text-[18px] mb-2">{repo?.name}</div>
            <div>{repo?.description}</div>
          </div>
          <div className="ml-4 flex flex-row">
            <div>
              {repo?.stargazers_count}
            </div>
            <StarIcon className="size-5 ml-2" />
          </div>
        </div>
      ))}
    </Accordion>
  )
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError, refetch, isFetched } = useQuery({
    queryKey: ['userlist', searchQuery],
    queryFn: async () => {
      return await GithubService.getUserList(searchQuery);
    },
    enabled: false,
  });

  return (
    <div>
      <form className="w-[500px]">
        <input
          onChange={event => setSearchQuery(event.target.value)}
          type="text"
          placeholder="Enter username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className="mt-2">
          <button
            disabled={searchQuery?.length < 3 || isLoading}
            onClick={() => refetch()}
            type="button"
            className="flex flex-row justify-center !w-full text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:border-gray-400 disabled:hover:outline-gray-400 disabled:focus:outline-none focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading && (
              <svg
                className="animate-spin mr-1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.364 5.63609L16.95 7.05009C15.8049 5.90489 14.2982 5.19215 12.6865 5.03333C11.0748 4.87451 9.45794 5.27942 8.11134 6.17908C6.76474 7.07874 5.77174 8.41748 5.30154 9.9672C4.83134 11.5169 4.91302 13.1817 5.53268 14.678C6.15234 16.1742 7.27162 17.4093 8.69983 18.1728C10.128 18.9363 11.7768 19.181 13.3652 18.8652C14.9536 18.5493 16.3833 17.6925 17.4108 16.4407C18.4382 15.1889 18.9999 13.6196 19 12.0001H21C21 14.0823 20.278 16.1001 18.957 17.7096C17.6361 19.3192 15.7979 20.4209 13.7557 20.8271C11.7136 21.2333 9.5937 20.9188 7.75737 19.9373C5.92104 18.9557 4.48187 17.3678 3.68506 15.4441C2.88825 13.5204 2.78311 11.3799 3.38756 9.38739C3.992 7.39486 5.26863 5.67355 6.99992 4.51675C8.73121 3.35996 10.81 2.83925 12.8822 3.04336C14.9544 3.24746 16.8917 4.16375 18.364 5.63609V5.63609Z"
                  fill="white"
                />
              </svg>
            )}
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-col w-full mt-4">
        {isFetched && (
          <>
            {!isError ? (
              <>
                {data?.items?.length ? (
                  <>
                    <div className="mb-4">{`Showing users for "${searchQuery}"`}</div>
                    {data?.items?.map(user => (
                      <UserRepoList user={user} />
                    ))}
                  </>
                ) : (
                  <div>No username found</div>
                )}
              </>
            ) : (
              <div>Fetching data error, please try again later!</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;