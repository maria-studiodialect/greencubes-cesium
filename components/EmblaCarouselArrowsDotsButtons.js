
export const DotButton = (props) => {
    const { children, ...restProps } = props

    return (
        <button type="button" {...restProps}>
            {children}
        </button>
    )
}

export const PrevButton = (props) => {
const { children, ...restProps } = props

return (
    <button
    className="embla__button embla__button--prev"
    type="button"
    {...restProps}
    >
    <svg width="56" height="66" viewBox="0 0 56 66" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M54.5 63.3109L2 33L54.5 2.68912L54.5 63.3109Z" stroke="#87E78B" stroke-width="2"/>
    </svg>
    {children}
    </button>
)
}

export const NextButton = (props) => {
const { children, ...restProps } = props

return (
    <button
    className="embla__button embla__button--next"
    type="button"
    {...restProps}
    >
    <svg width="56" height="66" viewBox="0 0 56 66" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 2.68911L54 33L1.5 63.3109L1.5 2.68911Z" stroke="#87E78B" stroke-width="2"/>
    </svg>
    {children}
    </button>
)
}
