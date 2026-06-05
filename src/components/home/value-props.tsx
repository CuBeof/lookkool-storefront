import { Heart, RefreshCw, Sparkles, Truck } from "lucide-react";

const props = [
  {
    icon: Truck,
    title: "Always-free shipping",
    desc: "Free on every order — any size, any price. Tracked to your door.",
  },
  {
    icon: Sparkles,
    title: "Hand-picked cute",
    desc: "Every item curated for maximum adorableness.",
  },
  {
    icon: RefreshCw,
    title: "Easy 30-day returns",
    desc: "Not in love? Send it back, no drama.",
  },
  {
    icon: Heart,
    title: "Loved by 12k+",
    desc: "Join a happy little community of cute-collectors.",
  },
];

export function ValueProps() {
  return (
    <section className="border-y bg-card">
      <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {props.map((p) => (
          <div key={p.title} className="flex items-start gap-3">
            <span className="border-border text-foreground grid size-11 shrink-0 place-items-center rounded-full border">
              <p.icon className="size-[18px]" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
