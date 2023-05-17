import {Subtitle} from "../../components/UI/Subtitle";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../middlewares/auth.middleware";
import useSchoolsStore from "../../store/useSchoolsStore";
import {SchoolInfo} from "../../components/SchoolInfo";
import {Loader} from "../../components/UI/Loader";

export const School = () => {
    const {schoolId} = useParams()
    const schools = useSchoolsStore(({schools}) => schools)
    const {loading, error, school, getOneSchool} = useSchoolsStore()
    // const [school, setSchool] = useState({})
    const findSchoolById = () => {
        getOneSchool(schoolId)
        console.log(school)
    }

    useEffect(() => {
        findSchoolById()
    }, [])

    return (
        <>
            {loading ? (<Loader/>) : (
                <SchoolInfo school={school}/>
            )}
        </>
    )
}
