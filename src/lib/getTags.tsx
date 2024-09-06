import axios from 'axios';
import { PAGE_PER_LIMIT } from '@/lib/consts';

export default async function getTags({
  query,
  limit,
  page,
}: {
  query?: string;
  limit?: number;
  page: number;
}) {
  try {
    const res = await axios.get(
      `https://plugin-store-api.10web.io/api/public/plugins/tags?limit=${limit ?? PAGE_PER_LIMIT}&offset=${(page - 1) * PAGE_PER_LIMIT}${query ? `&query=${query}` : ''}&published-only=true`,
    );
    if (res.status !== 200) return undefined;
    return res.data;
  } catch (error) {
    return undefined;
  }
}
