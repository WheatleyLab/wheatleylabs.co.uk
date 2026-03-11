export interface PixiConfig {
  dropCount: number;
  speed: number;
  length: number;
  alpha: number;
  color: number;
  wind: number;
}

const config: PixiConfig = {
  dropCount: 300,
  speed: 40,
  length: 50,
  alpha: 0.5,
  color: 0x94a3b8,
  wind: 0,
};

export function getConfig(): Readonly<PixiConfig> {
  return config;
}

export function setConfig(partial: Partial<PixiConfig>) {
  Object.assign(config, partial);
}

let fps = 0;

export function setFps(value: number) {
  fps = value;
}

export function getFps() {
  return fps;
}
