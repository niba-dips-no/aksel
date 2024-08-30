import type { NextApiRequest, NextApiResponse } from "next";

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.SANITY_PREVIEW_TOKEN) {
    return res.status(200).json({ message: "Found token preview" });
  }

  /* This keys is only for testing and will not compromise anything if leaked! */
  if (process.env.sanity_demo_key) {
    return res.status(200).json({
      message: `Found token demo-key : ${process.env.sanity_demo_key}`,
    });
  }
  return res.status(404).json({ message: "No token found" });
}
