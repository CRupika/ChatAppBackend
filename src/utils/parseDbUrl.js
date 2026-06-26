export const parseDbUrl = (url) => {
  // Example: postgres://postgres:postgres123@localhost/medusa-my-medusa-store
  const regex = /^postgres:\/\/([^:]+):([^@]+)@([^:]+):?(\d+)?\/(.+)$/;
  const matches = url.match(regex);
  
  if (!matches) {
    throw new Error('Invalid database URL format');
  }

  return {
    user: matches[1],
    password: matches[2],
    host: matches[3],
    port: matches[4] || 5432,
    database: matches[5],
  };
};