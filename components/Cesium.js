import {
  Cartesian3,
  Color,
  Ion,
  HeightReference,
  HorizontalOrigin,
  ScreenSpaceEventType,
  IonImageryProvider, 
  createWorldTerrain,
  CesiumTerrainProvider,
  IonResource,
  Cesium3DTileset,
  Math,
  Cartographic
} from "cesium"
import { useState, useRef, useEffect, useMemo } from "react"
import { Entity, Viewer, CameraFlyTo, Scene, Globe, Camera } from "resium"
import InfoBox from "../components/InfoBox"
import CubeInfo from "../components/CubeInfo"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import UnityBuild from "../components/UnityBuild"
import BuildingInfo from "../components/BuildingInfo"
import InfoModal from "./InfoModal"
import WiderModal from "./WiderModal"
import MultiModal from "./MultiModal"
import Carousel from "./Carousel"
import { IoMdClose } from "react-icons/io";


Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MmQ1ZWI4YS1mYzgzLTQyMjktOWI3Yi1kNzdjZGJjYzQ2YzEiLCJpZCI6MTM5MDYwLCJpYXQiOjE3MDE2ODE2MzV9.-iuRo4YnxpdDKMqVLqNxPDFcpVDzCZs07ovC3AoOvSo"

export default function Cesium() {
  const [box, setBox] = useState(false)
  const [model, setModel] = useState(false)
  const [cubeInfo, setCubeInfo] = useState(false)
  const [hoveredEntity, setHoveredEntity] = useState(null)
  const [selectedPolygon, setSelectedPolygon] = useState({name:null})
  const [cameraFly, setCameraFly] = useState(false);
  const [secondCameraFly, setSecondCameraFly] = useState(false);
  const [cameraCubes, setCameraCubes] = useState(false);
  const [position, setPosition] = useState(null);
  const [coordinates, setCoordinates] = useState(null)
  const [carousel, setCarousel] = useState(0)
  const cesium = useRef(null)
  const viewerRef = useRef(null)
  const selectedGreen = Color.fromCssColorString('#4DA947').withAlpha(0.5)
  const selectedOrange = Color.fromCssColorString('#F5BD2D').withAlpha(0.5)
  const hoverOrange = Color.fromCssColorString('#F5BD2D').withAlpha(0.7)
  const hoverGreen = Color.fromCssColorString('#8DB388').withAlpha(0.7)
  const outlineGreen = Color.fromCssColorString('#224C25').withAlpha(1)
  const outlineBlue = Color.fromCssColorString('#299F93').withAlpha(1)
  const outlineOrange = Color.fromCssColorString('#F5BD2D').withAlpha(1)
  const [infoModal, setInfoModal] = useState(false)
  const [tilesetUrl, setTilesetUrl] = useState(null);




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

  const openInfoModal = () => {
    setInfoModal(true)
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
    setInfoModal(false)
    setSelectedPolygon(polygonData);
    setBox(true);
    const [longitude, latitude] = polygonData.coordinates.split(',').map(coord => parseFloat(coord.trim()));
    setCoordinates({longitude: longitude, latitude: latitude})
  };

  const handleExploreClick = () => {
    setPosition(cesium.current?.cesiumElement?._positionCartographic?.height)
    setCubeInfo(true);
    setCameraCubes(true);
    setBox(false)
  }

  const closeInfoCubes = () => {
    setPosition(cesium.current?.cesiumElement?._positionCartographic?.height)
    setCubeInfo(false);
    setCameraFly(true);
    setBox(true);
  }

  const terrainProvider = useMemo(() => new CesiumTerrainProvider({
    url: IonResource.fromAssetId(1)
  }), []);
  
  const imageryProvider = useMemo(() => new IonImageryProvider({
    assetId: 3954
  }), []);

  const initialCameraView = {
    destination: Cartesian3.fromDegrees(-78.35623066008425, 2.9224258786165658, 22260578.86946213), // Example coordinates and altitude
  };
  useEffect(() => {
    // Ensure the viewer is fully loaded and defined
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement;
      viewer.camera.setView(initialCameraView);
      viewer.screenSpaceEventHandler.removeInputAction(
        ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
    }
  }, [viewerRef]); // Add viewerRef as a dependency to the useEffect hook
  
  const getCoords = () => {
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement;

      const position = viewer.camera.positionWC;
    
      // Convert the position to longitude, latitude, and height
      const cartographic = Cartographic.fromCartesian(position);
      const longitude = Math.toDegrees(cartographic.longitude);
      const latitude = Math.toDegrees(cartographic.latitude);
      const height = cartographic.height;
    
      // Get the heading, pitch, and roll
      const heading = Math.toDegrees(viewer.camera.heading);
      const pitch = Math.toDegrees(viewer.camera.pitch);
      const roll = Math.toDegrees(viewer.camera.roll);
    
      // Log the values
      console.log(`Longitude: ${longitude}, Latitude: ${latitude}, Height: ${height}`);
      console.log(`Heading: ${heading}, Pitch: ${pitch}, Roll: ${roll}`);
      // Now it's safe to use screenSpaceEventHandler
    }
  }

  return (
    <>
      {/* <div onClick={getCoords} className="fixed z-40 bottom-0 right-0 bg-white">GET COORDS</div> */}
      <Viewer
        ref={viewerRef}
        imageryProvider={imageryProvider}
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
        terrainProvider={terrainProvider}
      >
        <Scene />
        <Globe />
        <Camera ref={cesium}/>
        <Entity
          name="Costa Rica"
          position={Cartesian3.fromDegrees(-83.18837090285736, 8.728579229757717, 100)}
          billboard={{
            image:
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/costa-rica.png?v=1701444968501",
            heightReference: HeightReference.CLAMP_TO_GROUND,
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="La Gamba"
          onClick={openInfoModal}
          onDoubleClick={handleDoubleClick}
          onMouseEnter={() => document.body.style.cursor = 'pointer'}
          onMouseLeave={() => document.body.style.cursor = 'default'}
      >
        {cameraFly && (
          <CameraFlyTo
            duration={3} // Adjust the duration as needed
            destination={Cartesian3.fromDegrees(-83.18781216312169, 8.628374507004306, 5957.829202074955)}
            offset={new Cartesian3(0, 0, 0)} // Adjust the zoom level as needed
            orientation={{
              heading: Math.toRadians(0),   // East, in radians
              pitch: Math.toRadians(-30),   // Directly downwards
              roll: 0.0                             // No roll
            }}
            maximumHeight={position}
            onComplete={() => (setCameraFly(false), setInfoModal(false))} // Reset the state after the camera animation completes
          />
        )}
      </Entity>

        <Entity
          name="Colombia"
          position={Cartesian3.fromDegrees(-74.00499998, 3.02166658, 100)}
          billboard={{
            image:
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/colombia.png?v=1701444968146",
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
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/brazil.png?v=1701444967776",
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
            destination={Cartesian3.fromDegrees(coordinates.longitude, coordinates.latitude, 500)}
            offset={new Cartesian3(0, 0, 500)} // Adjust the zoom level as needed
            orientation={{
              heading: Math.toRadians(0),   // East, in radians
              pitch: Math.toRadians(-30),   // Directly downwards
              roll: 0.0                             // No roll
            }}
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
                return selectedOrange;
              } else if (selectedPolygon.name === 'costaRicaArea') {
                return hoverOrange;
              } else {
                return Color.WHITE.withAlpha(0.3);
              }
            })(),
            fill: true,
            fillColor: hoveredEntity === "costaRicaArea" || selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(0.5) : Color.TRANSPARENT,
            outline: true,
            zIndex: 2, 
            outlineColor: selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND,
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea")}
          onMouseLeave={handlePolygonMouseLeave}
          onDoubleClick={doubleClickQuiet}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea',
              coordinates: '-83.20242972659405,8.700082058155436',
              location: 'La Gamba', 
              bio: 'High', 
              cubes: '580 million'
            })
          }
        />
        <Entity
          name="Costa Rica Area 2"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.17605240146077 + 0.00001, 8.712786755328775 + 0.00001,
              -83.17406036546352 + 0.00001, 8.708759834175375 + 0.00001,
              -83.17146428794715 + 0.00001, 8.710658512386951 + 0.00001,
              -83.17078466190627 + 0.00001, 8.711269918005209 + 0.00001,
              -83.1721993820246 + 0.00001, 8.714406002668166 + 0.00001,
              -83.17605240146077 + 0.00001, 8.712786755328775 + 0.00001
            ]),
            material: (() => {
              if (hoveredEntity === 'costaRicaArea2') {
                return selectedOrange;
              } else if (selectedPolygon.name === 'costaRicaArea2') {
                return hoverOrange;
              } else {
                return Color.WHITE.withAlpha(0.3);
              }
            })(),
            fill: true,
            outline: true,
            width: 2,
            zIndex: 3,
            outlineColor:  Color.ORANGE.withAlpha(1),
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
                return selectedOrange;
              } else if (selectedPolygon.name === 'costaRicaArea3') {
                return hoverOrange;
              } else {
                return Color.WHITE.withAlpha(0.3);
              }
            })(),
            fill: true,
            outline: true,
            outlineColor:  Color.ORANGE.withAlpha(1),
            zIndex: 3,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea3")}
          onMouseLeave={handlePolygonMouseLeave}
          onDoubleClick={handleExploreClick}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea3',
              coordinates: '-83.1746627910919,8.715954642202648',
              location: 'La Selva 3', 
              bio: 'High', 
              cubes: '467 million',
              img: '/img/laselva-3.svg'
            })
          }
        />
        <Entity
          name="La Gamba Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.20242972659405,8.700082058155436,0 -83.20175800222725,8.699860569079352,0 -83.20155978832922,8.700130078432313,0 -83.20165488750533,8.700412174732799,0 -83.20159200153307,8.700732928924968,0 -83.20185595577597,8.700812275774163,0 -83.20227298918174,8.700952883488037,0 -83.20270660155461,8.700677855947868,0 -83.20242972659405,8.700082058155436
            ]),
            zIndex: 2,
            material: outlineOrange,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />
        <Entity
          name="Finca Eduardo Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.17605240146077 + 0.00001, 8.712786755328775 + 0.00001,
              -83.17406036546352 + 0.00001, 8.708759834175375 + 0.00001,
              -83.17146428794715 + 0.00001, 8.710658512386951 + 0.00001,
              -83.17078466190627 + 0.00001, 8.711269918005209 + 0.00001,
              -83.1721993820246 + 0.00001, 8.714406002668166 + 0.00001,
              -83.17605240146077 + 0.00001, 8.712786755328775 + 0.00001
            ]),
            zIndex: 3,
            material: outlineOrange,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />
        <Entity
          name="Finca Amable Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.1746627910919,8.715954642202648,0 -83.1737570781505,8.713936806606773,0 -83.17225636996424,8.714578212993517,0 -83.17427388150296,8.719114376600476,0 -83.17459705888224,8.719035778065916,0 -83.17493506353392,8.719244663164448,0 -83.17547381808328,8.719350260654883,0 -83.17598596924216,8.719206239997447,0 -83.17648590750156,8.718956333337792,0 -83.17663486209328,8.71875732663138,0 -83.17652764759447,8.71843855349665,0 -83.17623064260972,8.718252040559312,0 -83.17589290352993,8.718265574729413,0 -83.17519012725013,8.718199728650866,0 -83.17504140398765,8.717972596981951,0 -83.17535234815065,8.717799168364181,0 -83.17655527327155,8.717277397041395,0 -83.17670398008781,8.717010225329005,0 -83.17690683882057,8.716662893778647,0 -83.17627182685756,8.715272990225751,0 -83.1746627910919,8.715954642202648  
            ]),
            zIndex: 4,
            material: outlineOrange,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />
      <Entity
          name="Quebrada Chorro Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.17616548869073,8.704925709509777,0 -83.17664851735405,8.704325694630096,0 -83.17530058441766,8.702933732275342,0 -83.17216131514597,8.701515247161396,0 -83.1696610953375,8.699066889042577,0 -83.16828929999512,8.697753285130275,0 -83.16557051043456,8.696108284033279,0 -83.16465383693058,8.697056167505565,0 -83.16324920857792,8.696938905688651,0 -83.16191449729791,8.695659949726251,0 -83.16121731707938,8.694494306849535,0 -83.16119216364322,8.693239973757732,0 -83.16049813154871,8.692883553820918,0 -83.15937416107538,8.694263223573772,0 -83.15909804448358,8.696332010537708,0 -83.15956943578485,8.698549466523163,0 -83.16055593431287,8.701493338530343,0 -83.16053789688348,8.702893944229496,0 -83.16055422274326,8.704560519649348,0 -83.16162391577451,8.705348582848769,0 -83.16336018051007,8.706550359014017,0 -83.16484648009299,8.706247707910141,0 -83.16618323153025,8.705347828767614,0 -83.16741948502869,8.704808851324604,0 -83.17215799108075,8.705382008556864,0 -83.17335610346477,8.706244436979565,0 -83.17416816820878,8.705042082715583,0 -83.17616548869073,8.704925709509777 
            ]),
            zIndex: 2,
            material: outlineBlue,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />

        <Entity
          name="Quebrada Chorro"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.17616548869073,8.704925709509777,0 -83.17664851735405,8.704325694630096,0 -83.17530058441766,8.702933732275342,0 -83.17216131514597,8.701515247161396,0 -83.1696610953375,8.699066889042577,0 -83.16828929999512,8.697753285130275,0 -83.16557051043456,8.696108284033279,0 -83.16465383693058,8.697056167505565,0 -83.16324920857792,8.696938905688651,0 -83.16191449729791,8.695659949726251,0 -83.16121731707938,8.694494306849535,0 -83.16119216364322,8.693239973757732,0 -83.16049813154871,8.692883553820918,0 -83.15937416107538,8.694263223573772,0 -83.15909804448358,8.696332010537708,0 -83.15956943578485,8.698549466523163,0 -83.16055593431287,8.701493338530343,0 -83.16053789688348,8.702893944229496,0 -83.16055422274326,8.704560519649348,0 -83.16162391577451,8.705348582848769,0 -83.16336018051007,8.706550359014017,0 -83.16484648009299,8.706247707910141,0 -83.16618323153025,8.705347828767614,0 -83.16741948502869,8.704808851324604,0 -83.17215799108075,8.705382008556864,0 -83.17335610346477,8.706244436979565,0 -83.17416816820878,8.705042082715583,0 -83.17616548869073,8.704925709509777 
            ]),
            zIndex: 1,
            fill: true, 
            material: Color.WHITE.withAlpha(0.3),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />    

        <Entity
          name="Finca Marcos Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.20494390466358,8.715159152117959,0 -83.20563032894228,8.713089052144312,0 -83.20693578050695,8.712207436009241,0 -83.20868705430314,8.711934616021788,0 -83.20947215095227,8.711764836745294,0 -83.21061570312845,8.710855138970031,0 -83.21013873948588,8.70839583772986,0 -83.20963016862386,8.707954249131312,0 -83.20942769259685,8.707174730132529,0 -83.20863637252374,8.704835692182016,0 -83.20863069709412,8.703214953418387,0 -83.20798504190863,8.702420305696894,0 -83.20676491676757,8.701545062551981,0 -83.20563539926137,8.701146620690569,0 -83.20505116154854,8.70214699478689,0 -83.20446756236964,8.703091003294759,0 -83.20460918998234,8.704055109833618,0 -83.20540403578308,8.704904332790214,0 -83.20513020534543,8.707321422891878,0 -83.20492824740117,8.708335418980713,0 -83.20423924907472,8.709201071545134,0 -83.20301218177262,8.710213596487977,0 -83.20263899653477,8.711259126568624,0 -83.20332340556236,8.712505596598939,0 -83.2026269177701,8.71321809144505,0 -83.20210179570878,8.714373989946345,0 -83.20104384392249,8.715387542527651,0 -83.20102684658796,8.716186975485353,0 -83.20211527141002,8.716697996856762,0 -83.20319337408253,8.716346138555281,0 -83.20394207683773,8.716322561284358,0 -83.20466058291042,8.716739994154175,0 -83.20494390466358,8.715159152117959
            ]),
            zIndex: 2,
            material: outlineBlue,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            fill: true,
            fillColor: hoveredEntity === "costaRicaArea" || selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(0.5) : Color.TRANSPARENT,
          }}
        />

        <Entity
          name="Finca Marcos"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.20494390466358,8.715159152117959,0 -83.20563032894228,8.713089052144312,0 -83.20693578050695,8.712207436009241,0 -83.20868705430314,8.711934616021788,0 -83.20947215095227,8.711764836745294,0 -83.21061570312845,8.710855138970031,0 -83.21013873948588,8.70839583772986,0 -83.20963016862386,8.707954249131312,0 -83.20942769259685,8.707174730132529,0 -83.20863637252374,8.704835692182016,0 -83.20863069709412,8.703214953418387,0 -83.20798504190863,8.702420305696894,0 -83.20676491676757,8.701545062551981,0 -83.20563539926137,8.701146620690569,0 -83.20505116154854,8.70214699478689,0 -83.20446756236964,8.703091003294759,0 -83.20460918998234,8.704055109833618,0 -83.20540403578308,8.704904332790214,0 -83.20513020534543,8.707321422891878,0 -83.20492824740117,8.708335418980713,0 -83.20423924907472,8.709201071545134,0 -83.20301218177262,8.710213596487977,0 -83.20263899653477,8.711259126568624,0 -83.20332340556236,8.712505596598939,0 -83.2026269177701,8.71321809144505,0 -83.20210179570878,8.714373989946345,0 -83.20104384392249,8.715387542527651,0 -83.20102684658796,8.716186975485353,0 -83.20211527141002,8.716697996856762,0 -83.20319337408253,8.716346138555281,0 -83.20394207683773,8.716322561284358,0 -83.20466058291042,8.716739994154175,0 -83.20494390466358,8.715159152117959
            ]),
            zIndex: 1,
            fill: true, 
            material: Color.WHITE.withAlpha(0.3),
            heightReference: HeightReference.CLAMP_TO_GROUND,
          }}
        />

        <Entity
          name="Finca Luis Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.19360114073274,8.713122658162435,0 -83.19176782572129,8.715409814528256,0 -83.19250107693908,8.715953222018005,0 -83.19427666687339,8.71356419553077,0 -83.19360114073274,8.713122658162435
            ]),
            zIndex: 2,
            material: outlineBlue,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />

      <Entity
          name="Finca Luis"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.19360114073274,8.713122658162435,0 -83.19176782572129,8.715409814528256,0 -83.19250107693908,8.715953222018005,0 -83.19427666687339,8.71356419553077,0 -83.19360114073274,8.713122658162435
            ]),
            zIndex: 1,
            fill: true, 
            material: Color.WHITE.withAlpha(0.3),
            heightReference: HeightReference.CLAMP_TO_GROUND,
          }}
        />
        <Entity
          name="Finca Alexis_1 Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.16919159338516,8.757222855124665,0 -83.1669931572665,8.757320868126021,0 -83.16580804245207,8.757775436717422,0 -83.16469350454304,8.757840058502509,0 -83.16253330455245,8.75783938881704,0 -83.15948594891935,8.757061328608048,0 -83.16013223964811,8.758096027577356,0 -83.16047929519782,8.759578318722573,0 -83.15972755579283,8.761050675381727,0 -83.16110263428916,8.761690197889042,0 -83.16264954775356,8.763373418897638,0 -83.16186082199486,8.76524763249199,0 -83.16206130827175,8.766853346338243,0 -83.16426667916706,8.766677336385383,0 -83.16543945557922,8.765713987133163,0 -83.1662187639904,8.766241061996976,0 -83.16798046971849,8.765610519225834,0 -83.16817712910662,8.766581672806808,0 -83.167331400202,8.767854785708085,0 -83.16851159347154,8.76951424968003,0 -83.16981723636174,8.769580839139859,0 -83.17171851094827,8.766990001717071,0 -83.17053668613843,8.765630660510647,0 -83.1707338385997,8.764333698216914,0 -83.17066893951844,8.762852523413091,0 -83.17225156639817,8.762010681629695,0 -83.17179298295066,8.760713369294891,0 -83.17298467567923,8.759866634667295,0 -83.17212556188353,8.759082760677552,0 -83.17232599084309,8.757578955160504,0 -83.17172836290439,8.756664203774196,0 -83.1708667845985,8.755821656190934,0 -83.16919159338516,8.757222855124665
            ]),
            zIndex: 2,
            material: outlineBlue,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />
        <Entity
          name="Finca Alexis_1"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.16919159338516,8.757222855124665,0 -83.1669931572665,8.757320868126021,0 -83.16580804245207,8.757775436717422,0 -83.16469350454304,8.757840058502509,0 -83.16253330455245,8.75783938881704,0 -83.15948594891935,8.757061328608048,0 -83.16013223964811,8.758096027577356,0 -83.16047929519782,8.759578318722573,0 -83.15972755579283,8.761050675381727,0 -83.16110263428916,8.761690197889042,0 -83.16264954775356,8.763373418897638,0 -83.16186082199486,8.76524763249199,0 -83.16206130827175,8.766853346338243,0 -83.16426667916706,8.766677336385383,0 -83.16543945557922,8.765713987133163,0 -83.1662187639904,8.766241061996976,0 -83.16798046971849,8.765610519225834,0 -83.16817712910662,8.766581672806808,0 -83.167331400202,8.767854785708085,0 -83.16851159347154,8.76951424968003,0 -83.16981723636174,8.769580839139859,0 -83.17171851094827,8.766990001717071,0 -83.17053668613843,8.765630660510647,0 -83.1707338385997,8.764333698216914,0 -83.17066893951844,8.762852523413091,0 -83.17225156639817,8.762010681629695,0 -83.17179298295066,8.760713369294891,0 -83.17298467567923,8.759866634667295,0 -83.17212556188353,8.759082760677552,0 -83.17232599084309,8.757578955160504,0 -83.17172836290439,8.756664203774196,0 -83.1708667845985,8.755821656190934,0 -83.16919159338516,8.757222855124665
            ]),
            zIndex: 1,
            fill: true, 
            material: Color.WHITE.withAlpha(0.3),
            heightReference: HeightReference.CLAMP_TO_GROUND,
          }}
        />
        <Entity
          name="Finca Alexis_3 Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.1674616078658,8.767979094712897,0 -83.16621949781506,8.76914878569999,0 -83.16545070992943,8.769562327512144,0 -83.16500713395173,8.770853547808011,0 -83.16417482208803,8.771758680424211,0 -83.16321205364211,8.772523255612262,0 -83.16320841336781,8.773931055756311,0 -83.16224195532061,8.77501405930183,0 -83.16000009179051,8.776656915918959,0 -83.16218655715981,8.777617251973661,0 -83.16302561621643,8.778443059389682,0 -83.16489222604376,8.777499161675209,0 -83.1676088141019,8.775599842920995,0 -83.16988968922661,8.773173994159809,0 -83.1706818478725,8.770731043296491,0 -83.17062564494603,8.769245344094662,0 -83.16875371491221,8.770081087097001,0 -83.1674616078658,8.767979094712897
            ]),
            zIndex: 2,
            material: outlineBlue,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />
        <Entity
          name="Finca Alexis_3"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.1674616078658,8.767979094712897,0 -83.16621949781506,8.76914878569999,0 -83.16545070992943,8.769562327512144,0 -83.16500713395173,8.770853547808011,0 -83.16417482208803,8.771758680424211,0 -83.16321205364211,8.772523255612262,0 -83.16320841336781,8.773931055756311,0 -83.16224195532061,8.77501405930183,0 -83.16000009179051,8.776656915918959,0 -83.16218655715981,8.777617251973661,0 -83.16302561621643,8.778443059389682,0 -83.16489222604376,8.777499161675209,0 -83.1676088141019,8.775599842920995,0 -83.16988968922661,8.773173994159809,0 -83.1706818478725,8.770731043296491,0 -83.17062564494603,8.769245344094662,0 -83.16875371491221,8.770081087097001,0 -83.1674616078658,8.767979094712897
            ]),
            zIndex: 1,
            fill: true, 
            material: Color.WHITE.withAlpha(0.3),
            heightReference: HeightReference.CLAMP_TO_GROUND,
          }}
        />
        <Entity
          name="Finca Marvin Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.16302929238053,8.774583044206203,0 -83.16312204856702,8.772598177485579,0 -83.1647635761144,8.771228044732053,0 -83.16486224619906,8.769813407168209,0 -83.16756517117989,8.768205227510219,0 -83.16843729655554,8.766428822418639,0 -83.1678286691517,8.765733803708773,0 -83.16633405343298,8.766168305089479,0 -83.16547365816363,8.765743953750999,0 -83.1643829645341,8.766421424880303,0 -83.16244411962734,8.766929029981847,0 -83.16146415151913,8.766700088905512,0 -83.1598706114399,8.766825012337673,0 -83.15673401781397,8.771195702484009,0 -83.15688472151155,8.772078255002604,0 -83.15603041445556,8.773619860083503,0 -83.15415161077753,8.775188023440682,0 -83.15673577084841,8.776006753223848,0 -83.15849064025841,8.777816071601062,0 -83.15960229518492,8.776655388220055,0 -83.16302929238053,8.774583044206203
            ]),
            zIndex: 2,
            material: outlineBlue,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />
        <Entity
          name="Finca Marvin"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.16302929238053,8.774583044206203,0 -83.16312204856702,8.772598177485579,0 -83.1647635761144,8.771228044732053,0 -83.16486224619906,8.769813407168209,0 -83.16756517117989,8.768205227510219,0 -83.16843729655554,8.766428822418639,0 -83.1678286691517,8.765733803708773,0 -83.16633405343298,8.766168305089479,0 -83.16547365816363,8.765743953750999,0 -83.1643829645341,8.766421424880303,0 -83.16244411962734,8.766929029981847,0 -83.16146415151913,8.766700088905512,0 -83.1598706114399,8.766825012337673,0 -83.15673401781397,8.771195702484009,0 -83.15688472151155,8.772078255002604,0 -83.15603041445556,8.773619860083503,0 -83.15415161077753,8.775188023440682,0 -83.15673577084841,8.776006753223848,0 -83.15849064025841,8.777816071601062,0 -83.15960229518492,8.776655388220055,0 -83.16302929238053,8.774583044206203
            ]),
            zIndex: 1,
            fill: true, 
            material: Color.WHITE.withAlpha(0.3),
            heightReference: HeightReference.CLAMP_TO_GROUND,
          }}
        />
        <Entity
          name="Finca Zaida Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.14540809896266,8.75503419546447,0 -83.14520914320229,8.754804971839745,0 -83.14500645202165,8.754410885764687,0 -83.14494792206334,8.753000495857638,0 -83.14497768823551,8.752475745944821,0 -83.14486242456678,8.752197611964947,0 -83.14459712375377,8.751895063406277,0 -83.14309709086345,8.752543256188256,0 -83.14376841185083,8.753194397235658,0 -83.14404749236527,8.753783553724466,0 -83.1441281186197,8.754325292012446,0 -83.14431709960927,8.7548553862924,0 -83.14482321002383,8.75492125075902,0 -83.1450545631794,8.755048161872837,0 -83.14540809896266,8.75503419546447
            ]),
            zIndex: 2,
            material: outlineBlue,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />
        <Entity
          name="Finca Zaida"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.14540809896266,8.75503419546447,0 -83.14520914320229,8.754804971839745,0 -83.14500645202165,8.754410885764687,0 -83.14494792206334,8.753000495857638,0 -83.14497768823551,8.752475745944821,0 -83.14486242456678,8.752197611964947,0 -83.14459712375377,8.751895063406277,0 -83.14309709086345,8.752543256188256,0 -83.14376841185083,8.753194397235658,0 -83.14404749236527,8.753783553724466,0 -83.1441281186197,8.754325292012446,0 -83.14431709960927,8.7548553862924,0 -83.14482321002383,8.75492125075902,0 -83.1450545631794,8.755048161872837,0 -83.14540809896266,8.75503419546447
            ]),
            zIndex: 1,
            fill: true, 
            material: Color.WHITE.withAlpha(0.3),
            heightReference: HeightReference.CLAMP_TO_GROUND,
          }}
        />
        <Entity
          name="Finca 3 Outline"
          corridor={{
            positions: Cartesian3.fromDegreesArray([
              -83.18494998722052,8.703347648866643,0 -83.18365045477728,8.701069745226,0 -83.18421140144116,8.69856586879011,0 -83.18435548583341,8.696668391225012,0 -83.18310962749524,8.694846228500799,0 -83.1851268016905,8.690945864804927,0 -83.18685784233413,8.688678508574897,0 -83.18698357123192,8.685803480512849,0 -83.18534564507952,8.685669564896552,0 -83.18281954105261,8.685249901534567,0 -83.18181098144359,8.688740657378702,0 -83.18108246382229,8.692201150646143,0 -83.17995280549873,8.695236251476159,0 -83.18150957078657,8.696221758949525,0 -83.18215027212425,8.697446305706281,0 -83.18177903557982,8.701246344447087,0 -83.18155998533733,8.702859687245397,0 -83.18355181387975,8.705642565778167,0 -83.18503448528013,8.707936212430242,0 -83.18630137505457,8.706690343922689,0 -83.18494998722052,8.703347648866643
            ]),
            zIndex: 2,
            material: outlineBlue,
            width: 25,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />

        <Entity
          name="Finca 3"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.18494998722052,8.703347648866643,0 -83.18365045477728,8.701069745226,0 -83.18421140144116,8.69856586879011,0 -83.18435548583341,8.696668391225012,0 -83.18310962749524,8.694846228500799,0 -83.1851268016905,8.690945864804927,0 -83.18685784233413,8.688678508574897,0 -83.18698357123192,8.685803480512849,0 -83.18534564507952,8.685669564896552,0 -83.18281954105261,8.685249901534567,0 -83.18181098144359,8.688740657378702,0 -83.18108246382229,8.692201150646143,0 -83.17995280549873,8.695236251476159,0 -83.18150957078657,8.696221758949525,0 -83.18215027212425,8.697446305706281,0 -83.18177903557982,8.701246344447087,0 -83.18155998533733,8.702859687245397,0 -83.18355181387975,8.705642565778167,0 -83.18503448528013,8.707936212430242,0 -83.18630137505457,8.706690343922689,0 -83.18494998722052,8.703347648866643
            ]),
            zIndex: 1,
            fill: true, 
            material: Color.WHITE.withAlpha(0.3),
            heightReference: HeightReference.CLAMP_TO_GROUND,
          }}
        />

      </Viewer>
      <AnimatePresence>
      {box && (
          <WiderModal  exploreClick={handleExploreClick} personSelection={() => setCarousel(3)} cameraSelection={() => setCarousel(1)} droneSelection={() => setCarousel(2)}/>
      )}
      </AnimatePresence>
      <AnimatePresence>
        {infoModal && 
          <InfoModal/>
        }
      </AnimatePresence>
      <AnimatePresence>
        {cubeInfo && (
          <>
          <motion.div 
            initial={{ x: -50,opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.5}  }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ ease: 'easeInOut', stiffness: 50}}
          >
          {/* <CubeInfo closeClick={closeInfoCubes} /> */}
          <MultiModal closeClick={closeInfoCubes}/>
          </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cubeInfo && (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.5 } }}
        exit={{ opacity: 0, transition: { delay: 0.2 } }}
        transition={{ type: "spring", stiffness: 100, duration: 2}}
        >
          <UnityBuild/>
        </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {carousel === 1 && (
          <div className="fixed top-0 left-0 z-40 bg-black/30 backdrop-blur h-full w-full flex items-center justify-center px-[25%]">
            <div className="fixed top-10 right-10 text-white text-3xl opacity-60 hover:opacity-100" onClick={() => setCarousel(0)}><IoMdClose /></div>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
                <Carousel slides={[{type: 'video', src: '/img/ocelot_2.mp4', thumbnail: '/img/leopard.jpg'}, {type: 'image', src: '/img/1.jpg', thumbnail: '/img/1.jpg' },{type: 'image', src:'/img/2.jpg', thumbnail: '/img/2.jpg'}, {type: 'image', src:'/img/3.jpg', thumbnail: '/img/3.jpg'}, {type: 'image', src:'/img/4.jpg', thumbnail: '/img/4.jpg'}]} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {carousel === 2 && (
          <div className="fixed top-0 left-0 z-40 bg-black/30 backdrop-blur h-full w-full flex items-center justify-center px-[25%]">
            <div className="fixed top-10 right-10 text-white text-3xl opacity-60 hover:opacity-100" onClick={() => setCarousel(0)}><IoMdClose /></div>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
                <Carousel slides={[{type: 'video', src: '/img/flyOver_720.mp4', thumbnail: '/img/video.jpg'}, {type: 'image', src: '/img/2-1.jpg', thumbnail: '/img/2-1.jpg' },{type: 'image', src:'/img/2-2.jpg', thumbnail: '/img/2-2.jpg'}, {type: 'image', src:'/img/2-3.jpg', thumbnail: '/img/2-3.jpg'}, {type: 'image', src:'/img/2-4.jpg', thumbnail: '/img/2-4.jpg'}]} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {carousel === 3 && (
          <div className="fixed top-0 left-0 z-40 bg-black/30 backdrop-blur h-full w-full flex items-center justify-center px-[25%]">
            <div className="fixed top-10 right-10 text-white text-3xl opacity-60 hover:opacity-100" onClick={() => setCarousel(0)}><IoMdClose /></div>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
                <Carousel slides={[{type: 'video', src: '/img/blendVideo_720_1.mp4', thumbnail: '/img/lidar.jpg'}, {type: 'image', src: '/img/3-1.jpg', thumbnail: '/img/3-1.jpg' },{type: 'image', src:'/img/3-2.jpg', thumbnail: '/img/3-2.jpg'}, {type: 'image', src:'/img/3-3.jpg', thumbnail: '/img/3-3.jpg'}, {type: 'image', src:'/img/3-4.jpg', thumbnail: '/img/3-4.jpg'}]} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
