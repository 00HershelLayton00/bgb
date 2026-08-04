import fs from "fs";
import path from "path";
import TeamCarousel from "@/components/team-carousel";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function listTeamPhotos(): string[] {
  const dir = path.join(process.cwd(), "public");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => {
      const na = Number.parseInt(a.match(/\d+/)?.[0] ?? "", 10);
      const nb = Number.parseInt(b.match(/\d+/)?.[0] ?? "", 10);
      if (Number.isFinite(na) && Number.isFinite(nb) && na !== nb) return na - nb;
      return a.localeCompare(b);
    })
    .map((file) => `/${file}`);
}

export default function Team() {
  const photos = listTeamPhotos();

  return (
    <section id="equipo" className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#7fb2ff]">Equipo</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Un equipo pequeño, rapido y enfocado en resultados.
          </h2>
          <p className="mt-4 max-w-xl text-white/80">
            Ideal para clientes que quieren una imagen seria sin complicarse con detalles tecnicos.
          </p>
        </div>

        <TeamCarousel photos={photos} />
      </div>
    </section>
  );
}