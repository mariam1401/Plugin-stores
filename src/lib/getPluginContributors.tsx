import axios from 'axios';

export default async function getPluginContributors({
  offset,
  limit,
  slug,
}: {
  offset: number;
  limit: number;
  slug: string;
}) {
  try {
    const res = await axios.get(
      `https://9pie1fvxyi.execute-api.us-east-1.amazonaws.com/api/public/plugins/contributors?limit=${limit}&offset=${offset}&pluginSlug=${slug}`,
    );

    if (res.status !== 200) return undefined;
    return res?.data;
  } catch (error) {
    return undefined;
  }
}
