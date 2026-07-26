import { Button } from "@/components/ui/button";
import { Monogram } from "@/components/monogram";
import { Stars } from "@/components/voyage/stars";

/**
 * La page introuvable, écrite dans la langue du site plutôt qu'en gris par
 * défaut : on est au large, on a perdu le cap, et on propose deux routes.
 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden bg-marine-400 text-sable">
      <Stars />
      <div className="container relative flex flex-col items-center py-32 text-center">
        <Monogram className="h-12 w-12 text-brass" />

        <p className="mt-8 font-serif text-5xl italic tabular-nums text-brass/50 md:text-6xl">
          404
        </p>
        <h1 className="mt-4 max-w-lg font-serif text-3xl italic leading-tight md:text-4xl">
          Cette page a quitté le mouillage.
        </h1>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-sable/70">
          Le lien que vous avez suivi ne mène nulle part. La mer, elle, est
          toujours là.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href="/" variant="primary">
            Revenir au port
          </Button>
          <Button
            href="/reserver"
            variant="outline"
            className="border-sable/40 text-sable hover:bg-sable/10"
          >
            Réserver une date
          </Button>
        </div>
      </div>
    </main>
  );
}
