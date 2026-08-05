import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Team from "@/components/team";
import Services from "@/components/services";
import Contact from "@/components/contact";
import Stats from "@/components/stats";
import BottomNotice from "@/components/bottom-notice";
import Chatbot from "@/components/chatbot";
import ParticleBackground from "@/components/particle-background";
import { listTeamPhotos } from "@/lib/photos";

export default function Page() {
  const teamPhotos = listTeamPhotos();

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.09),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(0,102,255,0.05),transparent_26%)]" />
      <div className="grid-overlay pointer-events-none absolute inset-0 z-[1] opacity-10" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero teamPhotos={teamPhotos} />
          <Team />
          <Services />
          <Contact />
          <Stats />
        </main>
      </div>

      <BottomNotice />
      <Chatbot />
    </div>
  );
}
