import {Subtitle} from "../../components/UI/Subtitle";
import useTeachersStore from "../../store/useTeachersStore";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Loader} from "../../components/UI/Loader";
import {toast, ToastContainer} from "react-toastify";

export const Teacher = () => {
    const {schoolId, teacherId} = useParams()
    const {loading, error, teacher, getTeacher} = useTeachersStore()

    useEffect(() => {
        getTeacher(schoolId, teacherId)
        console.log(teacher)
        toast("Успешно")
    }, [])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <Subtitle>{teacher?.full_name}</Subtitle>
                    <div className="two-col">
                        <span>Электронная почта: <a href={`mailto:${teacher?.email}`}>{teacher?.email}</a></span>
                        {teacher?.phone ? <span>Телефон: <a href={`tel:${teacher?.phone}`}>{teacher?.phone}</a></span> : ''}
                    </div>
                </>
            )}
            <ToastContainer />
        </>
    )
}
