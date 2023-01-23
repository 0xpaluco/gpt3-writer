import 'server-only'
import { DashboardNav } from '../../src/components';

interface LayoutProps {
    children: React.ReactNode;
}


export const revalidate = 0

export default async function DashboardLayout({ children }: LayoutProps) {

    return (
        <html lang="en" className='bg-gray-200 h-full'>
            <head>
                {/* Used to be added by default, now we need to add manually */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width" />
            </head>
            <body className='bg-gray-200 h-full'>
                <DashboardNav>
                    {children}
                </DashboardNav>
            </body>
        </html>
    )
}
