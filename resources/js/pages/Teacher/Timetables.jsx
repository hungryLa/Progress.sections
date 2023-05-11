import useAuthStore from "../../store/useAuthStore";
import api from "../../middlewares/auth.middleware";
import {Subtitle} from "../../components/UI/Subtitle";
import {useEffect} from "react";

export const Timetables = () => {
    const user = useAuthStore(({user}) => user)

    useEffect(() => {
        document.title = 'Мои расписания'
    }, [])

    const handleClick = async () => {
        const response = await api.get(`/api/cabinet/teachers/${user?.id}/timetables`)
        console.log(response)
    }


    return (
        <div>
            <Subtitle>Мои расписания</Subtitle>
            <button onClick={() => handleClick()}>get data</button>
        </div>
    )
}
