import * as THREE from "three"

export const Verde = () =>
  new THREE.ShaderMaterial({
    vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;
        attribute float aRandom;
        float PI = 3.141592653589793238;

        void main() {
            vUv = uv;

            float offset = aRandom + sin(time + 15.0 * aRandom);
            offset *= 0.2;

            vec4 mvPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
            mvPosition.y += offset;
            mvPosition = viewMatrix * mvPosition;
            vViewPosition = -mvPosition.xyz;

            vNormal = normalMatrix * mat3(instanceMatrix) * normal;

            vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
            worldPosition.y += offset;
            vWorldPosition = worldPosition.xyz;

            gl_Position = projectionMatrix * mvPosition;
        }
      `,
    fragmentShader: `
        uniform float time;
        uniform sampler2D uMatcap;
        uniform sampler2D uScan;

        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize( vViewPosition );
          vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
          vec3 y = cross( viewDir, x );
          vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks
          vec4 matcapColor = texture2D(uMatcap, uv);
        
          vec2 scanUv = fract(vWorldPosition.xz);

          // wraps on the sides
          if (vNormal.y < 0.0) {
            scanUv = fract(vUv * 10.0);
          }
          vec4 scanMask = texture2D(uScan, scanUv);

          vec3 origin = vec3(0.0);

          // wave
          float dist = distance(vWorldPosition, origin);
         
          float radialMove = fract(dist - time);
         
          // radialMove *= 1. - smoothstep(1.0, 3.0, dist);
         
          radialMove *= 1.0 - step(time, dist);

          float scanMix = smoothstep(0.3, 0.0, 1.0 - radialMove);
          scanMix *= 1.0 + scanMask.r * 0.7;

          scanMix += smoothstep(0.1, 0.0, 1.0 - radialMove) * 1.5;;

          vec3 scanColor = mix(vec3(1.0), vec3(0.5, 0.5, 1.0), scanMix * 0.2);

          gl_FragColor = vec4(vUv, 0.0, 1.0);
          gl_FragColor = vec4(vNormal, 1.0);
          gl_FragColor = vec4(vWorldPosition, 1.0);
          gl_FragColor = vec4(vec3(scanMask.r), 1.0);
          gl_FragColor = vec4(vec3(scanMix), 1.0);
          gl_FragColor = vec4(scanColor, 1.0);

          gl_FragColor = matcapColor;
          // gl_FragColor.rgb = mix(gl_FragColor.rgb, scanColor, scanMix * 0.5);



        }
      `,
    uniforms: {
      time: { value: 0 },
      uMatcap: {
        value: new THREE.TextureLoader().load("/webgl/matcap/matcap3.png"),
      },
      uScan: {
        value: new THREE.TextureLoader().load("/webgl/scan.png"),
      },
    },
  })
