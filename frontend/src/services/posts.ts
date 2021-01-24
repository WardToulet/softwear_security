// TODO: set the url by .env
const API = `http://localhost:8090`;

/**
 * Get's all posts from the api
 *
 * @returns List of Posts
 * @throws Error if the api is unreachable, or auth error
 */
const getAll = async () => {
  const res = await fetch(`${API}/post`, {
    headers: {
      Accept: 'application/json',
    }
  });

  const json = await res.json(); 

  return json;
}

/**
 * Get a post by id
 *
 * @param Id
 * @returns Post | null
 */
const getById = async (id: string) => {
  const res = await fetch(`${API}/episode/${id}`, {
    headers: {
      Accept: 'Application/JSON'
    }
  });

  const json = await res.json();

  return json;
}

export { getAll, getById };
