import "../styles/globals.css"
import {Roboto} from '@next/font/google'

const roboto = Roboto({
  subsets:  ['latin'], 
  weight: ['100','300','400','500','900','700']
})

function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
    <Component {...pageProps} />
    </main>
  )
}

export default MyApp
