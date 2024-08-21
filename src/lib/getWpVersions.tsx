import axios from 'axios';

export default async function getWpVersions() {
  try {
    const res = await axios.get(
      `https://plugin-store-api.10web.io/api/public/plugins/wp-versions`,
    );
    if (res.status !== 200) return undefined;
    return res.data;
  } catch (error) {
    return undefined;
  }
}
