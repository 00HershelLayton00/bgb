import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Team from "@/components/team";
import Contact from "@/components/contact";
import BottomNotice from "@/components/bottom-notice";
import Chatbot from "@/components/chatbot";
import ParticleBackground from "@/components/particle-background";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.14),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(0,102,255,0.08),transparent_26%)]" />
      <div className="grid-overlay pointer-events-none absolute inset-0 z-[1] opacity-20" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Team />
          <Contact />
        </main>
      </div>

      <BottomNotice />
      <Chatbot />
    </div>
  );
}
