import Navigation from './navigation'
import Header from './header'
import Footer from './footer'

export default function LayoutLanding({ children }) {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Navigation />
          <Header />
        </div>
        {children}
      </div>
      <Footer />
    </>
  )
}

