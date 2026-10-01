import React, { useEffect, useRef, useState, useCallback } from 'react';
import createGlobe, { Globe } from 'cobe';
import { MARKETS_SERVED, MarketServed } from '../../data/company';
import { Compass, RotateCw, Anchor, Plane, Ship, MapPin } from 'lucide-react';

// Coordinates mapping for destinations
const MARKET_COORDINATES: Record<string, { lat: number; lng: number }> = {
  USA: { lat: 38.0, lng: -97.0 },
  GBR: { lat: 54.0, lng: -2.5 },
  EUR: { lat: 50.5, lng: 7.0 },
  AUS: { lat: -25.0, lng: 134.0 },
  UAE: { lat: 24.5, lng: 54.5 },
};

const MUMBAI_COORDS: [number, number] = [18.9438, 72.8354];

export const GlobalLogisticsGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<Globe | null>(null);
  
  const [selectedMarket, setSelectedMarket] = useState<MarketServed>(MARKETS_SERVED[0]);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Rotation angles (radians)
  const phiRef = useRef(0);
  const thetaRef = useRef(0.2);
  const targetPhiRef = useRef<number | null>(null);
  const targetThetaRef = useRef<number | null>(null);

  // Pointer drag tracking
  const pointerDownRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const startAnglesRef = useRef({ phi: 0, theta: 0.2 });

  // Focus globe towards coordinates
  const focusOnCoordinates = useCallback((lat: number, lng: number) => {
    // In cobe: phi rotates horizontally around Y axis, theta vertically around X axis
    // Longitude in degrees -> convert to radians (facing camera)
    const radLng = (-lng * Math.PI) / 180 + Math.PI / 2;
    const radLat = (lat * Math.PI) / 180;
    
    // Normalize targetPhi relative to current phi to take the shortest rotation path
    let currentPhi = phiRef.current;
    let targetPhi = radLng;
    const twoPi = Math.PI * 2;
    while (targetPhi - currentPhi > Math.PI) targetPhi -= twoPi;
    while (targetPhi - currentPhi < -Math.PI) targetPhi += twoPi;

    targetPhiRef.current = targetPhi;
    targetThetaRef.current = Math.max(-0.6, Math.min(0.8, radLat * 0.7));
  }, []);

  // Handle market select
  const handleSelectMarket = (m: MarketServed) => {
    setSelectedMarket(m);
    const coords = MARKET_COORDINATES[m.code];
    if (coords) {
      focusOnCoordinates(coords.lat, coords.lng);
    }
  };

  // Reset to origin (Mumbai / JNPT)
  const handleResetToOrigin = () => {
    focusOnCoordinates(MUMBAI_COORDS[0], MUMBAI_COORDS[1]);
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight || width;

    // Build markers list
    const markers = [
      // Origin: Mumbai Port
      { location: MUMBAI_COORDS, size: 0.11, color: [0.66, 0.54, 0.29] as [number, number, number] }, // Brass
      // Destinations
      { location: [40.7128, -74.006] as [number, number], size: 0.08, color: [0.43, 0.12, 0.17] as [number, number, number] }, // New York
      { location: [33.742, -118.266] as [number, number], size: 0.08, color: [0.43, 0.12, 0.17] as [number, number, number] }, // Long Beach
      { location: [51.5074, -0.1278] as [number, number], size: 0.08, color: [0.43, 0.12, 0.17] as [number, number, number] }, // UK
      { location: [51.9244, 4.4777] as [number, number], size: 0.08, color: [0.43, 0.12, 0.17] as [number, number, number] }, // Rotterdam
      { location: [-33.8688, 151.2093] as [number, number], size: 0.08, color: [0.43, 0.12, 0.17] as [number, number, number] }, // Sydney
      { location: [25.2048, 55.2708] as [number, number], size: 0.08, color: [0.43, 0.12, 0.17] as [number, number, number] }, // Dubai
    ];

    // Build trade route arcs originating from Mumbai (JNPT)
    const arcs = [
      { from: MUMBAI_COORDS, to: [40.7128, -74.006] as [number, number], color: [0.43, 0.12, 0.17] as [number, number, number] },
      { from: MUMBAI_COORDS, to: [33.742, -118.266] as [number, number], color: [0.43, 0.12, 0.17] as [number, number, number] },
      { from: MUMBAI_COORDS, to: [51.5074, -0.1278] as [number, number], color: [0.43, 0.12, 0.17] as [number, number, number] },
      { from: MUMBAI_COORDS, to: [51.9244, 4.4777] as [number, number], color: [0.43, 0.12, 0.17] as [number, number, number] },
      { from: MUMBAI_COORDS, to: [-33.8688, 151.2093] as [number, number], color: [0.43, 0.12, 0.17] as [number, number, number] },
      { from: MUMBAI_COORDS, to: [25.2048, 55.2708] as [number, number], color: [0.43, 0.12, 0.17] as [number, number, number] },
    ];

    try {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: height * 2,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: 0, // Light white luxury theme
        diffuse: 1.15,
        mapSamples: 14000,
        mapBrightness: 5.5,
        mapBaseBrightness: 0.06,
        baseColor: [0.98, 0.98, 0.98],
        markerColor: [0.43, 0.12, 0.17],
        glowColor: [0.88, 0.88, 0.86],
        arcColor: [0.66, 0.54, 0.29],
        arcWidth: 1.2,
        arcHeight: 0.28,
        markers,
        arcs,
        scale: 1.05,
      });

      globeRef.current = globe;

      let animationFrameId: number;

      const renderLoop = () => {
        // Smoothly interpolate towards target coordinate if active
        if (targetPhiRef.current !== null && targetThetaRef.current !== null) {
          const dPhi = targetPhiRef.current - phiRef.current;
          const dTheta = targetThetaRef.current - thetaRef.current;

          phiRef.current += dPhi * 0.06;
          thetaRef.current += dTheta * 0.06;

          if (Math.abs(dPhi) < 0.001 && Math.abs(dTheta) < 0.001) {
            targetPhiRef.current = null;
            targetThetaRef.current = null;
          }
        } else if (isAutoSpinning && !pointerDownRef.current) {
          phiRef.current += 0.0025;
        }

        globe.update({
          phi: phiRef.current,
          theta: thetaRef.current,
        });

        animationFrameId = requestAnimationFrame(renderLoop);
      };

      animationFrameId = requestAnimationFrame(renderLoop);

      // Handle window resizing
      const handleResize = () => {
        if (!containerRef.current || !globeRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight || w;
        globeRef.current.update({
          width: w * 2,
          height: h * 2,
        });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        globe.destroy();
      };
    } catch {
      // Fallback if WebGL context isn't supported
    }
  }, [isAutoSpinning]);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerDownRef.current = true;
    setIsDragging(true);
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    startAnglesRef.current = { phi: phiRef.current, theta: thetaRef.current };
    targetPhiRef.current = null;
    targetThetaRef.current = null;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!pointerDownRef.current) return;
    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;

    phiRef.current = startAnglesRef.current.phi + dx * 0.006;
    thetaRef.current = Math.max(-0.7, Math.min(0.9, startAnglesRef.current.theta - dy * 0.005));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerDownRef.current = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8">
      {/* Left: 3D Interactive WebGL Globe Canvas */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <div 
          ref={containerRef}
          className="relative w-full aspect-square max-w-[540px] flex items-center justify-center bg-radial from-stone/30 via-bone to-transparent border border-stone/80 shadow-inner overflow-hidden select-none"
        >
          {/* 3D Canvas with drag cursor */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`w-full h-full touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ width: '100%', height: '100%' }}
          />

          {/* Top Left Floating Legend */}
          <div className="absolute top-4 left-4 bg-bone/95 border border-stone p-2.5 text-[11px] font-navbar-sans shadow-md backdrop-blur-xs space-y-1.5 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brass inline-block"></span>
              <span className="font-semibold text-ink uppercase tracking-wider text-[10px]">
                Origin: Mumbai (JNPT)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-oxblood inline-block"></span>
              <span className="text-warmgrey uppercase tracking-wider text-[10px]">
                Active Discharge Ports
              </span>
            </div>
          </div>

          {/* Top Right Quick Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-bone/95 border border-stone p-1 shadow-md">
            <button
              onClick={() => setIsAutoSpinning((prev) => !prev)}
              className={`p-1.5 text-xs transition-colors ${
                isAutoSpinning ? 'text-oxblood font-semibold bg-stone/20' : 'text-warmgrey hover:text-ink'
              }`}
              title={isAutoSpinning ? 'Pause Rotation' : 'Start Auto-Rotation'}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoSpinning ? 'animate-spin-slow' : ''}`} />
            </button>
            <button
              onClick={handleResetToOrigin}
              className="p-1.5 text-warmgrey hover:text-ink transition-colors"
              title="Focus Origin (Mumbai JNPT Port)"
            >
              <Compass className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Drag Helper Hint */}
          <div className="absolute bottom-3 text-center inset-x-0 pointer-events-none">
            <span className="text-[10px] tracking-wider uppercase font-mono bg-bone/85 border border-stone/80 px-2.5 py-1 text-warmgrey shadow-xs">
              Drag to rotate 360° • Click a market to focus
            </span>
          </div>
        </div>

        {/* Origin Spec Bar below Globe */}
        <div className="w-full max-w-[540px] mt-3 p-3 bg-stone/20 border border-stone flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Anchor className="w-4 h-4 text-brass" />
            <span className="font-semibold text-ink">Port of Loading:</span>
            <span className="text-warmgrey">Nhava Sheva (JNPT) / Mumbai Air Cargo</span>
          </div>
          <span className="font-mono text-[10px] text-brass uppercase font-bold">FOB / CIF / DDP</span>
        </div>
      </div>

      {/* Right: Modern Interactive Trade Terminal & Country Spotlight */}
      <div className="lg:col-span-6 space-y-4">
        {/* Active Trade Lane Hero Card */}
        <div className="border border-stone bg-white p-6 shadow-sm space-y-5 animate-fadeIn">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 hairline-b">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-brass uppercase">{selectedMarket.code}</span>
                <span className="text-stone-dark">•</span>
                <span className="text-[10px] uppercase tracking-wider font-mono text-warmgrey">Direct Trade Corridor</span>
              </div>
              <h3 className="font-serif text-3xl text-ink font-normal mt-0.5">
                {selectedMarket.country}
              </h3>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-warmgrey block">Factory Export Share</span>
              <span className="font-serif text-2xl font-bold text-oxblood block">
                {selectedMarket.share.split(' ')[0]}
              </span>
              <span className="text-[10px] text-warmgrey uppercase font-mono">Of Annual Capacity</span>
            </div>
          </div>

          {/* Volume Allocation Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-warmgrey font-mono">
              <span>Production Allocation Capacity</span>
              <span className="font-semibold text-ink">{selectedMarket.share}</span>
            </div>
            <div className="w-full h-2 bg-stone/30 overflow-hidden">
              <div
                className="h-full bg-oxblood transition-all duration-700 ease-out"
                style={{ width: selectedMarket.share.split('%')[0] + '%' }}
              />
            </div>
          </div>

          {/* Dual Modality Logistics Grid: Ocean vs Air */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Ocean Freight Card */}
            <div className="p-4 border border-stone bg-stone/15 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-ink text-bone flex items-center justify-center">
                    <Ship className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-ink block">Ocean Freight</span>
                    <span className="text-[10px] text-warmgrey">FCL / LCL Containerized</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <span className="text-[10px] uppercase tracking-wider text-warmgrey block">Vessel Transit Lead</span>
                <span className="font-mono text-sm font-bold text-ink">
                  {selectedMarket.leadTransit.split('/')[0]?.trim() || selectedMarket.leadTransit}
                </span>
              </div>

              <div className="pt-1 border-t border-stone/50">
                <span className="text-[10px] uppercase tracking-wider text-warmgrey block mb-1.5">Primary Discharge Ports</span>
                <div className="flex flex-wrap gap-1">
                  {selectedMarket.ports.split(',').map((port) => (
                    <span
                      key={port}
                      className="px-2 py-0.5 bg-bone border border-stone text-[10px] font-mono text-ink"
                    >
                      {port.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Air Cargo Express Card */}
            <div className="p-4 border border-stone bg-stone/15 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-oxblood text-bone flex items-center justify-center">
                      <Plane className="w-3.5 h-3.5 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-ink block">Air Express</span>
                      <span className="text-[10px] text-warmgrey">Sampling & High-Season Drops</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <span className="text-[10px] uppercase tracking-wider text-warmgrey block">Air Transit Lead</span>
                  <span className="font-mono text-sm font-bold text-ink">
                    {selectedMarket.leadTransit.split('/')[1]?.trim() || '2–4 days express air'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone/50 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-warmgrey block">Airport Clearance</span>
                <p className="text-[11px] text-warmgrey leading-tight">
                  Direct courier & palletized customs clearance available for urgent showroom drops.
                </p>
              </div>
            </div>
          </div>

          {/* Trade Terms & Active Route Status */}
          <div className="p-3 bg-stone/20 border border-stone flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-ink">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-semibold text-[11px] uppercase tracking-wider">Incoterms Available:</span>
              <span className="font-mono text-brass font-bold">FOB Mumbai • CIF • DDP</span>
            </div>

            <div className="flex items-center gap-1.5 text-oxblood text-[11px] font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>3D Trade Route Connected</span>
            </div>
          </div>
        </div>

        {/* Quick Corridor Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-1">
          {MARKETS_SERVED.map((m) => {
            const isSelected = m.country === selectedMarket.country;
            return (
              <button
                key={m.country}
                type="button"
                onClick={() => handleSelectMarket(m)}
                className={`p-3 border transition-all text-left group ${
                  isSelected
                    ? 'border-oxblood bg-stone/30 shadow-xs'
                    : 'border-stone bg-bone hover:border-ink hover:bg-stone/20'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-mono text-[10px] font-bold ${isSelected ? 'text-oxblood' : 'text-brass'}`}>
                    {m.code}
                  </span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'font-semibold text-oxblood' : 'text-warmgrey'}`}>
                    {m.share.split(' ')[0]}
                  </span>
                </div>
                <h4 className={`font-serif text-sm transition-colors mt-0.5 truncate ${isSelected ? 'text-oxblood font-semibold' : 'text-ink group-hover:text-oxblood'}`}>
                  {m.country}
                </h4>
                <span className="text-[10px] text-warmgrey block mt-0.5 truncate">
                  {m.leadTransit.split('/')[0]?.trim()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
