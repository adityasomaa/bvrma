// Static fallback speakers list — extracted from current bvrma.org homepage.
// Will be replaced by Sanity-driven query once `speaker` documents are migrated.

const speakers = [
  { name: "Rizki Handayani Mustafa", role: "Industry Leader" },
  { name: "Dr. Drs. I Wayan Sumarajaya, M.Si", role: "Academic / Policy" },
  { name: "Dr. Agus Made Yoga Iswara, BBA., BBM., MM., CHA", role: "Hospitality" },
  { name: "Ida Bagus Agung Partha Adnyana", role: "Industry Leader" },
  { name: "Prof. I Nyoman Darma Putra, M.Litt., Ph.D", role: "Academic" },
  { name: "I Kadek Todi Astawan", role: "Industry Leader" },
  { name: "Dr. I Made Sudjana, SE., MM., CHT., CHA", role: "Hospitality" },
  { name: "Agung Juliarta", role: "Operations" },
  { name: "Daniel Santoso", role: "Industry Leader" },
  { name: "Ni Putu Ferryanti, S.S., M.Hum., M.H.", role: "Legal / Policy" },
  { name: "Adhi Guna", role: "Industry Leader" },
  { name: "Rahmi Fajar Harini, M.Si.", role: "Government" },
  { name: "Julie George", role: "International Speaker" },
  { name: "Bart Sobies", role: "International Speaker" },
];

export function SpeakersGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {speakers.map((s) => (
        <div
          key={s.name}
          className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <div
            className="aspect-[4/5] w-full rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 mb-4"
            aria-label="Speaker photo placeholder"
            role="img"
          />
          <div className="font-display text-base font-semibold leading-tight tracking-tight line-clamp-2">
            {s.name}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{s.role}</div>
        </div>
      ))}
    </div>
  );
}
