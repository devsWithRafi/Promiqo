import * as z from 'zod';

export const imageUploadFormSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters.')
    .max(32, 'Title must be at most 32 characters.'),
  description: z
    .string()
    .max(100, 'Description must be at most 100 characters.'),
  prompt: z.array(
    z.object({
      value: z.string().min(10, 'Prompt must be at least 10 characters.'),
    }),
  ),
  category: z.string('Select a category.').min(1, 'Select a category.'),
  tags: z.array(z.string()),
  postType: z.enum(['image', 'video']),
});
