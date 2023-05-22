import { Cartesian3, Color, Ion, HeightReference, HorizontalOrigin } from 'cesium'
import { useState } from 'react';
import { Entity, Viewer } from 'resium'
import InfoBox from '../components/InfoBox'
import CubeInfo from '../components/CubeInfo'


Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YWFiYmUwMy00OWJjLTQzNzgtOGRkNy1hMjNiNzJkZDhiZTgiLCJpZCI6MTM5MDYwLCJpYXQiOjE2ODQyMjk0NTJ9.vcp3vAE8acxcoCF0cVcF8t72adLDvV-daPZ_vF2vmwU';

export default function Cesium() {
  const [box, setBox] = useState(false);
  const [model, setModel] = useState(false);
  const [cubeInfo, setCubeInfo] = useState(false);
  const [hoveredEntity, setHoveredEntity] = useState(null);


  const handlePolygonMouseEnter = (entity) => {
    setHoveredEntity(entity);
  };

  const handlePolygonMouseLeave = () => {
    setHoveredEntity(null);
  };
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
      animation={false}
      >
  
  
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
        onDoubleClick={() => setModel(f => true)}
        onClick={() => setBox(f => true)}
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
        material: hoveredEntity === 'costaRicaArea' ? Color.YELLOW.withAlpha(0.2) : Color.WHITE.withAlpha(0.2),
        fill: hoveredEntity === 'costaRicaArea' ? true : false,
        outline: true,
        outlineColor: Color.ORANGE.withAlpha(1),
        heightReference: HeightReference.CLAMP_TO_GROUND,
      }}
      onMouseEnter={() => handlePolygonMouseEnter('costaRicaArea')}
      onMouseLeave={handlePolygonMouseLeave}
      />
            <Entity
      name='Costa Rica Area 2'
      polygon={{
        hierarchy: Cartesian3.fromDegreesArray([
          -84.0072607, 10.4276629, -84.0136337, 10.425447, -84.0125622, 10.4216442, -84.01621, 10.4202936, -84.0130343, 10.417128, -84.0034212, 10.4172546, -84.0004172, 10.4200825, -84.0029692, 10.4276207, -84.0062952, 10.4266077, -84.0072607, 10.4276629
        ]),
        material: Color.WHITE.withAlpha(0.2),
        fill:false,
        outline: true,
        outlineColor: Color.ORANGE.withAlpha(1),
        heightReference: HeightReference.CLAMP_TO_GROUND,
      }}
      />
      <Entity
      name='Costa Rica Area 3'
      polygon={{
        hierarchy: Cartesian3.fromDegreesArray([
          -84.0183544, 10.4302797, -84.0248789, 10.4293681, -84.0271534, 10.4267513, -84.0270676, 10.4204202, -84.01621, 10.4202936, -84.0125622, 10.4216442, -84.0136337, 10.425447, -84.0183544, 10.4302797
        ]),
        material: Color.WHITE.withAlpha(0.2),
        fill:false,
        outline: true,
        outlineColor: Color.ORANGE.withAlpha(1),
        heightReference: HeightReference.CLAMP_TO_GROUND,
      }}
      />

      {cubeInfo && (
      <Entity
        name="Cubez"
        position={Cartesian3.fromDegrees(-84.011571, 10.431023)}
        model= {{
          uri: "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/Untitled.glb?v=1684514812793",
          maximumScale: 4000,
          scale: 40,
          heightReference: HeightReference.CLAMP_TO_GROUND, 
  
        }}
        onClick={() => setCubeInfo(f => true)}
      />
      )}
    </Viewer>
    {box && <InfoBox closeClick={() => setBox(f => false)} exploreClick={() => setCubeInfo(f => true)}/>}
    {cubeInfo &&  <CubeInfo closeClick={() => setCubeInfo(f => false)}/>}

  </>
  )
}
