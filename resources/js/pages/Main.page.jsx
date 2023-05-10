import { HowItWorks } from "../components/HowItWorks";
import {Login} from "../components/Login";
import {useEffect} from "react";

export const MainPage = () => {
    useEffect(() => {
        document.title = 'PROGRESS | Войти'
    }, [])

    return (
            <div className="main">
                <Login />
                <HowItWorks />
            </div>
    )
}
