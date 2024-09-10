import axios from 'axios';

export default async function getPluginsTags({ search }: { search?: string }) {
  try {
    const res = await axios.get(
      `https://9pie1fvxyi.execute-api.us-east-1.amazonaws.com/api/public/plugins/batch-search/${search}/`,
    );

    if (res.status !== 200) return undefined;
    return res?.data?.data;
  } catch (error) {
    return undefined;
  }
}
