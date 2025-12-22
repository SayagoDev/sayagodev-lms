import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";

export default function NotAdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 rounded-full p-4 w-fit mx-auto">
            <ShieldX className="size-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Acceso Denegado</CardTitle>
          <CardDescription className="text-lg max-w-xs mx-auto">
            No tienes permisos para acceder a esta página. No tienes permitido
            crear cursos y demás...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link
            href="/"
            className={buttonVariants({
              variant: "default",
              className: "w-full",
            })}
          >
            {" "}
            <ArrowLeft className="mr-1 size-4" /> Volver al Inicio
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
