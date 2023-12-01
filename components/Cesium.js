import {
  Cartesian3,
  Color,
  Ion,
  HeightReference,
  HorizontalOrigin,
  ScreenSpaceEventType,
  IonImageryProvider, 
  createWorldTerrain
} from "cesium"
import { useState, useRef, useEffect } from "react"
import { Entity, Viewer, CameraFlyTo, Scene, Globe, Camera } from "resium"
import InfoBox from "../components/InfoBox"
import CubeInfo from "../components/CubeInfo"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import UnityBuild from "../components/UnityBuild"
import BuildingInfo from "../components/BuildingInfo"


Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMjQ1ZDBmNi00OWVhLTQ2N2MtOWNkZS0yZTc1ZGE2Yzg4NzgiLCJpZCI6MTQxNDkxLCJpYXQiOjE2ODUwMjcwMzB9.9ItNpoWAU_9XHWjvLiRfNaF_EiO0WusZ7X7184iR-T0"

export default function Cesium() {
  const [box, setBox] = useState(false)
  const [model, setModel] = useState(false)
  const [cubeInfo, setCubeInfo] = useState(false)
  const [hoveredEntity, setHoveredEntity] = useState(null)
  const [selectedPolygon, setSelectedPolygon] = useState({name:null})
  const [cameraFly, setCameraFly] = useState(false);
  const [cameraCubes, setCameraCubes] = useState(false);
  const [position, setPosition] = useState(null);
  const [coordinates, setCoordinates] = useState(null)
  const cesium = useRef(null)
  const viewerRef = useRef(null)
  const selectedGreen = Color.fromCssColorString('#4DA947').withAlpha(0.5)
  const hoverGreen = Color.fromCssColorString('#8DB388').withAlpha(0.7)
  const outlineGreen = Color.fromCssColorString('#224C25').withAlpha(1)


  const image = "/img/test.jpg"

  const handleHover = (cube) => {
    console.log("hover on cube", cube)
  }

  const handleOut = () => {
    console.log("out")
  }

  const handleDoubleClick = () => {
    setPosition(cesium.current?.cesiumElement?._positionCartographic?.height)
    setCameraFly(true);
    setModel(true);
  };

  const handlePolygonMouseEnter = (entity) => {
    setHoveredEntity(entity)
    document.body.style.cursor = 'pointer';
  }
  const doubleClickQuiet = () => {
    //console.log('double click')
  }

  const handlePolygonMouseLeave = () => {
    setHoveredEntity(null)
    document.body.style.cursor = 'default';
  }

  const handlePolygonClick = (polygonData) => {
    setSelectedPolygon(polygonData);
    setBox(true);
    const [longitude, latitude] = polygonData.coordinates.split(',').map(coord => parseFloat(coord.trim()));
    setCoordinates({longitude: longitude, latitude: latitude})
  };

  const handleExploreClick = () => {
    setPosition(cesium.current?.cesiumElement?._positionCartographic?.height)
    setCubeInfo(true);
    setCameraCubes(true);
  }

  const closeInfoCubes = () => {
    setPosition(cesium.current?.cesiumElement?._positionCartographic?.height)
    setCubeInfo(false);
    setCameraFly(true);
  }

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = viewerRef.current?.cesiumElement;
      viewer.screenSpaceEventHandler.removeInputAction(
        ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
    }
  }, []);


  return (
    <>
      <Viewer
        ref={viewerRef}
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
        terrainProvider={createWorldTerrain()}
      >
        <Scene />
        <Globe />
        <Camera ref={cesium}/>
        <Entity
          name="Costa Rica"
          position={Cartesian3.fromDegrees(-83.18837090285736, 8.708579229757717, 100)}
          billboard={{
            image:
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/costa-rica.png?v=1684253508897",
            heightReference: HeightReference.CLAMP_TO_GROUND,
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="La Gamba"
          onDoubleClick={handleDoubleClick}
          onMouseEnter={() => document.body.style.cursor = 'pointer'}
          onMouseLeave={() => document.body.style.cursor = 'default'}
      >
        {cameraFly && (
          <CameraFlyTo
            duration={2} // Adjust the duration as needed
            destination={Cartesian3.fromDegrees(-83.18837090285736, 8.708579229757717, 6000)}
            offset={new Cartesian3(0, 0, 20000)} // Adjust the zoom level as needed
            maximumHeight={position}
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
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="Serrania de La Macarena"
          onMouseEnter={() => document.body.style.cursor = 'pointer'}
          onMouseLeave={() => document.body.style.cursor = 'default'}
        />

      <Entity
          name="Brazil"
          position={Cartesian3.fromDegrees(-48.205586, -24.683075, 100)}
          billboard={{
            image:
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/Brasil.png?v=1685011500173",
            heightReference: HeightReference.CLAMP_TO_GROUND,
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="Cajati"
          onMouseEnter={() => document.body.style.cursor = 'pointer'}
          onMouseLeave={() => document.body.style.cursor = 'default'}
        />
        
        {cameraCubes &&
          <CameraFlyTo
            duration={2} // Adjust the duration as needed
            destination={Cartesian3.fromDegrees(coordinates.longitude, coordinates.latitude, 100)}
            offset={new Cartesian3(0, 0, 500)} // Adjust the zoom level as needed
            maximumHeight={position}
            onComplete={() => setCameraCubes(false)} // Reset the state after the camera animation completes
          />
        }
        <Entity
          name="Costa Rica Area"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.20242972659405,8.700082058155436,0 -83.20175800222725,8.699860569079352,0 -83.20155978832922,8.700130078432313,0 -83.20165488750533,8.700412174732799,0 -83.20159200153307,8.700732928924968,0 -83.20185595577597,8.700812275774163,0 -83.20227298918174,8.700952883488037,0 -83.20270660155461,8.700677855947868,0 -83.20242972659405,8.700082058155436
            ]),
            material: (() => {
              if (hoveredEntity === 'costaRicaArea') {
                return hoverGreen;
              } else if (selectedPolygon.name === 'costaRicaArea') {
                return selectedGreen;
              } else {
                return Color.WHITE.withAlpha(0.3);
              }
            })(),
            fill: true,
            fillColor: hoveredEntity === "costaRicaArea" || selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(0.5) : Color.TRANSPARENT,
            outline: true,
            outlineColor: selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea")}
          onMouseLeave={handlePolygonMouseLeave}
          onDoubleClick={doubleClickQuiet}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea',
              coordinates: '-83.20242972659405,8.700082058155436',
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
              -83.17605240146077,8.712786755328775,0 -83.17406036546352,8.708759834175375,0 -83.17146428794715,8.710658512386951,0 -83.17078466190627,8.711269918005209,0 -83.1721993820246,8.714406002668166,0 -83.17605240146077,8.712786755328775
            ]),
            material: (() => {
              if (hoveredEntity === 'costaRicaArea2') {
                return hoverGreen;
              } else if (selectedPolygon.name === 'costaRicaArea2') {
                return selectedGreen;
              } else {
                return Color.WHITE.withAlpha(0.3);
              }
            })(),
            fill: true,
            outline: true,
            outlineColor: selectedPolygon.name === "costaRicaArea2" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea2")}
          onMouseLeave={handlePolygonMouseLeave}
          onDoubleClick={doubleClickQuiet}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea2',
              coordinates: '-83.17605240146077,8.712786755328775',
              location: 'La Selva 2', 
              bio: 'Very High', 
              cubes: '340 million',
              img: '/img/laselva-2.svg'
            })
          }
        />
        <Entity
          name="Costa Rica Area 3"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.1746627910919,8.715954642202648,0 -83.1737570781505,8.713936806606773,0 -83.17225636996424,8.714578212993517,0 -83.17427388150296,8.719114376600476,0 -83.17459705888224,8.719035778065916,0 -83.17493506353392,8.719244663164448,0 -83.17547381808328,8.719350260654883,0 -83.17598596924216,8.719206239997447,0 -83.17648590750156,8.718956333337792,0 -83.17663486209328,8.71875732663138,0 -83.17652764759447,8.71843855349665,0 -83.17623064260972,8.718252040559312,0 -83.17589290352993,8.718265574729413,0 -83.17519012725013,8.718199728650866,0 -83.17504140398765,8.717972596981951,0 -83.17535234815065,8.717799168364181,0 -83.17655527327155,8.717277397041395,0 -83.17670398008781,8.717010225329005,0 -83.17690683882057,8.716662893778647,0 -83.17627182685756,8.715272990225751,0 -83.1746627910919,8.715954642202648  
            ]),
            material: (() => {
              if (hoveredEntity === 'costaRicaArea3') {
                return hoverGreen;
              } else if (selectedPolygon.name === 'costaRicaArea3') {
                return selectedGreen;
              } else {
                return Color.WHITE.withAlpha(0.3);
              }
            })(),
            fill: true,
            outline: true,
            zIndex: 1, 
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea3")}
          onMouseLeave={handlePolygonMouseLeave}
          onDoubleClick={doubleClickQuiet}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea3',
              coordinates: '-83.2290178, 8.7211045',
              location: 'La Selva 3', 
              bio: 'High', 
              cubes: '467 million',
              img: '/img/laselva-3.svg'
            })
          }
        />
      {selectedPolygon.name === "costaRicaArea2" &&
        <Entity
          name="Inner Area"
          polyline={{
            positions: Cartesian3.fromDegreesArray([
              -83.2188616, 8.7195678, -83.2172415, 8.7154318, -83.2166729, 8.7158136, -83.2164047, 8.7171392, -83.2173917, 8.7195996, -83.2188616, 8.7195678  
            ]),
            zIndex: 2,
            material: outlineGreen,
            width: 4,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />
      }
      </Viewer>
      <AnimatePresence>
      {box && (
        <InfoBox
          closeClick={() => setBox((f) => false)}
          exploreClick={handleExploreClick}
          location={selectedPolygon.location}
          coordinates={selectedPolygon.coordinates}
          bio={selectedPolygon.bio}
          cubes={selectedPolygon.cubes}
          img={selectedPolygon.img}
          cubeInfo={cubeInfo}
        />
      )}
      </AnimatePresence>
        
      <AnimatePresence>
        {cubeInfo && (
          <>
          <CubeInfo closeClick={closeInfoCubes} />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cubeInfo && (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.5 } }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, duration: 1 }}
        >
          <UnityBuild/>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
