import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * FluidSubconscious
 * ----------------------------------------------------------------
 * WebGL shader-painting hero. Loads a source image as a texture and
 * applies a flowing, "liquid paint" distortion driven by layered
 * fractal noise, time, and the pointer position. Mimics the look of
 * thick impasto brushstrokes melting and breathing.
 *
 * Performance:
 *  - Lazily imported (kept out of the critical path).
 *  - Pauses its render loop when scrolled off-screen.
 *  - Lighter on mobile: lower DPR + fewer noise octaves.
 *
 * uIntensity controls distortion strength (0.6 desktop / 0.4 mobile).
 * Do NOT remove this file — it is the hero centerpiece.
 */

interface Props {
  imagePath: string;
}

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform float uHasTexture;
  uniform int uOctaves;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      if (i >= uOctaves) break;
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = uv;
    p.x *= aspect;

    float t = uTime * 0.12;

    float n1 = fbm(p * 2.2 + vec2(t, t * 0.6));
    float n2 = fbm(p * 3.4 - vec2(t * 0.8, t * 1.1) + n1);

    vec2 m = uMouse;
    m.x *= aspect;
    float d = distance(p, m);
    float swell = smoothstep(0.6, 0.0, d) * 0.6;

    float amp = uIntensity * 0.045;
    vec2 flow = vec2(
      n1 * cos(n2 * 6.2831),
      n2 * sin(n1 * 6.2831)
    ) * (amp + swell * amp * 2.0);

    vec2 dispUv = uv + flow;

    vec3 col;
    if (uHasTexture > 0.5) {
      float ca = (0.0025 + swell * 0.004) * uIntensity;
      float r = texture2D(uTexture, dispUv + vec2(ca, 0.0)).r;
      float g = texture2D(uTexture, dispUv).g;
      float b = texture2D(uTexture, dispUv - vec2(ca, 0.0)).b;
      col = vec3(r, g, b);
    } else {
      float m1 = fbm(p * 3.0 + vec2(t, -t));
      vec3 crimson = vec3(0.545, 0.102, 0.169);
      vec3 amber = vec3(0.784, 0.580, 0.227);
      vec3 midnight = vec3(0.102, 0.102, 0.18);
      col = mix(midnight, crimson, smoothstep(0.0, 0.6, m1 + flow.y * 6.0));
      col = mix(col, amber, smoothstep(0.4, 0.9, n2));
    }

    float sheen = smoothstep(0.45, 0.75, n1 + n2 * 0.5);
    col += sheen * 0.06 * vec3(0.83, 0.66, 0.26);

    float vig = smoothstep(1.25, 0.25, distance(uv, vec2(0.5)));
    col *= mix(0.7, 1.05, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function FluidSubconscious({ imagePath }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const intensity = isMobile ? 0.4 : 0.6;
    const octaves = isMobile ? 3 : 5;
    const dprCap = isMobile ? 1.5 : 2;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      uHasTexture: { value: 0 },
      uOctaves: { value: octaves },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const loader = new THREE.TextureLoader();
    loader.load(
      imagePath,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        uniforms.uTexture.value = tex;
        uniforms.uHasTexture.value = 1;
      },
      undefined,
      () => {
        // keep procedural paint fallback
      }
    );

    const target = new THREE.Vector2(0.5, 0.5);
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      target.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
    };

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.uRes.value.set(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(target, 0.05);
      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.start();
      tick();
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      clock.stop();
    };

    // Only animate while the hero is on-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("pointermove", onPointer);
          start();
        } else {
          window.removeEventListener("pointermove", onPointer);
          stop();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      uniforms.uTexture.value?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [imagePath]);

  return <div className="hero__canvas" ref={mountRef} aria-hidden="true" />;
}
