import LitePortalHeader from "../components/LitePortalHeader";
import Menu from "../components/Menu";
import {Providers} from './Providers'
import SessionGuard from '../components/SessionGuard'

export default async function RootLayout({children,}: { children: React.ReactNode },) {

    return (
        <>
            <Providers>
                <SessionGuard>
                    <LitePortalHeader>
                        <Menu/>
                    </LitePortalHeader>
                    <html lang="en">
                    <body>
                    {children}
                    </body>
                    </html>
                </SessionGuard>
            </Providers>
        </>
    );
}
