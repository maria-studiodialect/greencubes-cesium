import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Thumb from './EmblaCarouselThumbsButton'
import {
    PrevButton,
    NextButton
} from './EmblaCarouselArrowsDotsButtons'
import { IoCloseCircle } from "react-icons/io5";


export default function Carousel(props) {
    const { slides, options } = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const scrollPrev = useCallback(
        () => emblaMainApi && emblaMainApi.scrollPrev(),
        [emblaMainApi]
    )
    const scrollNext = useCallback(
    () => emblaMainApi && emblaMainApi.scrollNext(),
    [emblaMainApi]
    )

    const onButtonSelect = useCallback((emblaApi) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    const onThumbClick = useCallback(
        (index) => {
        if (!emblaMainApi || !emblaThumbsApi) return
        emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onButtonSelect(emblaMainApi)
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
        emblaMainApi.on('select', onButtonSelect)
        emblaMainApi.on('reInit', onButtonSelect)
    }, [emblaMainApi, onSelect])

    return (
        <>
        <div className="embla">
        <div className="embla__viewport" ref={emblaMainRef}>
            <div className="embla__container">
            {slides.map((slide,index) => (
                <div className="embla__slide" key={index}>
                    <div className="embla__slide__number">
                    <span>{index + 1}</span>
                    </div>
                    {slide.type === 'image' ? (
                    <img
                        className="embla__slide__img aspect-video object-contain"
                        src={slide.src}
                        alt="Your alt text"

                    
                    />
                    ) : (
                    <video controls autoPlay muted className="embla__slide__video h-[50vh] object-contain">
                        <source src={slide.src} type="video/mp4"  />
                        <source src={slide.webm} type="video/webm"  />
                        Your browser does not support the video tag.
                    </video>
                    )}
                </div>
            ))}
            </div>
        </div>

        <div className="embla-thumbs flex justify-between items-center w-full">
            <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
            <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container">
                {slides.map((image, index) => (
                <Thumb
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    index={index}
                    imgSrc={image.thumbnail}
                    key={index}
                />
                ))}
            </div>
            </div>
            <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
        </div>

        </>
    )
}