import axios from 'axios';

export default async function getContributor(slug: string) {
  try {
    const res = await axios.get(
      `https://plugin-store-api.10web.io/api/public/plugins/contributors/${slug}`,
    );

    if (res.status !== 200) return undefined;
    return res.data;
  } catch (error) {
    return undefined;
  }
}
