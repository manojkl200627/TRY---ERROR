import React from 'react';
import { Skull, ShieldAlert, Cpu, Hammer, Zap, Sparkles } from 'lucide-react';

export const Manifesto = () => {
  const pillars = [
    {
      number: '01',
      title: 'HEAVYWEIGHT OVER MASS PRODUCTION',
      desc: 'We reject razor-thin fast-fashion cotton that falls apart after three cycles. Every garment is cut from 450 to 520 GSM loopback cotton with raw-cut industrial edges.',
      bg: 'bg-neo-yellow',
      icon: Hammer
    },
    {
      number: '02',
      title: 'TACTILE PHYSICALITY & HARDWARE',
      desc: 'Real YKK metal teeth, wire-cut Grade 5 titanium clips, and mechanical keyboard switches. Everything we create delivers a crisp, tactile click.',
      bg: 'bg-neo-cyan',
      icon: Cpu
    },
    {
      number: '03',
      title: 'ANTI-CORPORATE AESTHETICS',
      desc: 'Zero generic pastel gradients. Zero algorithmic blandness. High-voltage contrast, architectural brutalism, and unapologetic loud typography.',
      bg: 'bg-neo-lime',
      icon: Zap
    }
  ];

  return (
    <section id="manifesto-section" className="py-16 sm:py-24 bg-[#FAF7F2] border-b-3 border-black select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="max-w-2xl mb-12">
          <span className="neo-badge bg-black text-white text-xs mb-3">
            MANIFESTO // THE DESIGN ETHOS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight leading-none">
            WHY WE REJECT <br />
            <span className="text-neo-pink underline decoration-4 underline-offset-4">
              BLAND DESIGN.
            </span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-700 mt-4 leading-relaxed">
            In an era where every website, shoe, and hoodie looks like an identical corporate gradient, 
            BRUTAL.CO exists as a high-voltage rebellion. Here is our code:
          </p>
        </div>

        {/* 3 PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="neo-card bg-white p-6 border-3 border-black flex flex-col justify-between hover:-translate-y-1 hover:shadow-brutal-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono font-black text-2xl text-black">
                      {p.number}
                    </span>
                    <div className={`p-2.5 border-2 border-black ${p.bg} shadow-brutal-sm`}>
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                  </div>

                  <h3 className="font-display font-black text-xl leading-tight mb-2 uppercase">
                    {p.title}
                  </h3>

                  <p className="font-mono text-xs text-neutral-700 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between font-mono text-[10px] text-neutral-500">
                  <span>DISPATCH RULE #{idx + 1}</span>
                  <span className="font-bold text-black">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CALLOUT */}
        <div className="mt-12 neo-card bg-black text-white p-6 sm:p-8 border-3 border-black flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neo-pink border-2 border-white flex items-center justify-center shrink-0">
              <Skull className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="font-display font-black text-xl uppercase tracking-tight">
                HAVE A BESPOKE HARDWARE OR COLLAB IDEA?
              </h4>
              <p className="font-mono text-xs text-neutral-400">
                We partner with underground risograph studios, CNC machinists, and synth builders.
              </p>
            </div>
          </div>

          <a
            href="mailto:syndicate@brutal.co"
            className="neo-btn bg-neo-yellow text-black hover:bg-white text-xs px-6 py-3 whitespace-nowrap"
          >
            PING THE VAULT
          </a>
        </div>

      </div>
    </section>
  );
};
