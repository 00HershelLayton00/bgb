import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Team from "@/components/team";
import Contact from "@/components/contact";
import BottomNotice from "@/components/bottom-notice";
import Chatbot from "@/components/chatbot";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(0,102,255,0.12),transparent_24%)]" />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Team />
        <Contact />
      </main>

      <BottomNotice />
      <Chatbot />
    </div>
  );
}
