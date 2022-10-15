import { ChakraProvider } from '@chakra-ui/react'
import {
  connectorsForWallets, getDefaultWallets, RainbowKitProvider
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets'
import { theme } from '../components/theme/index'
import type { AppProps } from 'next/app'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import '../styles/global.css'
import TopNav from '../components/NavBar'

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygonMumbai,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.polygonMumbai]
      : []),
  ],
  [
    alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }),
    publicProvider(),
  ]
)

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit Mint NFT Demo',
  chains,
})

const demoAppInfo = {
  appName: 'RainbowKit Mint NFT Demo',
}

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [argentWallet({ chains }), trustWallet({ chains })],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <TopNav />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp
