'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface CheckItem {
  id: string;
  category: 'kara' | 'deniz' | 'motor' | 'arma';
  title: string;
  description: string;
  weight: number; // 1-3 arası kritiklik ağırlığı
  criticalWarning?: string;
}

const CHECKLIST_ITEMS: CheckItem[] = [
  // 1. KARA & GÖVDE TESTLERİ
  {
    id: 'keel-bolts',
    category: 'kara',
    title: 'Salma Saplamaları & Tork Gerilimi',
    description: 'Salma-gövde birleşim cıvatalarında pas, deformasyon veya omurga tabanında "gülümseme" (smile çatlağı) yok.',
    weight: 3,
    criticalWarning: 'Salma saplamasındaki çatlak veya gevşeme seyirde salma düşmesine ve alaboraya yol açabilir!',
  },
  {
    id: 'matrix-delamination',
    category: 'kara',
    title: 'Matrix (Taban Omurga Izgarası) Bütünlüğü',
    description: 'Karaya oturma şüphesi olan bölgelerde cam elyaf turing ızgarasında ayrılma, çatlak veya delaminasyon yok.',
    weight: 3,
    criticalWarning: 'Gövde matrix bağının kopması omurga rijitliğini sıfırlar; tersane ortamında ağır laminasyon gerektirir.',
  },
  {
    id: 'osmosis-moisture',
    category: 'kara',
    title: 'Gövde Nemi & Osmoz Kabarcık Testi',
    description: 'Gövde altı nem ölçer (Sovereign/Tramex) değerleri kabul edilebilir baremde; jelkot altında asetik asit kabarcığı yok.',
    weight: 2,
    criticalWarning: 'Yüksek nem ve yaygın osmoz, jelkot raspası ve 4-6 aylık kurutma/epoksi işlemi gerektirir.',
  },
  {
    id: 'rudder-bearing',
    category: 'kara',
    title: 'Dümen Palası & Kovan Yatak Boşluğu',
    description: 'Dümen milinde radyal/aksiyel aşırı boşluk yok, pala gövdesinde su alma veya şişme embaresi bulunmuyor.',
    weight: 2,
  },
  {
    id: 'seacocks-thru-hulls',
    category: 'kara',
    title: 'Seacock (Gövde Altı Vanaları) & Korozyon',
    description: 'Tüm kinistin vanaları (DZR bronz veya kompozit TruDesign) korozyonsuz, tutukluk yapmadan rahat açılıp kapanıyor.',
    weight: 2,
  },

  // 2. MOTOR & SEVK SİSTEMİ
  {
    id: 'saildrive-diaphragm',
    category: 'motor',
    title: 'Saildrive Kauçuk Taban Körüğü Yaşı',
    description: 'Üretici tavsiyesi olan 5-7 yıllık değişim periyodu aşılmamış, çatlak veya sertleşme gözlenmiyor.',
    weight: 3,
    criticalWarning: 'Yırtılan saildrive körüğü dakikalar içinde sintineyi basarak teknenin batmasına sebep olur.',
  },
  {
    id: 'exhaust-elbow',
    category: 'motor',
    title: 'Egzoz Dirseği (Exhaust Elbow) & Eşanjör',
    description: 'Tuzlu su korozyonu ile tıkanma veya delinme yok; ısı eşanjörü anotları düzenli yenilenmiş.',
    weight: 2,
  },
  {
    id: 'oil-fluid-test',
    category: 'motor',
    title: 'Motor Yağı Emülsiyon & Soğutma Suyu',
    description: 'Yağ kapağında mayonezleşme (su-yağ karışımı) yok; şanzıman yağı berrak ve seviyesinde.',
    weight: 2,
  },
  {
    id: 'shaft-cutlass-bearing',
    category: 'motor',
    title: 'Şaft Braketi & Lastik Yatak (Cutlass)',
    description: 'Şaft salmastrasında damlatma toleransı normal, şaft yatağında aşırı vibrasyon ve boşluk yok.',
    weight: 1,
  },

  // 3. ARMA & YELKEN DONANIMI
  {
    id: 'standing-rigging-age',
    category: 'arma',
    title: 'Sabit Arma (Tel/Rod) Yaşı & Kurtgözleri',
    description: 'Arma teli 10 yıldan yaşlı değil; lif açılması, çarmık ayaklarında korozyon veya rod kafalarında çatlak yok.',
    weight: 3,
    criticalWarning: 'Yorulmuş sabit arma sert havada haber vermeden kırılarak direğin devrilmesine neden olur.',
  },
  {
    id: 'chainplates-bulkhead',
    category: 'arma',
    title: 'Çarmık Ayakları & Ana Perde (Bulkhead)',
    description: 'Çarmık liftinlerinin bağlı olduğu gövde perdesinde su sızıntısı kaynaklı çürüme veya ayrılma yok.',
    weight: 3,
  },
  {
    id: 'spreaders-mast-step',
    category: 'arma',
    title: 'Guruplar & Direk Tabanı (Mast Step)',
    description: 'Direk tabanı kompresyon bloğu ezilmemiş, guruplarda açı sapması ve bükülme izi bulunmuyor.',
    weight: 2,
  },

  // 4. DENİZ TESTİ & ELEKTRİK
  {
    id: 'engine-load-test',
    category: 'deniz',
    title: 'Seyir Altında Tam Yol Motor Yük Testi',
    description: 'Tam yolda hararet stabil (80-88°C), egzozdan mavi veya beyaz aşırı duman atımı yok.',
    weight: 2,
  },
  {
    id: 'bilge-pumps-float',
    category: 'deniz',
    title: 'Sintine Pompaları & Flatör Otomatiği',
    description: 'Manuel ve elektrikli tüm sintine pompaları ile acil durum flatörleri sorunsuz devreye giriyor.',
    weight: 2,
  },
  {
    id: 'battery-bank-charging',
    category: 'deniz',
    title: 'Akü Bankası & Şarj Dinamosu Sağlığı',
    description: 'Servis ve motor aküleri yük altında çökme yapmıyor, sahil besleme ve alternatör voltaj regülasyonu stabil.',
    weight: 1,
  },
];

