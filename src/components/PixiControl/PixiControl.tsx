'use client';

import { useState, useCallback, useEffect } from 'react';
import { getConfig, setConfig, getFps } from '@/lib/pixi/config';
import type { PixiConfig } from '@/lib/pixi/config';
import styles from './PixiControl.module.scss';

function RangeInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <label className={styles.field}>
      <span>{label}: {value}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export default function PixiControl() {
  const [visible, setVisible] = useState(false);
  const [, forceRender] = useState(0);

  const update = useCallback((partial: Partial<PixiConfig>) => {
    setConfig(partial);
    forceRender((n) => n + 1);
  }, []);

  const [fps, setFpsDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setFpsDisplay(Math.round(getFps())), 500);
    return () => clearInterval(id);
  }, [visible]);

  const config = getConfig();

  return (
    <div className={styles.wrapper}>
      <button className={styles.toggle} onClick={() => setVisible((v) => !v)}>
        {visible ? 'x' : 'controls'}
      </button>
      {visible && (
        <div className={styles.panel}>
          <div className={styles.fps}>{fps} fps</div>
          <RangeInput
            label="drops"
            value={config.dropCount}
            onChange={(v) => update({ dropCount: v })}
            min={0}
            max={10000}
            step={10}
          />
          <RangeInput
            label="speed"
            value={config.speed}
            onChange={(v) => update({ speed: v })}
            min={1}
            max={100}
          />
          <RangeInput
            label="length"
            value={config.length}
            onChange={(v) => update({ length: v })}
            min={1}
            max={100}
          />
          <RangeInput
            label="alpha"
            value={config.alpha}
            onChange={(v) => update({ alpha: v })}
            min={0}
            max={1}
            step={0.05}
          />
          <RangeInput
            label="wind (not complete!)"
            value={config.wind}
            onChange={(v) => update({ wind: v })}
            min={-45}
            max={45}
          />
          <label className={styles.field}>
            <span>color</span>
            <input
              type="color"
              value={`#${config.color.toString(16).padStart(6, '0')}`}
              onChange={(e) => update({ color: parseInt(e.target.value.slice(1), 16) })}
            />
          </label>
        </div>
      )}
    </div>
  );
}
