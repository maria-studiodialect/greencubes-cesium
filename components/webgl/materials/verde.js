import * as THREE from "three"

export const Verde = ({ outline, opacity }) =>
  new THREE.ShaderMaterial({
    vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
    fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 outlineColor;
        uniform float opacity;

        void main() {
            float outline = 0.95 - smoothstep(0.95, 1.0, length(vNormal));

            gl_FragColor = vec4(vec3(outline), 1.0); //vec4(outlineColor, outline * opacity);
        }
      `,
    uniforms: {
      outlineColor: { value: new THREE.Color(outline) },
      opacity: { value: opacity },
    },
    // fog: true,
  })
