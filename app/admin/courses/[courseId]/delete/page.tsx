"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useTransition } from "react";
import { deleteCourse } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2Icon, Trash2Icon } from "lucide-react";

export default function DeleteCoursePage() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));

      if (error) {
        console.log(error);
        toast.error(
          "Ocurrió un error inesperado. Por favor, inténtalo de nuevo."
        );
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        router.push("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <div className="max-w-xl mx-auto w-full">
      <Card className="mt-32">
        <CardHeader>
          <CardTitle>
            ¿Estás seguro de que quieres eliminar este curso?
          </CardTitle>
          <CardDescription>
            Esta acción no puede ser revertida. Este curso será eliminado
            permanentemente.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Link
            href={`/admin/courses`}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancelar
          </Link>
          <Button variant="destructive" onClick={onSubmit} disabled={pending}>
            {pending ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2Icon className="size-4" />
                Eliminar Curso
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
