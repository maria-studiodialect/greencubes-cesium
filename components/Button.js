export default function Button({text, customStyle, onClick}) {
    return (
        <div onClick={onClick} className={`inline-block rounded-full px-10 py-1 shadow-md shadow-lime-500 cursor-pointer ${customStyle ? customStyle : 'bg-greenLemon hover:bg-lime-200'}`}>{text}</div>
    )
}