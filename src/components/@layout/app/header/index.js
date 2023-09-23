import { ConnectKitButton } from 'connectkit'
import CurrentNetwork from '../navigation/currentNetwork'

export default function Header() {
    return (
        <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-1">
          <CurrentNetwork />
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <ConnectKitButton />
        </div>
      </div>
    )
}