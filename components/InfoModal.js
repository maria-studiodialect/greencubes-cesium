import Image from "next/image"

export default function InfoModal({country, flag, coordinates, cubeNr, location, img}) {
    return (
        <div className="absolute top-[18vh] left-10 bg-cover z-30">
            <div><Image src='/img/bg-img.jpg' width={374} height={281} className="rounded"/></div>
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center mb-3">
                <Image src={'/img/finca-amable.png'} width={135} height={135} className="mb-3 drop-shadow-xl"/> 
                <div className="text-xs font-light">🇨🇷 Costa Rica</div>
                <div className="text-2xl font-bold">La Gamba</div>
                <div className="font-light">8°42'22"N, 83°10'54"W</div>
                <div className="text-sm mt-5 flex items-center"><Image src={'/img/greencube-minilogo.svg'} width={18} height={21} className="mr-2"/> 3,200,000</div>
            </div>
        </div>
    )
}