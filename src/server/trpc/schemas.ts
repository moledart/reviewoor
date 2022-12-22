import { z } from "zod";

const reviewPieceSchema = z.object({
  value: z.string(),
  label: z.string(),
  authors: z.string(),
  published: z.string(),
  image: z.string(),
});

const postSchema = z.object({
  title: z.string(),
  reviewedPiece: reviewPieceSchema,
  group: z.string(),
  tags: z.array(z.string()).optional(),
  content: z.any(),
  authorRating: z.number().min(0).max(10),
  thumbnail: z.string(),
});

export default { postSchema };
