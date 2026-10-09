import Link from 'next/link';
import boatsData from '../data/boats.json';
interface Boat {
  id: string;
  name: string;
  segment: string;
  category: string;
  origin: string;
  designer: string;
  hullEngine: string;
  highlight: string;
  pros: string[];
  targetAudience: string;
}

const boats: Boat[] = boatsData as Boat[];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Üst Menü */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-wider text-cyan-400">PRUVA</span>
          <span className="text-xs uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold tracking-wider">
            Yarış &amp; Pazar Analizi
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
  <a href="#modeller" className="hover:text-cyan-400 transition">Modeller</a>
  <Link href="/dinamikler" className="hover:text-cyan-400 transition">Yelken & Motor Mekaniği</Link>
  <Link
    href="/tekne-bulucu"
    className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition"
  >
    Tekne Bulucu
  </Link>
</nav>
        
      </header>

      {/* Hero Bölümü */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-400 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Türkiye Süperyat Üretiminde Dünya 2.&apos;si
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Yat ve Yelken Dünyasına <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Yarışçı Gözüyle
            </span> Bağımsız Bakış.
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-xl leading-relaxed">
            Piyasa broşürlerini bir kenara bırakın. Gerçek gövde hidrodinamiği, IRC handikap katsayıları, 38-44 ft likidite oranları ve 24 metre mevzuat analizleri burada.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link 
              href="/tekne-bulucu" 
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition shadow-xl shadow-cyan-950"
            >
              Hangi Tekne Sana Uygun? (Testi Çöz)
            </Link>
            <a 
              href="#modeller" 
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-6 py-3.5 rounded-xl transition"
            >
              Modelleri İncele
            </a>
          </div>
        </div>

        {/* Özet Veri Paneli */}
        <div className="grid grid-cols-2 gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="text-3xl font-black text-cyan-400">146</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Türkiye Aktif Süperyat Projesi (Dünya 2.&apos;si)</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="text-3xl font-black text-blue-400">38-44 ft</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">İkinci El Yelkenlide En Hızlı Likidite Aralığı</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="text-3xl font-black text-emerald-400">23.95 m</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Mevzuatta Küçük Tekne Avantaj Sınırı</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="text-3xl font-black text-amber-400">%10 Kuralı</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Yıllık Ortalama Tekne İşletme &amp; Marina Bütçesi</div>
          </div>
        </div>
      </section>

      {/* Model Kartları Bölümü */}
      <section id="modeller" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Öne Çıkan Modeller ve Analizler</h2>
            <p className="text-slate-400 mt-2 text-sm">Grand Prix yarışçılardan, likit aile kruvazörlerine ve keşif yatlarına.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boats.map((boat: Boat) => (
            <div 
              key={boat.id} 
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {boat.segment}
                  </span>
                  <span className="text-xs text-slate-400">{boat.origin}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{boat.name}</h3>
                <p className="text-xs text-cyan-400 font-medium mb-4">Tasarım: {boat.designer}</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{boat.highlight}</p>
                
                <div className="space-y-1.5 mb-6">
                  {boat.pros.map((pro: string, index: number) => (
                    <div key={index} className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">✓</span> {pro}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 block mb-1">Hedef Kitle:</span>
                <p className="text-xs text-slate-300 font-medium">{boat.targetAudience}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}