interface CollisionEvent {
  x: number;
  y: number;
}

const queue: CollisionEvent[] = [];

export function pushCollision(x: number, y: number) {
  queue.push({ x, y });
}

export function drainCollisions(): CollisionEvent[] {
  if (queue.length === 0) return queue;
  return queue.splice(0);
}
