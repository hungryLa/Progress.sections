import {Subtitle} from "../../components/UI/Subtitle";
import useTeachersStore from "../../store/useTeachersStore";

export const NewTeacher = () => {
    const {loading, error, createTeacher} = useTeachersStore()
    return (
        <>
            <Subtitle>Создание преподавателя</Subtitle>

        </>
    )
}
