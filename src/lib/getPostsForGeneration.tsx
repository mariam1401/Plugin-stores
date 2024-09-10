import axios from 'axios';

export default async function getPostsForGeneration() {
  try {
    const res = await axios.get(
      `https://9pie1fvxyi.execute-api.us-east-1.amazonaws.com/api/public/plugins/slugs`,
    );

    if (res.status !== 200) return undefined;
    return res?.data?.data;
  } catch (error) {
    return undefined;
  }
}
