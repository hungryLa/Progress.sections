import {Subtitle} from "../../components/UI/Subtitle";
import useTeachersStore from "../../store/useTeachersStore";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Loader} from "../../components/UI/Loader";
import {toast, ToastContainer} from "react-toastify";
import {TeacherProfile} from "../../components/TeacherProfile";

export const Teacher = () => {
    const {schoolId, teacherId} = useParams()
    const {loading, error, teacher, getTeacher} = useTeachersStore()

    useEffect(() => {
        getTeacher(schoolId, teacherId)
        console.log(teacher)
    }, [])

    return (
        <>
            {loading ? <Loader/> : (
                <TeacherProfile
                    fullName={teacher.full_name}
                    images={teacher?.images ? teacher.images : null}
                    email={teacher?.email}
                    phone={teacher?.phone_number}
                    occupations={teacher?.information?.occupations?.which_occupations}
                    about={teacher?.information?.about_me}
                    experience={teacher?.information?.teaching_experience}
                />
            )}
            <ToastContainer/>
        </>
    )
}
