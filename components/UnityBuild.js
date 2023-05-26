import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Loader from "./Loader";

export default function UnityBuild() {
    const { unityProvider, isLoaded, loadingProgression, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate } = useUnityContext({
        loaderUrl: "/unity/Build/GreenCubes.loader.js",
        dataUrl: "/unity/Build/GreenCubes.data",
        frameworkUrl: "/unity/Build/GreenCubes.framework.js",
        codeUrl: "/unity/Build/GreenCubes.wasm",
    });

    useEffect(() => {
        return () => {
            detachAndUnloadImmediate().catch((reason) => {
                console.log(reason);
            });
        };
    }, [detachAndUnloadImmediate]);

    return ( 
    <>
        {!isLoaded && (
            <Loader text={'Generating cubes'} progress={false} />
        )}
        <Unity
        unityProvider={unityProvider}
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        }}
        />;
    </>
    )
}