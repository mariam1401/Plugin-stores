import axios from 'axios';

export default async function getAllContributors() {
  try {
    const res = await axios.get(
      'https://plugin-store-api.10web.io/api/public/plugins/contributors?limit=10000&offset=0',
    );

    if (res.status !== 200) return undefined;
    return res.data;
  } catch (error) {
    return undefined;
  }
}
