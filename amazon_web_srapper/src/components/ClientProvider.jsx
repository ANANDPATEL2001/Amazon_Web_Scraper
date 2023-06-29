'use client';

import { Toaster } from 'react-hot-toast'

export default function ClientProvider({ children, }) {
    return (
        <>
            <Toaster />

            {children}
        </>
    )
}
