import axios from 'axios';

export default async function getTag({ query }: { query?: string }) {
  try {
    const res = await axios.get(
      `https://plugin-store-api.10web.io/api/public/plugins/tags/${query}`,
    );

    if (res.status !== 200) return undefined;
    return res.data;
  } catch (error) {
    return undefined;
  }
}