export default function EkspertizRadariPage() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setCheckedIds(CHECKLIST_ITEMS.map((item) => item.id));
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  // Skor ve İstatistik Analitiği
  const analysis = useMemo(() => {
    const totalWeight = CHECKLIST_ITEMS.reduce((sum, item) => sum + item.weight, 0);
    const checkedWeight = CHECKLIST_ITEMS
      .filter((item) => checkedIds.includes(item.id))
      .reduce((sum, item) => sum + item.weight, 0);

    const score = Math.round((checkedWeight / totalWeight) * 100);

    // Eksik olan yüksek ağırlıklı (weight: 3) kritik maddeler
    const criticalMissing = CHECKLIST_ITEMS.filter(
      (item) => item.weight === 3 && !checkedIds.includes(item.id)
    );

    return {
      score,
      checkedCount: checkedIds.length,
      totalCount: CHECKLIST_ITEMS.length,
      criticalMissing,
    };
  }, [checkedIds]);

  const filteredItems = useMemo(() => {
    if (filterCategory === 'all') return CHECKLIST_ITEMS;
    return CHECKLIST_ITEMS.filter((item) => item.category === filterCategory);
  }, [filterCategory]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white pb-24">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link className="text-xl font-black tracking-wider text-cyan-400 hover:text-cyan-300 transition" href="/">
            PRUVA
          </Link>
          <span className="text-xs uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold tracking-wider">
            Sörvey Radarı
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <Link className="text-slate-400 hover:text-white transition" href="/rating-hesaplayici">
            Rating Simülatörü
          </Link>
          <Link className="text-slate-400 hover:text-white transition" href="/">
            ← Ana Sayfa
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-10 space-y-10">
        {/* Başlık */}
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
              İKİNCİ EL SATIN ALMA &amp; TEKNİK SÖRVEY
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
            İnteraktif Ekspertiz Kontrol Radarı
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
            Tekne alırken veya periyodik tersane bakımında karada ve denizde kontrol edilmesi gereken kritik yapısal
            maddeleri işaretleyin. Sistem anlık kondisyon skoru ve risk analizi üretsin.
          </p>
        </div>

        {/* Canlı Skor & Özet Paneli */}
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400">Tekne Sağlık &amp; Kondisyon Skoru</span>
              <div className="flex items-baseline gap-3 mt-2">
                <span
                  className={`text-6xl font-black font-mono tracking-tight ${
                    analysis.score >= 80
                      ? 'text-emerald-400'
                      : analysis.score >= 50
                      ? 'text-amber-400'
                      : 'text-rose-500'
                  }`}
                >
                  %{analysis.score}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ({analysis.checkedCount} / {analysis.totalCount} Madde Sağlam)
                </span>
              </div>
            </div>

            {/* İlerleme Çubuğu */}
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-500 ${
                  analysis.score >= 80
                    ? 'bg-emerald-500'
                    : analysis.score >= 50
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${analysis.score}%` }}
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {analysis.score === 100
                ? 'Kusursuz kondisyon! İncelenen tüm yapısal, mekanik ve arma bileşenleri tam not aldı.'
                : analysis.score >= 80
                ? 'İyi durumda. Ufak revizyonlarla güvenle seyre çıkılabilir.'
                : analysis.score >= 50
                ? 'Orta riskli gövde. Ciddi masraf çıkarabilecek bazı yapısal veya mekanik soru işaretleri mevcut.'
                : 'Yüksek risk! Salma, arma veya omurga aksamında onaylanmamış kritik maddeler var. Detaylı sörveyör şart.'}
            </p>
          </div>

          {/* Kritik Uyarı Paneli */}
          <div className="md:col-span-7 bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Kritik Risk Radarı ({analysis.criticalMissing.length} Madde Beklemede)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleSelectAll}
                  className="text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer"
                >
                  Tümünü Onayla
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={handleReset}
                  className="text-[11px] font-mono text-slate-400 hover:underline cursor-pointer"
                >
                  Sıfırla
                </button>
              </div>
            </div>

            {analysis.criticalMissing.length > 0 ? (
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {analysis.criticalMissing.map((item) => (
                  <div
                    key={item.id}
                    className="bg-amber-950/20 border border-amber-900/50 p-2.5 rounded-lg flex items-start gap-2.5"
                  >
                    <span className="text-amber-400 font-bold text-xs mt-0.5">⚠</span>
                    <div>
                      <div className="text-xs font-bold text-amber-200">{item.title}</div>
                      <p className="text-[11px] text-amber-300/80 mt-0.5 leading-snug">
                        {item.criticalWarning || item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-emerald-400 text-xs font-mono">
                ✓ Tebrikler, hayati tehlike veya ağır masraf yaratabilecek hiçbir kritik madde boşta kalmadı.
              </div>
            )}

            <div className="text-[11px] text-slate-500 font-mono">
              * Ağırlığı 3 olan maddeler denizde can ve gövde güvenliğini doğrudan etkileyen unsurlardır.
            </div>
          </div>
        </div>

        {/* Kategori Filtresi */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { id: 'all', label: 'Tüm Maddeler' },
            { id: 'kara', label: '1. Kara & Gövde' },
            { id: 'motor', label: '2. Motor & Sevk' },
            { id: 'arma', label: '3. Arma & Direk' },
            { id: 'deniz', label: '4. Deniz Testi & Elektrik' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950'
                  : 'bg-slate-900/70 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Checklist Kartları */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-5 rounded-2xl border transition cursor-pointer flex items-start gap-4 select-none ${
                  isChecked
                    ? 'bg-slate-900/90 border-cyan-500/70 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-black transition ${
                    isChecked
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'border border-slate-700 bg-slate-950 text-transparent'
                  }`}
                >
                  ✓
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`text-sm font-bold transition ${
                        isChecked ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold shrink-0 ${
                        item.weight === 3
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                          : item.weight === 2
                          ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.weight === 3 ? 'Kritik' : item.weight === 2 ? 'Önemli' : 'Rutin'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}