'use client';

import { useState } from 'react';
import Link from 'next/link';
import boatsData from '../../data/boats.json';

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

export default function TekneBulucu() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    purpose: '',
    crewScale: '',
    priority: '',
  });

  const handleSelect = (key: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  const resetWizard = () => {
    setPreferences({ purpose: '', crewScale: '', priority: '' });
    setStep(1);
  };

  // Eşleştirme mantığı
  const filteredBoats = boats.filter((boat) => {
    if (preferences.purpose === 'racing') {
      return boat.segment.toLowerCase().includes('yarış') || boat.category.toLowerCase().includes('yarış');
    }
    if (preferences.purpose === 'cruising') {
      return boat.category.toLowerCase().includes('gezi') || boat.segment.toLowerCase().includes('gezi');
    }
    if (preferences.purpose === 'motor_yacht') {
      return boat.category.toLowerCase().includes('motor') || boat.segment.toLowerCase().includes('motoryat');
    }
    return true;
  });

  const matchedBoats = filteredBoats.length > 0 ? filteredBoats : boats.slice(0, 2);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white pb-20">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-black tracking-wider text-cyan-400 hover:text-cyan-300 transition">
            PRUVA
          </Link>
          <span className="text-xs uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold tracking-wider">
            Seçim Sihirbazı
          </span>
        </div>
        <Link
          href="/"
          className="text-sm font-medium text-slate-400 hover:text-slate-200 transition"
        >
          ← Ana Sayfaya Dön
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-2 rounded-full mb-8 overflow-hidden border border-slate-800">
          <div
            className="bg-cyan-500 h-full transition-all duration-300"
            style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
          />
        </div>

        {/* Adım 1: Kullanım Amacı */}
        {step === 1 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Adım 1 / 3</span>
              <h1 className="text-3xl font-bold mt-1 text-white">Tekneyle asıl operasyonel hedefiniz nedir?</h1>
              <p className="text-slate-400 text-sm mt-2">IRC reytingi kasmak mı, aileyle koy koy gezmek mi, yoksa açık deniz seyri mi?</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <button
                onClick={() => handleSelect('purpose', 'racing')}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/80 hover:bg-slate-900 text-left transition space-y-3 group"
              >
                <div className="text-cyan-400 font-mono text-sm group-hover:translate-x-1 transition-transform">01 // SAF YARIŞ</div>
                <h3 className="font-semibold text-lg text-white">Yarış & IRC Puanı</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Optimize edilmiş polar eğrileri, karbon teçhizat, hafif deplasman ve podyum odaklı tasarım.
                </p>
              </button>

              <button
                onClick={() => handleSelect('purpose', 'cruising')}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/80 hover:bg-slate-900 text-left transition space-y-3 group"
              >
                <div className="text-cyan-400 font-mono text-sm group-hover:translate-x-1 transition-transform">02 // GEZİ & LİKİDİTE</div>
                <h3 className="font-semibold text-lg text-white">Cruiser (38-44 ft)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Yüksek ikinci el likiditesi, aile idaresi, konforlu kabin dağılımı ve makul marina maliyeti.
                </p>
              </button>

              <button
                onClick={() => handleSelect('purpose', 'motor_yacht')}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/80 hover:bg-slate-900 text-left transition space-y-3 group"
              >
                <div className="text-cyan-400 font-mono text-sm group-hover:translate-x-1 transition-transform">03 // GÜÇ & HACİM</div>
                <h3 className="font-semibold text-lg text-white">Motoryat & Explorer</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Uzun menzil, stabil deplasman gövde, geniş flybridge ve 24m mevzuat avantajı.
                </p>
              </button>
            </div>
          </section>
        )}

        {/* Adım 2: Mürettebat & Boyut Ölçeği */}
        {step === 2 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Adım 2 / 3</span>
              <h1 className="text-3xl font-bold mt-1 text-white">Mürettebat ve operasyon ölçeği nasıl olacak?</h1>
              <p className="text-slate-400 text-sm mt-2">Dümen ve donanımı bizzat mı yöneteceksiniz, profesyonel ekip mi tutulacak?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => handleSelect('crewScale', 'short-handed')}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/80 hover:bg-slate-900 text-left transition space-y-3 group"
              >
                <div className="text-cyan-400 font-mono text-sm group-hover:translate-x-1 transition-transform">ÖLÇEK A</div>
                <h3 className="font-semibold text-lg text-white">Tek / Çift Kişi (Short-Handed)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Havuzluktan yönetilen tüm mandar ve iskotolar, baş pervane ve otopilot öncelikli.
                </p>
              </button>

              <button
                onClick={() => handleSelect('crewScale', 'full-crew')}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/80 hover:bg-slate-900 text-left transition space-y-3 group"
              >
                <div className="text-cyan-400 font-mono text-sm group-hover:translate-x-1 transition-transform">ÖLÇEK B</div>
                <h3 className="font-semibold text-lg text-white">Tam Ekip veya Profesyonel Kaptan</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  6-10 kişilik yarış ekibiyle piyano/balon operasyonu veya kaptan kamaralı uzun yol idaresi.
                </p>
              </button>
            </div>
          </section>
        )}

        {/* Adım 3: Kritik Öncelik */}
        {step === 3 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Adım 3 / 3</span>
              <h1 className="text-3xl font-bold mt-1 text-white">Mühendislik ve yatırımda en kritik önceliğiniz nedir?</h1>
              <p className="text-slate-400 text-sm mt-2">Gövde rijitliği mi, sert hava kabiliyeti mi, yoksa hızlı nakde dönme gücü mü?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => handleSelect('priority', 'rigidity')}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/80 hover:bg-slate-900 text-left transition space-y-3 group"
              >
                <div className="text-cyan-400 font-mono text-sm group-hover:translate-x-1 transition-transform">KRİTER // 01</div>
                <h3 className="font-semibold text-lg text-white">Rijit Gövde & Matrix Bütünlüğü</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Yapısal omurga dayanımı, delaminasyon riski minimum vakum infüzyon veya kompozit üretim kalitesi.
                </p>
              </button>

              <button
                onClick={() => handleSelect('priority', 'liquidity')}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/80 hover:bg-slate-900 text-left transition space-y-3 group"
              >
                <div className="text-cyan-400 font-mono text-sm group-hover:translate-x-1 transition-transform">KRİTER // 02</div>
                <h3 className="font-semibold text-lg text-white">Yüksek İkinci El Likiditesi</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Akdeniz çanağında her sezon anında alıcı bulan, yedek parça ve servis ağı oturmuş gövde.
                </p>
              </button>
            </div>
          </section>
        )}

        {/* Sonuç Ekranı */}
        {step >= 4 && (
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest bg-cyan-950/80 border border-cyan-800/80 px-3 py-1 rounded-full">
                Eşleşme Raporu
              </span>
              <h1 className="text-3xl font-extrabold text-white pt-2">Profilinize Uygun Gövdeler</h1>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">
                Yarışçı ve piyasa analitiği kriterlerinize göre filtrelenen modeller listelendi:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {matchedBoats.map((boat) => (
                <div
                  key={boat.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                          {boat.segment}
                        </span>
                        <h2 className="text-2xl font-bold text-white mt-1">{boat.name}</h2>
                      </div>
                      <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded font-mono">
                        {boat.origin}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 italic bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                      "{boat.highlight}"
                    </p>

                    <div className="text-xs space-y-1.5 text-slate-400 font-mono">
                      <div><strong className="text-slate-300">Tasarımcı:</strong> {boat.designer}</div>
                      <div><strong className="text-slate-300">Gövde / Güç:</strong> {boat.hullEngine}</div>
                      <div><strong className="text-slate-300">Hedef Kitle:</strong> {boat.targetAudience}</div>
                    </div>

                    <div className="pt-2">
                      <div className="text-xs font-semibold text-slate-300 mb-2">Öne Çıkan Artılar:</div>
                      <ul className="space-y-1">
                        {boat.pros.map((pro, index) => (
                          <li key={index} className="text-xs text-slate-400 flex items-center gap-2">
                            <span className="text-cyan-400 font-bold">✓</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800/60 mt-6">
                    <a
                      href={`/#${boat.id}`}
                      className="block text-center w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider transition"
                    >
                      Detaylı Analizi Gör
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={resetWizard}
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 underline underline-offset-4 transition"
              >
                ⟲ Parametreleri Sıfırla ve Yeniden Başla
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}