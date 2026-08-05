import TeamCarousel from "@/components/team-carousel";
import TeamHeading from "@/components/team-heading";
import { listTeamPhotos } from "@/lib/photos";

export default function Team() {
  const photos = listTeamPhotos();

  return (
    <section id="equipo" className="mx-auto hidden max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:block lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <TeamHeading />

        <TeamCarousel photos={photos} />
      </div>
    </section>
  );
}