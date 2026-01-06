import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-16 bg-[#050607]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.06),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/60" />
      </div>

      <div className="max-w-4xl w-full relative">
        <div className="rounded-3xl border border-white/10 bg-white/10 shadow-[0_25px_90px_-30px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-10 md:p-14 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/15 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold shadow-soft">
            <Sparkles className="w-4 h-4" />
            Vanij App Studio
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-tight mt-6 mb-4 drop-shadow-[0_5px_25px_rgba(0,0,0,0.45)]">
            Build something beautiful.
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
            Vanij App Studio is your AI coding platform—pair-programming brains,
            design instincts, and instant previews working together so you ship
            polished apps faster.
          </p>

          <div className="mt-12 grid sm:grid-cols-3 gap-4 text-sm text-white/75">
            <GlassCard title="AI pair builder">
              Generate clean React flows, hooks, and states with guided prompts—
              review diffs before they land.
            </GlassCard>
            <GlassCard title="Design-smart output">
              Tokens, spacing, and component variants stay on-brand; glassy dark
              defaults ready to theme.
            </GlassCard>
            <GlassCard title="Ship-grade previews">
              One-click live previews and checks keep every iteration deployable
              and demo-ready.
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const GlassCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-soft backdrop-blur-lg">
    <div className="flex items-center gap-2 text-white font-semibold">
      <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-glow" />
      <span>{title}</span>
    </div>
    <p className="mt-2 text-white/60 leading-relaxed">{children}</p>
  </div>
);

const BadgePill = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-4 py-2 shadow-soft backdrop-blur">
    <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
    <span>{children}</span>
  </div>
);

export default Index;
