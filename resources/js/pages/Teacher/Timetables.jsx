import {Title} from "../../components/UI/Title";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

export const Timetables = () => {
    const user = useAuthStore(({user}) => user)


    const handleClick = async () => {
        const response = await axios.get(`/api/cabinet/teachers/${user?.id}/timetables`)
        console.log(response)
    }


    return (
        <div>
            <Title>Мои расписания</Title>
            <button onClick={() => handleClick()}>get data</button>
        </div>
    )
}
