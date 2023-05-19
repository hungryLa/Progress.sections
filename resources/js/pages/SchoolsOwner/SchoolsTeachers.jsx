import {Subtitle} from "../../components/UI/Subtitle";
import {useNavigate, useParams} from "react-router-dom";
import useTeachersStore from "../../store/useTeachersStore";
import {useEffect} from "react";
import {Loader} from "../../components/UI/Loader";
import {CardContainer} from "../../components/CardContainer";
import {all} from "axios";
import {TeacherCard} from "../../components/TeacherCard";

export const SchoolsTeachers = () => {
    const {schoolId} = useParams()
    const {
        schoolTeachers,
        invitedTeachers,
        allTeachers,
        loading,
        error,
        getSchoolTeachers
    } = useTeachersStore()
    const navigate = useNavigate()

    useEffect(() => {
        getSchoolTeachers(schoolId)
        console.log('schoolTeachers', schoolTeachers)
        console.log('invitedTeachers', invitedTeachers)
        console.log('allTeachers', allTeachers)
    }, [])

    const handleRedirectToCreateTeacher = () => {
        navigate(`/schools_owner/schools/${schoolId}/teachers/new`)
    }

    return (
        <>
            {loading ? <Loader/> : (
                <>
                    <CardContainer
                        title={'Преподаватели школы'} buttonTitle={'Создать преподавателя'}
                        buttonFunction={handleRedirectToCreateTeacher}>
                        {schoolTeachers.length > 0 ? (
                            schoolTeachers.map(teacher => (
                                <TeacherCard schoolId={schoolId} type={'schools'} teacher={teacher} />
                            ))
                        ) : (
                            <span className={'empty__message'}>Похоже у вас нет преподавателей</span>
                        )}
                    </CardContainer>

                    <CardContainer
                        title={'Приглашенные преподаватели'} buttonTitle={'Приглашения'}
                        buttonFunction={() => {
                        }}>
                        {invitedTeachers.length > 0 ? (
                            invitedTeachers.map(teacher => (
                                <TeacherCard schoolId={schoolId} type={'invited'} teacher={teacher} />
                            ))
                        ) : (
                            <span className={'empty__message'}>Похоже вы не приглашали преподавателей</span>
                        )}
                    </CardContainer>

                    <CardContainer title={'Все преподаватели'}>
                        {allTeachers.length > 0 ? (
                            allTeachers.map(teacher => (
                                <TeacherCard schoolId={schoolId} type={'all'} teacher={teacher} />
                            ))
                        ) : (
                            <span className={'empty__message'}>Похоже вы не приглашали преподавателей</span>
                        )}
                    </CardContainer>
                </>
            )}
        </>
    )
}
