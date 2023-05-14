import {Subtitle} from "../../components/UI/Subtitle";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../middlewares/auth.middleware";
import useSchoolsStore from "../../store/useSchoolsStore";
import {SchoolInfo} from "../../components/SchoolInfo";

export const School = () => {
    const {schoolId} = useParams()
    const schools = useSchoolsStore(({schools}) => schools)
    const [school, setSchool] = useState({})
    const findSchoolById = () => {
        setSchool(schools.find(item => item.id === Number(schoolId)))
        console.log(school)
    }

    useEffect(() => {
        findSchoolById()
    }, [])

    return (
        <>
            <SchoolInfo school={school} />
        </>
    )
}
