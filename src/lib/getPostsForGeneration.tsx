import axios from 'axios';

export default async function getPostsForGeneration() {
  try {
    const res = await axios.get(
      `https://plugin-store-api.10web.io/api/public/plugins/slugs`,
    );

    if (res.status !== 200) return undefined;
    return res.data;
  } catch (error) {
    return undefined;
  }
}
