import ContentLoader from 'react-content-loader';

const RepoListLoader = () => (
  <ContentLoader
    speed={2}
    width={460}
    height={70}
    viewBox="0 0 460 70"
    backgroundColor="#9CA3AF"
    foregroundColor="#6B7280"
    style={{ width: '100%' }}
  >
    <rect x="8" y="8" rx="8" ry="8" width="150" height="25" />
    <rect x="8" y="43" rx="8" ry="8" width="150" height="25" />
    <rect x="410" y="8" rx="8" ry="8" width="40" height="25" />
  </ContentLoader>
);

export default RepoListLoader;
