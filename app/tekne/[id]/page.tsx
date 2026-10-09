import Link from 'next/link';
import { notFound } from 'next/navigation';
import boatsData from '@/data/boats.json';

interface Boat {
  id: string;
  name: string;
  segment?: string;
  category?: string;
  type?: string;
  origin?: string;
  designer?: string;
  hullEngine?: string;
  engine?: string;
  tccRating?: string;
  ratingProfile?: string;
  draft?: string;
  rigging?: string;
  highlight?: string;
  description?: string;
  pros?: string[];
  inspectionWatchouts?: string[];
  structuralCheck?: string;
  liquidity?: {
    level?: string;
    avgSaleTime?: string;
    targetAudience?: string;
  };
  marketLiquidity?: string;
  year?: string | number;
  length?: string;
  beam?: string;
  displacement?: string;
  ballast?: string;
  priceRange?: string;
  hullSpeed?: string;
  targetAudience?: string;
}

// Next.js'in derleme (build) sırasında hangi sayfaları üreteceğini bilmesi için:
export async function generateStaticParams() {
  return (boatsData as Boat[]).map((boat) => ({
    id: String(boat.id),
  }));
}

export const dynamicParams = true;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BoatDetailPage({ params }: Props) {
  const { id } = await params;
  const boat = (boatsData as Boat[]).find((b) => String(b.id) === id);

  if (!boat) {
    notFound();
  }

  const titleCategory = boat.segment || boat.type || boat.category || 'Performans Yat';
  const engineAndHull = boat.hullEngine || boat.engine || 'Dizel Sevk Makinesi';
  const ratingText = boat.tccRating || boat.ratingProfile || 'IRC / Gezi Dengeli Profil';
  const shortSummary = boat.highlight || boat.description || `${boat.name}, üstün denizcilik kabiliyeti ve mühendislik dengesiyle öne çıkan bir modeldir.`;
  const liquidityLevel = boat.liquidity?.level || boat.marketLiquidity || 'Yüksek (Aktif Talep)';
  const saleTime = boat.liquidity?.avgSaleTime || '2 - 4 Ay';
  const audience = boat.liquidity?.targetAudience || boat.targetAudience || 'Deneyimli yelkenciler ve regatta ekipleri';

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white pb-24">
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-wider text-cyan-400 hover:text-cyan-300 transition">
          PRUVA
        </Link>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <Link href="/tekne-bulucu" className="text-slate-400 hover:text-white transition">← Tekne Bulucu</Link>
          <Link href="/dinamikler" className="text-slate-400 hover:text-white transition">Deniz Dinamikleri</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-10 space-y-10">
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
                  {titleCategory}
                </span>
                {boat.origin && (
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                    📍 {boat.origin}
                  </span>
                )}
                {boat.designer && (
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                    Tasarım: {boat.designer}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tight">
                {boat.name}
              </h1>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-mono">Piyasa Likiditesi</span>
              <span className="text-2xl font-black text-emerald-400">{liquidityLevel}</span>
              <span className="text-xs text-slate-500 block font-mono">Ort. Satış: {saleTime}</span>
            </div>
          </div>
          <p className="text-slate-300 text-base mt-5 leading-relaxed max-w-3xl">
            {shortSummary}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-500 font-mono block">Su Çekimi (Draft)</span>
            <span className="text-base font-bold text-white">{boat.draft || '2.20 m'}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-500 font-mono block">Gövde & Makine</span>
            <span className="text-xs font-semibold text-slate-200 mt-1 block leading-tight">{engineAndHull}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-500 font-mono block">Rating / Katsayı</span>
            <span className="text-base font-bold text-cyan-400">{ratingText}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-500 font-mono block">Boyutlar (L / B)</span>
            <span className="text-base font-bold text-white">
              {boat.length ? `${boat.length}` : 'Özel Seri'} {boat.beam ? `/ ${boat.beam}` : ''}
            </span>
          </div>
        </div>

        {boat.rigging && (
          <div className="bg-slate-900/30 border border-slate-800/60 p-4 rounded-xl flex items-start gap-3">
            <span className="text-cyan-400 text-sm font-mono mt-0.5 font-bold">ARMA //</span>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-mono">
              {boat.rigging}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 pt-2">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <h3 className="font-bold text-white text-base">Mühendislik Avantajları & Karakteristik</h3>
            </div>
            {boat.pros && boat.pros.length > 0 ? (
              <ul className="space-y-2.5">
                {boat.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 leading-relaxed">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs md:text-sm text-slate-400">
                Gövde geometrisi ve hidrodinamik mimari yüksek orsa açısı ve seyir dengesi için optimize edilmiştir.
              </p>
            )}
            <div className="pt-2 border-t border-slate-800/60">
              <span className="text-xs text-slate-500 font-mono block">Hedef Kitle:</span>
              <span className="text-xs text-slate-300 font-medium">{audience}</span>
            </div>
          </div>

          <div className="bg-amber-950/20 border border-amber-800/40 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h3 className="font-bold text-amber-200 text-base">Ekspertiz & Yapısal Kontrol Radarı</h3>
            </div>
            {boat.inspectionWatchouts && boat.inspectionWatchouts.length > 0 ? (
              <ul className="space-y-2.5">
                {boat.inspectionWatchouts.map((watchout, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-amber-100/90 leading-relaxed">
                    <span className="text-amber-400 font-bold">⚠</span>
                    <span>{watchout}</span>
                  </li>
                ))}
              </ul>
            ) : boat.structuralCheck ? (
              <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed">
                {boat.structuralCheck}
              </p>
            ) : (
              <p className="text-xs md:text-sm text-amber-200/80">
                Salma gövde birleşimi, seacock vanaları ve saildrive gövde körüğü kontrolleri önceliklidir.
              </p>
            )}
            <p className="text-xs text-amber-400/70 pt-2 border-t border-amber-800/30 font-mono">
              * Satın alma öncesi sörveyör ve ultrasonik/nem testinde öncelikli incelenecek maddeler.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}