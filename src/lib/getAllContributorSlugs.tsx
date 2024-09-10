import axios from 'axios';

export default async function getAllContributorsSlugs() {
  try {
    const res = await axios.get(
      `https://9pie1fvxyi.execute-api.us-east-1.amazonaws.com/api/public/plugins/contributors/slugs`,
    );
    if (res.status !== 200) return undefined;
    return res?.data?.data;
  } catch (error) {
    return undefined;
  }
}
