import { z } from "zod";

const reviewPieceSchema = z.object({
  value: z.string(),
  label: z.string(),
  authors: z.string(),
  published: z.string(),
  image: z.string(),
});

const postSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  subtitle: z.string().nullable(),
  reviewedPiece: reviewPieceSchema,
  group: z.string(),
  tags: z.array(z.string()).optional(),
  content: z.any(),
  authorRating: z.number().min(0).max(10),
  thumbnail: z.string().nullable(),
});

export default { postSchema };
