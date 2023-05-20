import '../styles/Theme.css'
import '../styles/App.css'
import '../styles/App.mobile.css'
import '../styles/PriceSlider.css'
import 'react-toastify/dist/ReactToastify.css'

import '@rainbow-me/rainbowkit/styles.css';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { AppProvider } from '../context/context'

const { chains, provider } = configureChains(
  [chain.sepolia ,chain.goerli, chain.localhost],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY, priority: 1 }),
   jsonRpcProvider({
    priority: 2,
    rpc: chain => ({
      http: 'HTTP://127.0.0.1:7545',
    }),
   }),
],
)

const { connectors } = getDefaultWallets({
  appName: 'EtherCommerce',
  chains,
})

const wagmiConfig = createClient({ autoConnect: true, connectors, provider });

const MyApp = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiConfig}>
      <AppProvider>
        <RainbowKitProvider theme={darkTheme()} coolMode chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </AppProvider>
    </WagmiConfig>
  )
}

export default MyApp
