import TopBar from './TopBar.jsx'
import Footer from './Footer.jsx'
import BottomNav from './BottomNav.jsx'
import Chatbot from './Chatbot.jsx'

export default function AppLayout({
  children,
  showTopBar = true,
  showFooter = false,
  showNav = true,
  showBottomNav = true,
}) {
  const isNavVisible = showNav && showBottomNav

  return (
    <div className="min-h-screen bg-fit-bg text-fit-text overflow-x-hidden flex flex-col">
      {showTopBar && <TopBar />}
      <div className={`flex-1 w-full ${isNavVisible ? 'pb-20 md:pb-0' : ''}`}>
        {children}
      </div>
      {showFooter && <Footer />}
      {isNavVisible && <BottomNav />}
      <Chatbot />
    </div>
  )
}