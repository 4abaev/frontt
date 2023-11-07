'use client'

import { store } from '@/state/store'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'

export function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <CacheProvider>
            <ChakraProvider>
                <Provider store={store}>
                    {children}
                </Provider>
            </ChakraProvider>
        </CacheProvider>
    )
}