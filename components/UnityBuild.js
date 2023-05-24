import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityBuild() {
    const { unityProvider, isLoaded, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate } = useUnityContext({
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

    return <Unity
    unityProvider={unityProvider}
    style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    }}
    />;
}