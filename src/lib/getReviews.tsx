import axios from 'axios';

export default async function getReviews({
  offset,
  limit,
  stars,
  slug,
}: {
  stars?: number[];
  offset: number;
  limit: number;
  slug: string;
}) {
  try {
    // Create the stars query parameter string if stars is not empty
    const starsQuery = stars?.length
      ? stars?.map((star) => `stars=${star}`).join('&')
      : '';
    const url = `https://plugin-store-api.10web.io/api/public/plugins/slug/${slug}/reviews/?limit=${limit}&offset=${offset}${
      starsQuery ? `&${starsQuery}` : ''
    }`;

    const res = await axios.get(url);

    if (res.status !== 200) return undefined;
    return res.data;
  } catch (error) {
    return undefined;
  }
}
