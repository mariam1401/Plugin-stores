interface RatingSummary {
  ratingPercentages: {
    [rating: string]: number;
  };
  averageRating: number;
}

export const calculateRatingSummary = (
  ratingCounts: { [p: string]: number } | undefined,
): RatingSummary => {
  if (!ratingCounts) {
    return {
      ratingPercentages: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
      },
      averageRating: 0,
    };
  }
  let totalRatings: number = 0;

  try {
    totalRatings = Object.values(ratingCounts).reduce(
      (acc, count) => acc + count,
      0,
    );
  } catch (e) {
    console.log(e);
  }
  let totalSum = 0;

  // Calculate the sum of all ratings
  for (const rating in ratingCounts) {
    if (ratingCounts[rating] || ratingCounts[rating] === 0) {
      totalSum += parseInt(rating) * ratingCounts[rating];
    }
  }

  // Calculate the average rating
  const averageRating = totalRatings > 0 ? totalSum / totalRatings : 0;

  const roundedAverageRating = parseFloat(averageRating.toFixed(1));

  // Calculate the percentage of each rating type
  const ratingPercentages: { [rating: string]: number } = {};
  for (const rating in ratingCounts) {
    if (ratingCounts[rating] || ratingCounts[rating] === 0) {
      ratingPercentages[rating] = (ratingCounts[rating] / totalRatings) * 100;
    }
  }

  return {
    averageRating: roundedAverageRating,
    ratingPercentages,
  };
};
