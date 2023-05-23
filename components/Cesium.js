import {
  Cartesian3,
  Color,
  Ion,
  HeightReference,
  HorizontalOrigin,
} from "cesium"
import { useState, useRef } from "react"
import { Entity, Viewer, CameraFlyTo } from "resium"
import InfoBox from "../components/InfoBox"
import CubeInfo from "../components/CubeInfo"

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YWFiYmUwMy00OWJjLTQzNzgtOGRkNy1hMjNiNzJkZDhiZTgiLCJpZCI6MTM5MDYwLCJpYXQiOjE2ODQyMjk0NTJ9.vcp3vAE8acxcoCF0cVcF8t72adLDvV-daPZ_vF2vmwU"

export default function Cesium() {
  const [box, setBox] = useState(false)
  const [model, setModel] = useState(false)
  const [cubeInfo, setCubeInfo] = useState(false)
  const [hoveredEntity, setHoveredEntity] = useState(null)
  const [selectedPolygon, setSelectedPolygon] = useState({name:null})
  const [cameraFly, setCameraFly] = useState(false);

  const handleDoubleClick = () => {
    setCameraFly(true);
    setModel(true);
  };



  const handlePolygonMouseEnter = (entity) => {
    setHoveredEntity(entity)
  }

  const handlePolygonMouseLeave = () => {
    setHoveredEntity(null)
  }

  const handlePolygonClick = (polygonData) => {
    setSelectedPolygon(polygonData);
    setBox(true);
  };

  return (
    <>
      <Viewer
        full
        timeline={false}
        homeButton={false}
        baseLayerPicker={false}
        navigationHelpButton={false}
        fullscreenButton={false}
        geocoder={false}
        infoBox={false}
        sceneMode={false}
        sceneModePicker={false}
        selectionIndicator={false}
        animation={false}
        trackedEntity={undefined}
      >
        <Entity
          name="Costa Rica"
          position={Cartesian3.fromDegrees(-84.006971, 10.430623, 100)}
          billboard={{
            image:
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/costa-rica.png?v=1684253508897",
            heightReference: HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="La Selva"
          onDoubleClick={handleDoubleClick}
      >
        {cameraFly && (
          <CameraFlyTo
            duration={2} // Adjust the duration as needed
            destination={Cartesian3.fromDegrees(-84.006971, 10.430623, 5000)}
            offset={new Cartesian3(0, 0, 20000)} // Adjust the zoom level as needed
            onComplete={() => setCameraFly(false)} // Reset the state after the camera animation completes
          />
        )}
      </Entity>

        <Entity
          name="Colombia"
          position={Cartesian3.fromDegrees(-74.00499998, 3.02166658, 100)}
          billboard={{
            image:
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/Colombia.png?v=1684253505802",
            heightReference: HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="Serrania de La Macarena"
        />
        <Entity
          name="Costa Rica Area"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -84.0092992, 10.4364417, -84.0170669, 10.4346902, -84.0168523, 10.4309972, -84.0183544, 10.4302797, -84.0136337, 10.425447, -84.0072607, 10.4276629, -84.0062952, 10.4266077, -84.0029692, 10.4276207, -84.0092992, 10.4364417,
            ]),
            material: hoveredEntity === "costaRicaArea" || selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(0.5) : Color.WHITE.withAlpha(0.4),
            fill: true,
            fillColor: hoveredEntity === "costaRicaArea" || selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(0.5) : Color.TRANSPARENT,
            outline: true,
            outlineColor: selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea")}
          onMouseLeave={handlePolygonMouseLeave}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea',
              coordinates: '-84.0092992, 10.4364417',
              location: 'La Selva', 
              bio: 'High', 
              cubes: '580 million'
            })
          }
        />
        <Entity
          name="Costa Rica Area 2"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -84.0072983, 10.4274941, -84.0136337, 10.4252993, -84.012648, 10.4213488, -84.0161348, 10.420072, -84.0130343, 10.4169803, -84.0034212, 10.4171069, -84.0004172, 10.4199348, -84.0029692, 10.427473, -84.0063542, 10.4264389, -84.0072983, 10.4274941,
            ]),
            material: hoveredEntity === "costaRicaArea2" || selectedPolygon.name === "costaRicaArea2" ? Color.ORANGE.withAlpha(0.5) : Color.WHITE.withAlpha(0.4),
            fill: true,
            fillColor: hoveredEntity === "costaRicaArea2" || selectedPolygon.name === "costaRicaArea2" ? Color.ORANGE.withAlpha(0.5) : Color.TRANSPARENT,
            outline: true,
            outlineColor: selectedPolygon.name === "costaRicaArea2" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea2")}
          onMouseLeave={handlePolygonMouseLeave}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea2',
              coordinates: '-84.0136337, 10.4252993',
              location: 'La Selva 2', 
              bio: 'Medium', 
              cubes: '340 million',
              img: '/img/laselva-2.svg'
            })
          }
        />
        <Entity
          name="Costa Rica Area 3"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -84.0185153, 10.4301847, -84.0250506, 10.4292626, -84.0273465, 10.4264981, -84.0272607, 10.420167, -84.0164031, 10.4201564, -84.0128519, 10.4214543, -84.0137732, 10.4253626, -84.0185153, 10.4301847,
            ]),
            material: hoveredEntity === "costaRicaArea3" || selectedPolygon.name === "costaRicaArea3" ? Color.ORANGE.withAlpha(0.5) : Color.WHITE.withAlpha(0.4),
            fill: true,
            fillColor: hoveredEntity === "costaRicaArea3" || selectedPolygon.name === "costaRicaArea3" ? Color.ORANGE.withAlpha(0.5) : Color.TRANSPARENT,
            outline: true,
            outlineColor: selectedPolygon.name === "costaRicaArea3" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea3")}
          onMouseLeave={handlePolygonMouseLeave}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea3',
              coordinates: '-84.0136337, 10.4252993',
              location: 'La Selva 3', 
              bio: 'Very High', 
              cubes: '467 million',
              img: '/img/laselva-3.svg'
            })
          }
        />

        {cubeInfo && (
          <Entity
            name="Cubez"
            position={Cartesian3.fromDegrees(-84.011571, 10.431023)}
            model={{
              uri: "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/Untitled.glb?v=1684514812793",
              maximumScale: 4000,
              scale: 40,
              heightReference: HeightReference.CLAMP_TO_GROUND,
            }}
            onClick={() => setCubeInfo((f) => true)}
          />
        )}
      </Viewer>
      {box && (
        <InfoBox
          closeClick={() => setBox((f) => false)}
          exploreClick={() => setCubeInfo((f) => true)}
          location={selectedPolygon.location}
          coordinates={selectedPolygon.coordinates}
          bio={selectedPolygon.bio}
          cubes={selectedPolygon.cubes}
          img={selectedPolygon.img}
        />
      )}

      {cubeInfo && <CubeInfo closeClick={() => setCubeInfo((f) => false)} />}
    </>
  )
}
