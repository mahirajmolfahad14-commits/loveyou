"use client";
import { useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { state } from "@/lib/state";

const vert = /* glsl */ `
uniform float uTime, uProg, uSize, uPx; uniform vec2 uPtr;
attribute float aSeed;
varying float vSeed, vFade;
void main(){
  vec3 p = position;
  float speed = .22 + aSeed*.32 + uProg*.45;
  p.y = mod(p.y + uTime*speed + 5., 10.) - 5.;
  p.x += sin(uTime*.45 + aSeed*20. + p.y*.7)*.4;
  p.z += cos(uTime*.3 + aSeed*11.)*.3;
  vec2 d = p.xy - uPtr; float f = smoothstep(2.4, 0., length(d));
  p.xy += normalize(d + .0001) * f * .7;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (.4 + aSeed) * uPx * (8. / -mv.z);
  vSeed = aSeed; vFade = smoothstep(-5., -3.5, p.y) * smoothstep(5., 3.5, p.y);
}`;
const frag = /* glsl */ `
uniform float uProg, uAlpha; varying float vSeed, vFade;
void main(){
  float r = length(gl_PointCoord - .5);
  float a = smoothstep(.5, 0., r); a *= a;
  vec3 col = mix(vec3(1., .72, .42), vec3(.96, .22, .36), clamp(vSeed + uProg*.9, 0., 1.));
  gl_FragColor = vec4(col, a * vFade * uAlpha);
}`;

function Layer({ count, size, alpha }: { count: number; size: number; alpha: number }) {
  const { viewport } = useThree();
  const { geo, mat } = useMemo(() => {
    const pos = new Float32Array(count * 3), seed = new Float32Array(count);
    const w = viewport.width / 2 + 1.2;
    for (let i = 0; i < count; i++) {
      pos.set([(Math.random() * 2 - 1) * w, (Math.random() * 2 - 1) * 5, (Math.random() * 2 - 1) * 3.5], i * 3);
      seed[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert, fragmentShader: frag, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uProg: { value: 0 }, uSize: { value: size }, uAlpha: { value: alpha },
        uPx: { value: Math.min(window.devicePixelRatio, 1.75) }, uPtr: { value: new THREE.Vector2() } },
    });
    return { geo, mat };
  }, [count, size, alpha, viewport.width]);

  useFrame(({ clock }) => {
    const u = mat.uniforms;
    u.uTime.value = clock.elapsedTime;
    u.uProg.value += (state.progress - u.uProg.value) * 0.05;
    u.uPtr.value.set((state.px * viewport.width) / 2, (state.py * viewport.height) / 2);
  });
  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

export default function Embers() {
  const small = typeof window !== "undefined" && window.innerWidth < 700;
  return (
    <div className="webgl" aria-hidden>
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}>
        <Layer count={small ? 450 : 1200} size={34} alpha={0.9} />
        <Layer count={small ? 14 : 30} size={190} alpha={0.1} />
      </Canvas>
    </div>
  );
}
