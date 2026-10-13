import Link from 'next/link';
import boatsData from '../data/boats.json';
import DailyMaritime from '@/components/DailyMaritime';
import dailyData from '@/data/termsAndQuiz.json';

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
  targetAudience?: string;
}

const boats: Boat[] = boatsData as unknown as Boat[];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white pb-20">
      {/* Üst Menü */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-black tracking-wider text-cyan-400">PRUVA</Link>
          <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold tracking-wider hidden sm:inline-block">
            Naval Architecture &amp; Rating Telemetry
          </span>
        </div>
        <nav className="flex items-center gap-4 sm:gap-6 text-xs md:text-sm font-medium text-slate-300">
          <a href="#filo" className="hover:text-cyan-400 transition font-mono">Filo Analizi</a>
          <Link href="/rating-hesaplayici" className="hover:text-cyan-400 transition hidden md:inline-block font-mono">
            VPP / Rating
          </Link>
          <Link href="/ekspertiz-radari" className="text-amber-400 hover:text-amber-300 font-semibold transition flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Teknik Sörvey
          </Link>
          <Link href="/dinamikler" className="hover:text-cyan-400 transition hidden lg:inline-block font-mono">Hidrodinamik</Link>
          <Link
            href="/tekne-bulucu"
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition font-mono"
          >
            Seçim Sihirbazı
          </Link>
        </nav>
      </header>

      {/* Hero Bölümü */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center lg:text-left grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            GLOBAL SUPERYACHT ORDER BOOK // #2 TÜRKİYE TERSANELERİ
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white mb-6">
            Denizcilik Mühendisliği, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Kutup Polarları &amp; Sörvey
            </span> Analitiği.
          </h1>
          <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
            Broşür söylemlerini eleyin. Gerçek gövde hidrodinamiği, IRC/ORC handikap optimizasyonu, 38–44 ft Akdeniz likidite baremleri ve yapısal omurga sörvey kriterleri.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link 
              href="/tekne-bulucu" 
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition shadow-xl shadow-cyan-950/50 text-sm"
            >
              Gövde &amp; Kullanım Eşleştirme Motoru
            </Link>
            <Link 
              href="/rating-hesaplayici" 
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-semibold px-6 py-3.5 rounded-xl transition flex items-center gap-2 text-sm font-mono"
            >
              <span>⚡ IRC / ORC Simülatörü</span>
            </Link>
            <a 
              href="#filo" 
              className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-semibold px-5 py-3.5 rounded-xl transition text-sm"
            >
              Filoyu İncele
            </a>
          </div>
        </div>

        {/* Özet Veri Paneli (Telemetri Kutuları) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">Global Tescil Sıralaması</span>
            <div className="text-3xl font-black text-cyan-400 font-mono mt-0.5">146 Proje</div>
            <div className="text-[11px] text-slate-400 mt-1">Türkiye megayat inşasında küresel 2. sıra</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">Piyasa Likidite Bandı</span>
            <div className="text-3xl font-black text-blue-400 font-mono mt-0.5">38–44 ft</div>
            <div className="text-[11px] text-slate-400 mt-1">En yüksek ikinci el sirkülasyon hacmi</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">Klaslama / Tescil Eşiği</span>
            <div className="text-3xl font-black text-emerald-400 font-mono mt-0.5">23.95 m</div>
            <div className="text-[11px] text-slate-400 mt-1">Tam boyda (LOA) küçük tekne kural avantajı</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">İşletme Bütçe Çarpanı</span>
            <div className="text-3xl font-black text-amber-400 font-mono mt-0.5">%10 Kuralı</div>
            <div className="text-[11px] text-slate-400 mt-1">Yıllık marina, bakım ve sigorta amortismanı</div>
          </div>
        </div>
      </section>

      {/* İnteraktif Mühendislik & Sörvey Panelleri */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rating Kartı */}
          <div className="bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-900 border border-cyan-800/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-full">
                Hidrodinamik Telemetri
              </span>
              <h2 className="text-xl font-bold text-white pt-1">IRC TCC &amp; ORC GPH Handikap Simülasyonu</h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Su hattı boyu (LWL), deplasman, orsa yelken alanı ve sevk donanımı (katlanır pervane/baston) konfigürasyonunun reytinge net etkisini hesaplayın.
              </p>
            </div>
            <Link
              href="/rating-hesaplayici"
              className="inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition text-xs shadow-md shadow-cyan-950/50 font-mono"
            >
              Simülatörü Başlat →
            </Link>
          </div>

          {/* Ekspertiz Radarı Kartı */}
          <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-800/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950 border border-amber-800 px-3 py-1 rounded-full">
                Yapısal Denetim Matrisi
              </span>
              <h2 className="text-xl font-bold text-white pt-1">İnteraktif Sörvey &amp; Ekspertiz Radarı</h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Salma tork saplamaları, taban ızgarası (matrix) delaminasyonu, saildrive kauçuk diyafram ömrü ve osmoz nem değerlerini denetleyin.
              </p>
            </div>
            <Link
              href="/ekspertiz-radari"
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition text-xs shadow-md shadow-amber-950/50 font-mono"
            >
              Sörvey Protokolünü Aç →
            </Link>
          </div>
        </div>
      </section>

      {/* Günün Terimi & Quiz */}
      <div className="max-w-6xl mx-auto px-6 my-12">
        <DailyMaritime data={dailyData} />
      </div>

      {/* Model Kartları Bölümü */}
      <section id="filo" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
              GÖVDE MİMARİSİ VE ANALİTİK VERİTABANI
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">Karakteristik Filo Analizi</h2>
            <p className="text-slate-400 mt-1 text-sm">
              Grand Prix yarış platformlarından, yüksek likiditeli gezi gövdelerine ve yarı-deplasman motoryatlara.
            </p>
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
                  <span className="text-[11px] font-mono uppercase font-semibold px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {boat.segment}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{boat.origin}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-0.5">{boat.name}</h3>
                <p className="text-xs text-slate-400 font-mono mb-3">Naval Architect: {boat.designer}</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{boat.highlight}</p>
                
                <div className="space-y-1.5 mb-6">
                  <span className="text-[11px] text-slate-500 font-mono uppercase block mb-1">Hidrodinamik / Yapısal Artılar:</span>
                  {boat.pros.map((pro: string, index: number) => (
                    <div key={index} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-cyan-400 font-bold shrink-0">✓</span>
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                {boat.targetAudience && (
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Operasyonel Profil:</span>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">{boat.targetAudience}</p>
                  </div>
                )}
                <Link
                  href={`/tekne/${boat.id}`}
                  className="block text-center w-full py-2.5 rounded-lg bg-slate-800/90 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-mono font-bold transition uppercase tracking-wider"
                >
                  Teknik Sörvey &amp; Veri Raporu →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}