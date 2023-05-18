import { Cartesian3, Color, Ion, HeightReference, HorizontalOrigin } from 'cesium'
import { useState } from 'react';
import { Entity, Viewer } from 'resium'
import InfoBox from '../components/InfoBox'
import CubeInfo from '../components/CubeInfo'


Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YWFiYmUwMy00OWJjLTQzNzgtOGRkNy1hMjNiNzJkZDhiZTgiLCJpZCI6MTM5MDYwLCJpYXQiOjE2ODQyMjk0NTJ9.vcp3vAE8acxcoCF0cVcF8t72adLDvV-daPZ_vF2vmwU';

export default function Cesium() {
  const [model, setModel] = useState(false);
  const [cubeInfo, setCubeInfo] = useState(false);
  return (
    <>
    <Viewer full
    timeline={false}
    homeButton= {false} 
    baseLayerPicker= {false}
    navigationHelpButton= {false} 
    fullscreenButton= {false}
    geocoder={false}
      infoBox={false}
      sceneMode={false}
      sceneModePicker={false}
      selectionIndicator={false}    
      >
      <Entity
        name="Tokyo"
        position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
        point={{ pixelSize: 20, color: Color.WHITE }}
        description="hoge"
      />
      <Entity
        name="Costa Rica"
        position={Cartesian3.fromDegrees(-84.006971, 10.430623, 100)}
        billboard={{
          image: 'https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/costa-rica.png?v=1684253508897',
          heightReference: HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          horizontalOrigin: HorizontalOrigin.LEFT,
        }}
        description="La Selva"
        onClick={() => setModel(f => !f)}
      />

      <Entity
        name="Colombia"
        position={Cartesian3.fromDegrees(-74.00499998, 3.02166658, 100)}
        billboard={{
          image: 'https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/Colombia.png?v=1684253505802',
          heightReference: HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          horizontalOrigin: HorizontalOrigin.LEFT,
        }}
        description="Serrania de La Macarena"
      />
      <Entity
      name='Costa Rica Area'
      polygon={{
        hierarchy: Cartesian3.fromDegreesArray([
          -84.0092992, 
          10.4364417,
          -84.0170669,
          10.4346902,
          -84.0168523, 
          10.4309972,
          -84.0183544,
          10.4302797, 
          -84.0136337,
          10.425447, 
          -84.0072607,
          10.4276629, 
          -84.0062952,
          10.4266077,
          -84.0029692,
          10.4276207,
          -84.0092992,
          10.4364417
        ]),
        material: Color.RED,
        fill:false,
        outline: true,
        outlineColor: Color.LIME,
        heightReference: HeightReference.CLAMP_TO_GROUND,

      }}
      />
      {model && (
      <Entity
        name="https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/Baked_Animations.glb?v=1684333790800"
        position={Cartesian3.fromDegrees(-84.007971, 10.430623)}
        model= {{
          uri: "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/Baked_Animations.glb?v=1684333790800",
          minimumPixelSize: 128,
          maximumScale: 128,
          heightReference: HeightReference.CLAMP_TO_GROUND,
  
        }}
        onClick={() => setCubeInfo(f => !f)}
      />
      )}
    </Viewer>
    <InfoBox/>
    <CubeInfo/>
  </>
  )
}
