const targets = new Map<string, DOMRect>();

export function registerTarget(id: string, rect: DOMRect) {
  targets.set(id, rect);
}

export function unregisterTarget(id: string) {
  targets.delete(id);
}

export function getTargets(): ReadonlyMap<string, DOMRect> {
  return targets;
}
