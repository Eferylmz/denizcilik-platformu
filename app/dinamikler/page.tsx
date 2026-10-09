import Link from 'next/link';

export default function DinamiklerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white pb-24">
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-black tracking-wider text-cyan-400 hover:text-cyan-300 transition">
            PRUVA
          </Link>
          <span className="text-xs uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold tracking-wider">
            Teknik Akademi
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/#modeller" className="hover:text-cyan-400 transition">Modeller</Link>
          <Link href="/dinamikler" className="text-cyan-400">Yelken & Motor Mekaniği</Link>
          <Link
            href="/tekne-bulucu"
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition"
          >
            Tekne Bulucu
          </Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-12 space-y-16">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-full">
            Temel Mühendislik İlkeleri
          </span>
          <h1 className="text-4xl font-black text-white mt-4 tracking-tight">
            Deniz Mekaniği: Yelkenli Nasıl İlerler, Neden Yana Yatar?
          </h1>
          <p className="text-slate-400 text-base mt-3 leading-relaxed">
            Yelken sporu aerodinamik kaldırma kuvveti (lift) ve hidrostatik dengenin hassas bir fizik savaşıdır.
          </p>
        </div>

        <section className="space-y-6 border-t border-slate-800/80 pt-10">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-mono text-xl font-bold">01 //</span>
            <h2 className="text-2xl font-bold text-white">Rüzgarın Uçak Kanadı Etkisi (Lift)</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-white font-semibold text-base">Basınç Farkı ve Emiş Gücü</h3>
              <p>
                Orsa seyrinde yelken kumaşı kanat profili oluşturur. Dış yüzeydeki hızlı hava akışı alçak basınç yaratarak tekneyi çeken kaldırma kuvveti (lift) üretir.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-white font-semibold text-base">Salma ve Doğrultucu Moment</h3>
              <p>
                Rüzgar gövdeyi yatırırken kurşun torpil salma direnç sağlar. Yana yatış (heel) bir sarkaç gibi karşı kuvvet üreten dinamik bir güvenlik dengesidir.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 border-t border-slate-800/80 pt-10">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-mono text-xl font-bold">02 //</span>
            <h2 className="text-2xl font-bold text-white">Motor Yat Sevk Sistemleri ve Gövde Tipleri</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <span className="text-xs font-mono text-cyan-400">GÖVDE TİPİ A</span>
              <h4 className="font-bold text-white">Deplasman</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suyu yararak ilerler. Okyanus menzili sunar (Trawler / Explorer).
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <span className="text-xs font-mono text-cyan-400">GÖVDE TİPİ B</span>
              <h4 className="font-bold text-white">Kayıcı (Planing)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Su üzerinde kayarak 25-35 knot üstüne çıkar, yüksek yakıt tüketir.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <span className="text-xs font-mono text-cyan-400">GÖVDE TİPİ C</span>
              <h4 className="font-bold text-white">Yarı Deplasman</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ekonomik seyir ve 18-22 knot hız esnekliğini dengeler (Azimut Magellano).
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 border-t border-slate-800/80 pt-10">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-mono text-xl font-bold">03 //</span>
          <h2 className="text-2xl font-bold text-white">Türkiye'nin Süperyat Gücü ve 23.95m Tescil Taktiği</h2>
        </div>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Türkiye, 24 metre üzeri süperyat inşasında İtalya'nın ardından dünya genelinde 2. sıradadır.
          </p>
          <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
            <h4 className="font-semibold text-white mb-2">24 Metre Kuralı Nedir?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              24 metre üzerinde personel ve klasman yükümlülükleri artar. Numarine 26XP gibi tekneler gövde boyunu 23.95m tescil ettirerek bu avantajdan faydalanır.
            </p>
          </div>
        </div>
 </section>
    </div>
  </main>
  );
}