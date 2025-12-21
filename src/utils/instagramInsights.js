/**
 * Fetch hourly follower activity from Instagram Insights
 * Uses native fetch (Node 18+ / Node 20 supported)
 */
export const fetchFollowerActivity = async (instagramId, accessToken) => {
  if (!instagramId || !accessToken) {
    throw new Error("Instagram ID or Access Token missing");
  }

  const url = `https://graph.facebook.com/v19.0/${instagramId}/insights
    ?metric=online_followers
    &period=lifetime
    &access_token=${accessToken}`;

  const res = await fetch(url);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Instagram API error: ${errText}`);
  }

  const data = await res.json();

  /**
   * Expected structure:
   * data.data[0].values[0].value = {
   *   "0": 120,
   *   "1": 98,
   *   ...
   *   "23": 340
   * }
   */
  if (
    !data?.data ||
    !Array.isArray(data.data) ||
    !data.data[0]?.values ||
    !data.data[0].values[0]?.value
  ) {
    throw new Error("Invalid insights data structure from Instagram");
  }

  return data.data[0].values[0].value; // hourly map
};

/**
 * Calculate the best hour based on highest followers online
 */
export const calculateBestHour = (hourlyData) => {
  let bestHour = 0;
  let maxFollowers = -1;

  for (const hour in hourlyData) {
    const followers = Number(hourlyData[hour]);

    if (followers > maxFollowers) {
      maxFollowers = followers;
      bestHour = Number(hour);
    }
  }

  return bestHour; // 0–23
};

/**
 * Build ISO timestamp for next best posting time
 */
export const buildBestPostTime = (bestHour) => {
  const now = new Date();
  const postTime = new Date(now);

  postTime.setHours(bestHour, 0, 0, 0);

  // If best hour already passed today → schedule tomorrow
  if (postTime <= now) {
    postTime.setDate(postTime.getDate() + 1);
  }

  return postTime.toISOString();
};
