import * as THREE from "three"

export const Verde = () =>
  new THREE.ShaderMaterial({
    vertexShader: `
        uniform float time;
        uniform float multiplier;
        uniform float uOffset;

        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        attribute float aRandom;
        float PI = 3.141592653589793238;

        void main() {
            vUv = uv;

            float offset = aRandom + uOffset; // + sin(time + 15.0 * aRandom);

            vec4 mvPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
            mvPosition.y += offset * multiplier;
            mvPosition = viewMatrix * mvPosition;
            vViewPosition = -mvPosition.xyz;

            vNormal = normalMatrix * mat3(instanceMatrix) * normal;

            gl_Position = projectionMatrix * mvPosition;
        }
      `,
    fragmentShader: `
        uniform float time;
        uniform sampler2D uMatcap;

        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize( vViewPosition );
          vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
          vec3 y = cross( viewDir, x );
          vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks
          vec4 matcapColor = texture2D(uMatcap, uv);

          gl_FragColor = vec4(matcapColor.rgb, 1);
        }
      `,
    uniforms: {
      time: { value: 0 },
      uMatcap: {
        value: new THREE.TextureLoader().load("/webgl/matcap/matcap-green8.png"),
      },
      multiplier: { value: 1 },
      uOffset: { value: 0 },
    },
  })
