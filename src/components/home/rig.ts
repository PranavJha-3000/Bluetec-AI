// Port of the reference mascot rig (pose tables, per-part transforms, spring/ease state). Drives the `data-p` parts of the Mascot SVG.
type Pose = Record<string, number>;
type M = { phase: number; stride: number; time: number; wag: number; gazeX: number; gazeY: number; blink: number; ear: number };
const W = 300;
const SH_N: [number, number] = [186, 194], SH_F: [number, number] = [168, 192], HIP_N: [number, number] = [110, 194], HIP_F: [number, number] = [94, 192];
const TAIL: [number, number] = [84, 150], EAR_L: [number, number] = [174, 82], EAR_R: [number, number] = [250, 82], HEAD: [number, number] = [212, 100], BODY: [number, number] = [196, 206];

const G: Pose = { bodyRot: 0, bodyX: 0, bodyY: 0, stretch: 1, headX: 0, headY: 0, headRot: 0, earL: 0, earR: 0, tail: 0, fn: 0, ff: 0, bn: 0, bf: 0, sit: 0, eyes: 1, happy: 0, tongue: 0, mouth: 0, front: 0 };
export const POSES: Record<string, Pose> = {
  stand: G, walk: { ...G, tail: -6, tongue: 1 },
  sit: { ...G, bodyRot: -24, bodyY: -2, headX: -10, headY: -6, tail: 34, sit: 1, tongue: 1 },
  hop: { ...G, bodyRot: -9, stretch: 1.06, headY: -6, fn: -42, ff: -32, bn: 40, bf: 30, earL: -26, earR: 26, tail: -24, tongue: 1 },
  sniff: { ...G, bodyRot: 7, headX: 16, headY: 32, headRot: 9, tail: -14, fn: 6, ff: 4 },
  bow: { ...G, bodyRot: 15, bodyY: 2, headX: 14, headY: 30, fn: -58, ff: -52, tail: -32, happy: 1, tongue: 1 },
  beg: { ...G, bodyRot: -36, bodyY: -6, headX: -18, headY: -18, sit: 1, fn: -70, ff: -64, tail: 30, happy: 1, tongue: 1 },
};
const KEYS = Object.keys(G);
const b = (n: number) => Math.round(100 * n) / 100;
const rot = (a: number, [x, y]: [number, number]) => `rotate(${b(a)} ${x} ${y})`;
const lerpPose = (a: Pose, t: Pose, k: number) => { const s = { ...a }; for (const key of KEYS) s[key] = a[key] + (t[key] - a[key]) * k; return s; };

function frame(t: Pose, e: M) {
  const d = Math.sin(e.phase), f = Math.sin(e.phase + Math.PI), p = 20 + 10 * e.stride, g = (1 - Math.cos(2 * e.phase)) / 2, u = +(e.stride > 0.01), idle = Math.sin(2.4 * e.time) * (1 - u);
  const bodyY = t.bodyY - g * (2.5 + 4 * e.stride) * u + 0.6 * idle, bodyRot = t.bodyRot + 1.6 * Math.sin(e.phase) * u, k = -t.bodyRot;
  const wagA = 5 + 17 * e.wag, wagF = 1.2 + 2.6 * e.wag, tail = t.tail + Math.sin(e.time * wagF * Math.PI * 2) * wagA;
  const bob = -(1 - Math.cos(2 * e.phase - 0.7)) / 2 * (2 + 3 * e.stride) * u + 0.9 * idle;
  return {
    body: `translate(${b(t.bodyX)} ${b(bodyY)}) ${rot(bodyRot, BODY)} translate(${BODY[0]} 0) scale(${b(t.stretch)} 1) translate(${-BODY[0]} 0)`,
    fn: `translate(${SH_N[0]} ${SH_N[1]}) rotate(${b(t.fn + k + d * p * u)})`, ff: `translate(${SH_F[0]} ${SH_F[1]}) rotate(${b(t.ff + k + f * p * u)})`,
    bn: `translate(${HIP_N[0]} ${HIP_N[1]}) rotate(${b(t.bn + f * p * u)})`, bf: `translate(${HIP_F[0]} ${HIP_F[1]}) rotate(${b(t.bf + d * p * u)})`,
    tail: rot(tail, TAIL), haunch: `translate(0 ${b(-(0.06 * t.bodyRot))})`,
    head: `translate(${b(t.headX)} ${b(t.headY + bob)}) ${rot(t.headRot + 1.4 * Math.sin(e.phase) * u, HEAD)}`,
    earL: rot(t.earL + e.ear + 4 * Math.sin(2 * e.phase) * u, EAR_L), earR: rot(t.earR - e.ear - 4 * Math.sin(2 * e.phase) * u, EAR_R),
    eyes: `translate(${b(3.4 * e.gazeX)} ${b(2.6 * e.gazeY)})`, blink: `translate(0 ${b(98 * e.blink * 0.92)}) scale(1 ${b(1 - 0.92 * e.blink)})`,
    openEyes: b(Math.max(0, t.eyes - t.happy)), happyEyes: b(Math.min(t.happy, t.eyes)), shutEyes: b(1 - t.eyes),
    tongue: b(t.tongue * (1 - t.mouth)), mouth: b(t.mouth), backLegs: b(1 - t.sit), haunchOpacity: b(t.sit * (1 - t.front)), side: b(1 - t.front), ledge: b(t.front),
    shadow: `translate(${b(0.6 * t.bodyX)} 0) scale(${b(1 - 0.05 * g * u)} 1)`, shadowOpacity: b(0.12 * (1 - t.front)),
  } as Record<string, string | number>;
}

