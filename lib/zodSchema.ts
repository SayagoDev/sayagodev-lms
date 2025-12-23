import z from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Music",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" })
    .max(100, { message: "El título debe tener como máximo 100 caracteres" }),
  description: z
    .string()
    .min(3, { message: "La descripción debe tener al menos 3 caracteres" }),
  fileKey: z.string().min(1, { message: "Debes subir un archivo" }),
  price: z.coerce
    .number()
    .min(1, { message: "El precio debe ser al menos $1" }),
  duration: z.coerce
    .number()
    .min(1, { message: "La duración debe ser al menos 1 hora" })
    .max(500, { message: "La duración no debe exceder 500 horas" }),
  level: z.enum(courseLevels, { message: "Nivel de curso inválido" }),
  category: z.enum(courseCategories, { message: "La categoría es necesaria" }),
  smallDescription: z
    .string()
    .min(3, {
      message: "La descripción corta debe tener al menos 3 caracteres",
    })
    .max(200, {
      message: "La descripción corta no debe exceder 200 caracteres",
    }),
  slug: z
    .string()
    .min(3, { message: "El slug debe tener al menos 3 caracteres" }),
  status: z.enum(courseStatus, { message: "Estado del curso inválido" }),
});

export const chapterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  courseId: z.uuid({ message: "El ID del curso es inválido" }),
});

export const lessonSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  courseId: z.uuid({ message: "El ID del curso es inválido" }),
  chapterId: z.uuid({ message: "El ID del capítulo es inválido" }),
  description: z
    .string()
    .min(3, { message: "La descripción debe tener al menos 3 caracteres" })
    .optional(),
  thumbnailKey: z
    .string()
    .min(1, { message: "Debes subir una imagen" })
    .optional(),
  videoKey: z.string().min(1, { message: "Debes subir un video" }).optional(),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
