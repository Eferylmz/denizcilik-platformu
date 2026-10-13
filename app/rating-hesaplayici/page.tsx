'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface OptimizationImpact {
  item: string;
  tccDelta: number;
  gphDelta: number;
  tacticalNote: string;
  category: 'pervane' | 'yelken' | 'arma';
}

export default function RatingHesaplayiciPage() {
  // Temel Parametreler (Varsayılan: Modern 40ft Racer/Cruiser referansı)
  const [lwl, setLwl] = useState<number>(10.5); // Metre
  const [displacement, setDisplacement] = useState<number>(7500); // Kilogram
  const [sailArea, setSailArea] = useState<number>(88); // Metrekare (Anayelken + Cenova/Flok)
  const [draft, setDraft] = useState<number>(2.4); // Metre

  // Konfigürasyon Seçimleri
  const [propellerType, setPropellerType] = useState<'folding' | 'fixed'>('folding');
  const [spinnakerType, setSpinnakerType] = useState<'asymmetric' | 'symmetric'>('asymmetric');
  const [mastMaterial, setMastMaterial] = useState<'carbon' | 'aluminum'>('aluminum');
  const [bowsprit, setBowsprit] = useState<boolean>(true);

  // Hesaplama Motoru
  const results = useMemo(() => {
    // 1. Su Hattı Boyu (Feet cinsinden ara formül için)
    const lwlFeet = lwl * 3.28084;
    
    // 2. Metrik Ton
    const dispTon = displacement / 1000;
    
    // 3. Deplasman - Hacim (m3) (Deniz suyu yoğunluğu ~ 1025 kg/m3)
    const dispVolume = displacement / 1025;

    // 4. Sail Area / Displacement Ratio (SA/D)
    // SA / (Disp_vol ^ (2/3))
    const saDispRatio = sailArea / Math.pow(dispVolume, 2 / 3);

    // 5. Displacement / Length Ratio (D/L)
    // (Disp in Long Tons) / ( (0.01 * LWL_ft) ^ 3 )
    const dispLongTons = displacement / 1016.05;
    const dlRatio = dispLongTons / Math.pow(0.01 * lwlFeet, 3);

    // 6. Teorik Gövde Hızı (Hull Speed) = 1.34 * sqrt(LWL_ft)
    const theoreticalHullSpeedKnots = 1.34 * Math.sqrt(lwlFeet);

    // 7. Baz IRC TCC Tahmini Hesabı
    // Baz katsayı formülü: LWL, Draft ve Güç Oranına göre kalibre edilmiş yaklaşık model
    let baseTcc = 0.860 + (0.018 * lwl) + (0.0055 * saDispRatio) + (0.015 * (draft - 1.8));

    // Ekipman & Konfigürasyon Düzeltmeleri
    if (propellerType === 'fixed') {
      baseTcc -= 0.018; // Sabit pervane sürüklenme yaratır, TCC düşer (indirim alır)
    } else {
      baseTcc += 0.003; // Katlanır pervane hidrodinamik olarak daha serbesttir
    }

    if (mastMaterial === 'carbon') {
      baseTcc += 0.012; // Karbon direk ağırlık merkezini düşürür, katsayı artar
    }

    if (spinnakerType === 'asymmetric' && bowsprit) {
      baseTcc += 0.006; // Baston + asimetrik alan cezası
    }

    // 8. ORC GPH (General Purpose Handicap - s/nm)
    // ORC mantığında: TCC yükseldikçe GPH düşer (tekne mili daha kısa sürede geçer)
    // Yaklaşık bağıntı: GPH ~ 600 / TCC
    const estimatedGph = 600 / baseTcc;

    return {
      saDispRatio: Number(saDispRatio.toFixed(2)),
      dlRatio: Math.round(dlRatio),
      hullSpeed: Number(theoreticalHullSpeedKnots.toFixed(2)),
      tcc: Number(baseTcc.toFixed(3)),
      gph: Number(estimatedGph.toFixed(1)),
    };
  }, [lwl, displacement, sailArea, draft, propellerType, spinnakerType, mastMaterial, bowsprit]);

  // Optimizasyon Reçeteleri ve Stratejik Farklar
  const optimizationTips: OptimizationImpact[] = [
    {
      item: 'Sabit Pervaneden 2-Kanat Katlanır Pervaneye Geçiş',
      tccDelta: +0.018,
      gphDelta: -11.0,
      category: 'pervane',
      tacticalNote:
        'IRC reytinginiz yaklaşık 18-20 puan yükselir; ancak hafif havada ve orsa seyrinde teknenin kazandığı 0.35-0.55 knot sürüklenme avantajı bu puan cezasını denizde fazlasıyla amorti eder.',
    },
    {
      item: 'Simetrik Balondan Asimetrik (Bastonlu) Donanıma Geçiş',
      tccDelta: +0.008,
      gphDelta: -5.0,
      category: 'yelken',
      tacticalNote:
        'Apaz ve geniş apaz rotalarında VMG dramatik artar, kavança operasyonu kolaylaşır. Ancak tam pupa (DDW) şamandıra yarışlarında rota açısı uzayabilir.',
    },
    {
      item: 'Karbon Arma Donanımı (Alüminyum Yerine)',
      tccDelta: +0.012,
      gphDelta: -7.5,
      category: 'arma',
      tacticalNote:
        'Direğin tepe ağırlığı %30-40 azalır. Doğrultucu moment (Righting Moment) ciddi oranda arttığı için tekne daha az bayılır ve orsa açısı 1.5 - 2 derece daralır.',
    },
    {
      item: 'İç Balast Ekleyerek Deplasmanı %5 Arttırmak',
      tccDelta: -0.009,
      gphDelta: +5.5,
      category: 'arma',
      tacticalNote:
        'Hafif havalarda tekneyi yapıştırır ve kalkışı geciktirir; fakat 18+ knot sert rüzgarlı regattalarda teknenin bayılmasını engelleyerek TCC avantajı sağlar.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white pb-24">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link className="text-xl font-black tracking-wider text-cyan-400 hover:text-cyan-300 transition" href="/">
            PRUVA
          </Link>
          <span className="text-xs uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold tracking-wider">
            Simülatör
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <Link className="text-slate-400 hover:text-white transition" href="/tekne-bulucu">
            Tekne Bulucu
          </Link>
          <Link className="text-slate-400 hover:text-white transition" href="/">
            ← Ana Sayfa
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-10 space-y-10">
        {/* Başlık & Açıklama */}
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
              IRC & ORC MÜHENDİSLİK PANELİ
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
            Rating & Handikap Simülatörü
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
            Su hattı, deplasman, yelken alanı ve donanım konfigürasyonunu değiştirerek teknenizin tahmini{' '}
            <strong className="text-cyan-400">IRC TCC</strong> katsayısını ve{' '}
            <strong className="text-emerald-400">ORC GPH</strong> değerini anlık simüle edin.
          </p>
        </div>

        {/* Ana Grid: Sol Girişler / Sağ Canlı Sonuç Kartı */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sol Kolon: Parametre Girdileri (7 Kolon) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                1. Temel Gövde & Hidrodinamik Girdiler
              </h2>

              {/* Slider 1: LWL */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 font-bold">LWL (Su Hattı Boyu)</span>
                  <span className="text-cyan-400 font-bold text-sm">{lwl.toFixed(2)} m</span>
                </div>
                <input
                  type="range"
                  min="6.5"
                  max="20.0"
                  step="0.05"
                  value={lwl}
                  onChange={(e) => setLwl(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>6.5 m (Mini/J24)</span>
                  <span>10.5 m (40ft Sınıfı)</span>
                  <span>20.0 m (Maxi)</span>
                </div>
              </div>

              {/* Slider 2: Deplasman */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 font-bold">Deplasman (Boş/Yarış Ağırlığı)</span>
                  <span className="text-cyan-400 font-bold text-sm">{displacement.toLocaleString('tr-TR')} kg</span>
                </div>
                <input
                  type="range"
                  min="1200"
                  max="25000"
                  step="50"
                  value={displacement}
                  onChange={(e) => setDisplacement(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1.200 kg (Spor Bot)</span>
                  <span>7.500 kg (Racer/Cruiser)</span>
                  <span>25.000 kg (Ağır Gezi)</span>
                </div>
              </div>

              {/* Slider 3: Yelken Alanı */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 font-bold">Orsa Yelken Alanı (Anayelken + Flok)</span>
                  <span className="text-cyan-400 font-bold text-sm">{sailArea} m²</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="240"
                  step="1"
                  value={sailArea}
                  onChange={(e) => setSailArea(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>20 m²</span>
                  <span>88 m²</span>
                  <span>240 m²</span>
                </div>
              </div>

              {/* Slider 4: Salma Draftı */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 font-bold">Salma Su Çekimi (Draft)</span>
                  <span className="text-cyan-400 font-bold text-sm">{draft.toFixed(2)} m</span>
                </div>
                <input
                  type="range"
                  min="1.20"
                  max="4.50"
                  step="0.05"
                  value={draft}
                  onChange={(e) => setDraft(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1.20 m (Sığ Salma)</span>
                  <span>2.40 m (Performans)</span>
                  <span>4.50 m (Grand Prix)</span>
                </div>
              </div>
            </div>

            {/* Donanım Seçimleri */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                2. Donanım & Arma Konfigürasyonu
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 pt-1">
                {/* Pervane Tipi */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 block">Pervane Yapısı</label>
                  <select
                    value={propellerType}
                    onChange={(e) => setPropellerType(e.target.value as 'folding' | 'fixed')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="folding">Katlanır / Pervane Kanadı (Folding)</option>
                    <option value="fixed">Sabit Kanatlı Pervane (Fixed Drag)</option>
                  </select>
                </div>

                {/* Direk Malzemesi */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 block">Direk Malzemesi</label>
                  <select
                    value={mastMaterial}
                    onChange={(e) => setMastMaterial(e.target.value as 'carbon' | 'aluminum')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="aluminum">Alüminyum Direk</option>
                    <option value="carbon">Karbon Direk (Düşük RM Tepesi)</option>
                  </select>
                </div>

                {/* Balon Tipi */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 block">Balon Donanımı</label>
                  <select
                    value={spinnakerType}
                    onChange={(e) => setSpinnakerType(e.target.value as 'asymmetric' | 'symmetric')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="asymmetric">Asimetrik Balon (Gennaker)</option>
                    <option value="symmetric">Simetrik Balon (Klasik Gönderli)</option>
                  </select>
                </div>

                {/* Baston (Bowsprit) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 block">Baş Baston (Bowsprit)</label>
                  <select
                    value={bowsprit ? 'true' : 'false'}
                    onChange={(e) => setBowsprit(e.target.value === 'true')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="true">Sabit / Hareketli Baston Var</option>
                    <option value="false">Baston Yok (Burun İçi)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Canlı Hesaplama Sonuç Paneli (5 Kolon) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Canlı Gösterge Kartı */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/40 p-6 rounded-2xl shadow-xl shadow-cyan-950/30 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Canlı Simülasyon</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                  ● Aktif Hesaplama
                </span>
              </div>

              {/* TCC & GPH Ana Değerleri */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 font-mono block">Tahmini IRC TCC</span>
                  <div className="text-3xl font-black text-cyan-400 mt-1">{results.tcc.toFixed(3)}</div>
                  <span className="text-[10px] text-slate-500 block font-mono mt-1">1.000 referans çarpanı</span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 font-mono block">Tahmini ORC GPH</span>
                  <div className="text-3xl font-black text-emerald-400 mt-1">{results.gph.toFixed(1)}</div>
                  <span className="text-[10px] text-slate-500 block font-mono mt-1">s/nm (saniye / mil)</span>
                </div>
              </div>

              {/* Hidrodinamik Oranlar */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">SA / Disp Oranı:</span>
                  <span className="text-white font-bold">{results.saDispRatio}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Disp / LWL Oranı:</span>
                  <span className="text-white font-bold">{results.dlRatio}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Teorik Gövde Hızı:</span>
                  <span className="text-white font-bold">{results.hullSpeed} knot</span>
                </div>
              </div>

              {/* Karakter Analiz Kutusu */}
              <div className="bg-cyan-950/30 border border-cyan-800/40 p-4 rounded-xl">
                <span className="text-xs font-mono font-bold text-cyan-300 block mb-1">Gövde Karakter Analizi:</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {results.saDispRatio > 24
                    ? 'Yüksek güç potansiyeli; hafif havalarda son derece hızlı, sert havada erken camadan gerektiren safkan yarış mimarisi.'
                    : results.saDispRatio >= 19
                    ? 'Dengeli performans; Akdeniz hafif havalarında da yürüyebilen modern Racer/Cruiser profili.'
                    : 'Yüksek sephiye ve konfor odaklı ağır gezi teknesi gövdesi.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bölüm: Optimizasyon Reçeteleri Matrisi */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-2xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">STRATEJİK REÇETELER</span>
            <h2 className="text-2xl font-bold text-white mt-1">Donanım Değişikliklerinin Reytinge Etkisi</h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Reyting katsayınızı düşürmek her zaman yarış kazandırmaz; asıl amaç mil başına harcanan süreyi handikap cezasından daha fazla kısaltmaktır.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            {optimizationTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-xl space-y-3 hover:border-cyan-500/40 transition"
              >
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-sm font-bold text-white leading-tight">{tip.item}</h3>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${
                        tip.tccDelta > 0
                          ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                      }`}
                    >
                      {tip.tccDelta > 0 ? `+${tip.tccDelta.toFixed(3)} TCC` : `${tip.tccDelta.toFixed(3)} TCC`}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{tip.tacticalNote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}