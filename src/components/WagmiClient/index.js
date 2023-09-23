import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { avalanche, avalancheFuji, bsc, bscTestnet, goerli, hardhat, localhost, mainnet, optimism, optimismGoerli, polygon, polygonMumbai } from '@wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ConnectKitProvider, getDefaultClient } from "connectkit"

function configureProviders() {
  const alchemyKey = localStorage.getItem('alchemyKey')
  const infuraKey = localStorage.getItem('infuraKey')
  const providers = []

  alchemyKey && providers.push(alchemyProvider({ apiKey: alchemyKey, priority: 0 }))
  infuraKey && providers.push(infuraProvider({ apiKey: infuraKey, priority: 0 }))
  providers.push(publicProvider({ priority: !alchemyKey && !infuraKey ? 0 : 1 }))
  
  return providers
}

const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, polygonMumbai, bsc, bscTestnet, avalanche, avalancheFuji, optimism, optimismGoerli, hardhat, localhost],
  configureProviders()
)

const client = createClient(
  getDefaultClient({
    appName: 'Contract Captain',
    autoConnect: true,
    provider: provider,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'Contract Captain',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          projectId: `${process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID}`,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true
        },
      })
    ]
  }),
);

const WagmiClient = ({ children }) => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default WagmiClient