import axios from 'axios';

export default async function getPost(slug: string) {
  try {
    const res = await axios.get(
      `https://9pie1fvxyi.execute-api.us-east-1.amazonaws.com/api/public/plugins/slug/${slug}`,
    );
    if (res.status !== 200) {
      return undefined;
    }
    return res?.data?.data[0];
  } catch (error) {
    return undefined;
  }
}
