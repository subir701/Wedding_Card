import weddingConfig from "../config/weddingConfig";
import ScrollFade from "./ScrollFade";

function FamilyColumn({ side, members }) {
  return (
    <div className="glass-card p-4 sm:p-6 md:p-8 flex-1 text-center max-w-[210px] sm:max-w-none mx-auto w-full">
      <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold-dark mb-3 sm:mb-6">{side}</p>
      <div className="flex flex-col gap-2 sm:gap-4">
        {members.map((m) => (
          <div key={m.name}>
            <p className="font-heading text-lg sm:text-xl md:text-2xl text-inkbrown">{m.name}</p>
            <p className="text-[9px] sm:text-[11px] tracking-widest uppercase text-inkbrown/50">{m.relation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Family() {
  const { bride, groom } = weddingConfig.family;
  return (
    <ScrollFade className="w-full flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="section-title !text-2xl sm:!text-4xl md:!text-6xl mt-16 sm:mt-8 md:mt-0">
          <span className="block sm:inline">With Loving</span>{" "}
          <span className="block sm:inline">Blessings Of</span>
        </h2>
        <div className="divider-flourish"><span>❀</span></div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-6 sm:mt-10 md:mt-12">
          <FamilyColumn side="Bride's Side" members={bride} />
          <FamilyColumn side="Groom's Side" members={groom} />
        </div>
      </div>
    </ScrollFade>
  );
}