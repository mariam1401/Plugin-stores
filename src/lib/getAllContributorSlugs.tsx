import axios from 'axios';

export default async function getAllContributorsSlugs() {
  try {
    const res = await axios.get(
      `https://plugin-store-api.10web.io/api/public/plugins/contributors/slugs`,
    );

    if (res.status !== 200) return undefined;
    return res.data;
  } catch (error) {
    return undefined;
  }
}
