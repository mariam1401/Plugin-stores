import axios from 'axios';

export default async function getCategories() {
  try {
    const res = await axios.get(
      `https://9pie1fvxyi.execute-api.us-east-1.amazonaws.com/api/public/plugins/categories`,
    );

    if (res.status !== 200) return undefined;
    return res?.data?.data;
  } catch (error) {
    return undefined;
  }
}
