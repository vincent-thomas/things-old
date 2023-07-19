export const getUser = (token: string) => {
  return fetch('http://localhost:4200/oauth/current-user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json());
};
