import React, { useEffect, useRef } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.THREE) return;

    const THREE = window.THREE;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: false,
        antialias: false,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.0));
    } catch (e) {
      console.warn('WebGL init error:', e);
      return;
    }

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Exact Streamlined High-Performance Chromatic Fluid Shader from SRE Incident Copilot
    const fragmentShader = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec3 u_colorA;
      uniform vec3 u_colorB;
      uniform vec3 u_colorC;
      uniform vec3 u_colorD;
      varying vec2 vUv;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 p) {
        float total = 0.0;
        float amp = 0.55;
        for (int i = 0; i < 3; i++) {
          total += snoise(p) * amp;
          p = p * 2.15 + vec2(12.3, 45.6);
          amp *= 0.5;
        }
        return total;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

        vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0);
        float dM = length(p - m);
        float mouseEffect = smoothstep(0.5, 0.0, dM) * 0.18;

        float t = u_time * 0.16;

        float qx = fbm(p * 1.35 + vec2(t * 0.28, t * 0.2) + mouseEffect);
        float qy = fbm(p * 1.35 + vec2(-t * 0.22, t * 0.3));
        vec2 q = vec2(qx, qy);

        float rx = fbm(p * 1.6 + q * 1.3 + vec2(t * 0.15, -t * 0.18));
        float ry = fbm(p * 1.6 + q * 1.3 + vec2(-t * 0.14, t * 0.19));
        vec2 r = vec2(rx, ry);

        float f = fbm(p * 1.45 + r * 1.45);

        // Blend 4 vibrant chromatic layers
        vec3 col = mix(u_colorA, u_colorB, clamp((f * f) * 3.8, 0.0, 1.0));
        col = mix(col, u_colorC, clamp(length(q) * 1.1, 0.0, 1.0));
        col = mix(col, u_colorD, clamp(length(r.x) * 1.1, 0.0, 1.0));

        // Ambient vignette
        float vignette = 1.0 - smoothstep(0.35, 1.45, length(uv - 0.5));
        col *= (0.75 + 0.25 * vignette);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Palettes from SRE Copilot
    const palettes = [
      {
        a: new THREE.Color('#030080'),
        b: new THREE.Color('#00c853'),
        c: new THREE.Color('#2979ff'),
        d: new THREE.Color('#7c4dff')
      },
      {
        a: new THREE.Color('#4a148c'),
        b: new THREE.Color('#00e5ff'),
        c: new THREE.Color('#aa00ff'),
        d: new THREE.Color('#0a0024')
      }
    ];

    let targetPaletteIdx = 0;
    const currentColors = {
      a: palettes[0].a.clone(),
      b: palettes[0].b.clone(),
      c: palettes[0].c.clone(),
      d: palettes[0].d.clone()
    };

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_colorA: { value: currentColors.a },
      u_colorB: { value: currentColors.b },
      u_colorC: { value: currentColors.c },
      u_colorD: { value: currentColors.d }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const clock = new THREE.Clock();

    let targetMouseX = 0.5, targetMouseY = 0.5;
    const handleMouseMove = (e) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = 1.0 - (e.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);

      uniforms.u_time.value = clock.getElapsedTime();

      // Smooth mouse interpolation across whole page
      uniforms.u_mouse.value.x += (targetMouseX - uniforms.u_mouse.value.x) * 0.06;
      uniforms.u_mouse.value.y += (targetMouseY - uniforms.u_mouse.value.y) * 0.06;

      // Cycle palettes smoothly
      const target = palettes[targetPaletteIdx];
      const factor = 0.045;
      currentColors.a.lerp(target.a, factor);
      currentColors.b.lerp(target.b, factor);
      currentColors.c.lerp(target.c, factor);
      currentColors.d.lerp(target.d, factor);

      renderer.render(scene, camera);
    }

    animate();

    // Auto cycle palette every 12 seconds
    const cycleInterval = setInterval(() => {
      targetPaletteIdx = (targetPaletteIdx + 1) % palettes.length;
    }, 12000);

    const handleResize = () => {
      if (!renderer) return;
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      renderer.setSize(newW, newH);
      uniforms.u_resolution.value.set(newW, newH);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(cycleInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Fluid Canvas */}
      <canvas
        ref={canvasRef}
        id="hero-fluid-canvas"
        className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      />
      {/* Ambient Dark Fluid Vignette */}
      <div className="global-fluid-vignette" />
    </>
  );
}
