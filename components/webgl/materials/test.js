import * as THREE from "three"

export const TestMaterial = ({ gradient, fogColor, fogNear, fogFar }) =>
  new THREE.ShaderMaterial({
    vertexShader: `
        varying vec2 v_uv;
        void main() {
          vec3 v_e = vec3(position);
          vec3 v_n = mat3(viewMatrix * modelMatrix) * normal;
          vec3 r = reflect(normalize(v_e), normalize(v_n));
          float m = 2.0 * sqrt(pow(r.x, 2.0) + pow(r.y, 2.0) + pow(r.z + 1.0, 2.0));
          v_uv = r.xy / m + 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
    fragmentShader: `
        uniform sampler2D gradient;
        varying vec2 v_uv;

        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;

        vec3 adjustExposure(vec3 color, float value) {
          return (1.0 + value) * color;
        }

        void main() {
            vec4 color1 = texture2D(gradient, v_uv);
            color1.rgb = adjustExposure(color1.rgb, 0.5);
            vec4 color2 = vec4(v_uv, 1.0, 1.0);
            color2.rgb = adjustExposure(color2.rgb, 0.);
            gl_FragColor = mix(color1, color2, 0.2); // 80% gradient 20% uv's

            // fog
            //float fogNear = 250.0;
            //float fogFar = 500.0;
            float depth = gl_FragCoord.z / gl_FragCoord.w;
            float fogFactor = smoothstep( fogNear, fogFar, depth );
            gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
        }
      `,
    uniforms: {
      gradient: {
        value: gradient,
      },
      fogColor: {
        value: fogColor,
      },
      fogNear: {
        value: fogNear,
      },
      fogFar: {
        value: fogFar,
      },
    },
    // fog: true,
  })
