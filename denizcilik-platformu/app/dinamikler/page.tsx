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
            Yelken sporu romantik bir rüzgar itişi değil; aerodinamik kaldırma kuvveti (lift) ve suyun altındaki hidrostatik dengenin hassas bir fizik savaşıdır.
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
                Yelkenli rüzgarı yalnızca arkadan alarak itilmez. Rüzgara karşı orsa seyrinde yelken kumaşı uçak kanadı formu alır. 
                Dış bükey taraftaki hızlı hava akışı alçak basınç üreterek tekneyi ileri ve yana çeken bir emiş gücü (lift) yaratır.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-white font-semibold text-base">Salma (Keel) ve Doğrultucu Moment</h3>
              <p>
                Yelken gövdeyi devirmeye çalışırken altındaki kurşun torpilli salma direnç gösterir. 
                Tekne yana yattıkça salma sarkaç gibi aksi yönde doğrultucu moment üretir; yani bayılma arıza değil, dinamik bir güvenlik dengesidir.
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
                Suyu yararak ilerler. Hızı gövde boyuyla sınırlıdır fakat fırtınaya en dirençli formdur; Trawler/Explorer modellerin 3.000+ mil menzil sırrıdır.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <span className="text-xs font-mono text-cyan-400">GÖVDE TİPİ B</span>
              <h4 className="font-bold text-white">Kayıcı (Planing)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yüksek makine gücüyle suyu altına alır, su üstünde kayar. 25-35 knot üstü hız yapar ancak dalgada sert çarpar ve yakıt sarfiyatı yüksektir.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <span className="text-xs font-mono text-cyan-400">GÖVDE TİPİ C</span>
              <h4 className="font-bold text-white">Yarı Deplasman</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                İki yapıyı dengeler. Düşük hızda deplasman ekonomisi, istendiğinde 18-22 knot hız sağlar (Örn: Azimut Magellano Dual Mode).
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-800/50 mt-4 space-y-3">
            <h3 className="font-bold text-cyan-300">Saildrive vs. Düz Şaft vs. Volvo IPS Pod Sistemleri</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Yelkenlilerde kompakt ve sessiz Saildrive; motor yatlarda ise geleneksel düz şaftların yerini joystickle milimetrik yanaşma sağlayan bağımsız döner Volvo Penta IPS pod sistemleri almıştır.
            </p>
          </div>
        </section>

        <section className="space-y-6 border-t border-slate-800/80 pt-10">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-mono text-xl font-bold">03 //</span>
            <h2 className="text-2xl font-bold text-white">Türkiye'nin Süperyat Gücü ve 23.95m Tescil Taktiği</h2>
          </div>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              Türkiye, 24m üzeri süperyat inşasında 146 aktif projeyle İtalya'nın ardından dünya genelinde 2. sıradadır. Bilgin, Turquoise, Sirena ve Numarine küresel ligdedir.
            </p>
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
              <h4 className="font-semibold text-white mb-2">24 Metre Kuralı Nedir?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                24 metre üstünde zorunlu gemi adamı sayısı, klas denetimleri ve liman harçları katlanır. Numarine 26XP tam boyu 26 metre olmasına rağmen 23.95m olarak tescil edilir; armatöre süperyat hacmini küçük tekne bürokrasisi ve düşük masraflarıyla sunar.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}