import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";

const isProduction = process.env.NODE_ENV === 'development'
export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: isProduction ? "LIVE" : "DRY_RUN" }),
    detectBot({
      mode: isProduction ? "LIVE" : "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: isProduction ? "LIVE" : "DRY_RUN",
      refillRate: 1,
      interval: 1,
      capacity: 1,
    }),
  ],
});
