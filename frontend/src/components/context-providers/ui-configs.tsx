import { createContext, useContext, useState } from "react"

export interface Log {
    timestamp: string;
    shortMessage: string;
    longMessage: string;
    logType: string;
}

export interface UIOptions {
    userPaused?: boolean
    serverPaused?: boolean
    serverOnline?: boolean
    lastUpdated?: string
    logs?: Log[]
    lastSeenMsg?: Log['longMessage']
    notificationsSeen?: boolean
    notifications?: (Omit<Log, 'longMessage'> & { seen?: boolean })[]
}

export interface UIOptionsContextType {
    uiOptions: UIOptions
    setUIOptions: React.Dispatch<React.SetStateAction<UIOptions>>
    // setUIOptions: (option: UIOptions) => void
}

export const UIOptionsContext = createContext<UIOptionsContextType | undefined>(undefined)

export function UIOptionsProvider({ children }: { children: React.ReactNode }) {
    const [opt, setUIOptions] = useState<UIOptions>({
        userPaused: false,
        serverPaused: false,
        serverOnline: false,
        logs: []
    })

    return (
        <UIOptionsContext.Provider value={{ uiOptions: opt, setUIOptions }}>
            {children}
        </UIOptionsContext.Provider>
    )
}

export function useUIOptions() {
    const context = useContext(UIOptionsContext)

    if (context === undefined)
        throw new Error('useUIOptions must be used within a UIOptionsProvider')

    return context
}