const PARTS: [string, string, string][] = [["shadow", "transform", "shadow"], ["shadow", "opacity", "shadowOpacity"], ["body", "transform", "body"], ["body", "opacity", "side"], ["bf", "transform", "bf"], ["bf", "opacity", "backLegs"], ["bn", "transform", "bn"], ["bn", "opacity", "backLegs"], ["ff", "transform", "ff"], ["fn", "transform", "fn"], ["tail", "transform", "tail"], ["haunch", "transform", "haunch"], ["haunch", "opacity", "haunchOpacity"], ["head", "transform", "head"], ["earL", "transform", "earL"], ["earR", "transform", "earR"], ["eyes", "transform", "eyes"], ["open", "opacity", "openEyes"], ["blink", "transform", "blink"], ["happy", "opacity", "happyEyes"], ["shut", "opacity", "shutEyes"], ["tongue", "opacity", "tongue"], ["mouth", "opacity", "mouth"], ["ledge", "opacity", "ledge"]];
const ease = (dt: number, tau: number) => 1 - Math.exp(-dt / tau);
const clamp = (n: number, lo = -1, hi = 1) => Math.max(lo, Math.min(hi, n));

export class Rig {
  pose: Pose; target: Pose; facing: number; facingTarget = 1; turn = 0.07; strideTarget = 0; wagTarget = 0.35;
  m: M = { phase: 0, stride: 0, time: 0, wag: 0, gazeX: 0, gazeY: 0, blink: 0, ear: 0 };
  private els = new Map<string, Element>(); private written = new Map<string, string>();
  private earV = 0; private nextBlink = 1.2; private blinkAt = -1;
  constructor(svg: SVGElement, pose = "sit", facing = 1) {
    svg.querySelectorAll("[data-p]").forEach((el) => this.els.set((el as HTMLElement).dataset.p!, el));
    this.pose = { ...POSES[pose] }; this.target = POSES[pose]; this.facing = this.facingTarget = facing;
  }
  setPose(name: string) { this.target = POSES[name]; }
  face(dir: number, turn = 0.07) { this.facingTarget = dir; this.turn = turn; }
  stride(v: number) { this.strideTarget = clamp(v, 0, 1); }
  advance(units: number) { this.m.phase += (units / 46) * Math.PI; } // one step per 46 svg units, as in the reference
  /** true while anything is still easing; the caller can stop its rAF loop when false */
  get settled() { return this.m.stride === 0 && this.strideTarget === 0 && Math.abs(this.facing - this.facingTarget) < 0.01 && KEYS.every((k) => Math.abs(this.pose[k] - this.target[k]) < 0.01); }
  tick(dt: number, time: number) {
    dt = Math.min(dt, 0.05); const m = this.m; m.time = time;
    this.pose = lerpPose(this.pose, this.target, ease(dt, 0.16));
    this.facing += (this.facingTarget - this.facing) * ease(dt, this.turn);
    m.stride += (this.strideTarget - m.stride) * ease(dt, 0.12); if (m.stride < 0.012 && this.strideTarget === 0) m.stride = 0;
    m.wag += (this.wagTarget - m.wag) * ease(dt, 0.4);
    this.earV += (-150 * m.ear - 10 * this.earV) * dt; m.ear = clamp(m.ear + this.earV * dt, -28, 28);
    if (time > this.nextBlink && this.pose.eyes > 0.6) { this.blinkAt = time; this.nextBlink = time + 2.2 + 3.8 * Math.random(); if (Math.random() < 0.18) this.nextBlink = time + 0.32; }
    const c = (time - this.blinkAt) / 0.15; m.blink = c >= 0 && c <= 1 ? Math.sin(c * Math.PI) : 0;
    const out = frame(this.pose, m), sc = Math.abs(this.facing) < 0.02 ? 0.02 * Math.sign(this.facing || 1) : this.facing;
    out.root = `translate(${W / 2} 0) scale(${sc.toFixed(3)} 1) translate(${-W / 2} 0)`;
    for (const [part, attr, key] of [["root", "transform", "root"], ...PARTS]) {
      const el = this.els.get(part); if (!el) continue;
      const v = String(out[key]), id = `${part}:${attr}`;
      if (this.written.get(id) !== v) { el.setAttribute(attr, v); this.written.set(id, v); }
    }
  }
}
