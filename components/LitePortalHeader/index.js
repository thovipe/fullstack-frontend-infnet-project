import Image from "next/image";
import styles from "./liteportalheader.module.css";
import {getServerSession} from "next-auth";
import Login from "../../components/Login/login";
import Logout from "../../components/Logout/logout";
export default async function LitePortalHeader({ children }) {

    const session = await getServerSession();

    if(!session) {
        return (
            <div className={styles.bgHeader}>
                <header>
                    <Image src={"/liteportal-header-logo.png"} alt={"logo"} width={128} height={100} className={styles.logo}/>

                    <h1 className={styles.title}>Lite IDP Portal</h1>
                    <div>{children}</div>
                </header>

            </div>
        )
    }

    return (
        <div className={styles.bgHeader}>
        <header>
            <Image src={"/liteportal-header-logo.png"} alt={"logo"} width={128} height={100} className={styles.logo}/>
            <div >
                <Logout>SignOut</Logout>
            </div>
            <h1 className={styles.title}>Lite IDP Portal</h1>
            <div>{children}</div>
        </header>

        </div>
    );
}