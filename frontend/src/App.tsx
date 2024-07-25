import './styles/App.sass'
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Content from "./components/Content"

import { Toaster } from "./components/ui/toaster"
import { TooltipProvider } from "./components/ui/tooltip"
import { OptionsProvider } from './components/context-providers/options'
import { ThemeProvider } from "./components/context-providers/sidebar-theme"
import { AdditionalOptionsProvider } from "./components/context-providers/sidebar-additional-options"
import { UIOptionsProvider } from './components/context-providers/ui-configs'


export default function App() {
  return (
    <>
      <div className="main-overlay">
        <img src="/icon.svg" className='loader' width={20} />
      </div>

      <div className="flex w-full h-full gap-6 lg:gap-12 overflow-hidden">
        <TooltipProvider delayDuration={0}>
          <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <UIOptionsProvider>
              <AdditionalOptionsProvider>
                <OptionsProvider>
                  <Sidebar />
                  <section id='content'>
                    <div className="flex flex-col gap-[10px] justify-between">
                      <Header />
                      <Content />
                    </div>
                  </section>
                  <section className="popups fixed">
                    <Toaster />
                  </section>
                </OptionsProvider>
              </AdditionalOptionsProvider>
            </UIOptionsProvider>
          </ThemeProvider>
        </TooltipProvider>
      </div>
    </>
  )
}
