export const env = {
  IMGBB_API_KEY: process.env.IMGBB_API_KEY!,
  MONGODB_URI: process.env.MONGODB_URI!,
};

Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing env variable ${key}`);
  }
});
