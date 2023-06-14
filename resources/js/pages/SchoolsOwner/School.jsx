import {Subtitle} from "../../components/UI/Subtitle";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../middlewares/auth.middleware";
import useSchoolsStore from "../../store/useSchoolsStore";
import {SchoolInfo} from "../../components/SchoolInfo";
import {Loader} from "../../components/UI/Loader";
import useContentStore from "../../store/useContentStore";

export const School = () => {
    const {schoolId} = useParams()
    const {loading, error, school, getOneSchool} = useSchoolsStore()

    useEffect(() => {
        getOneSchool(schoolId)
    }, [])

    return (
        <>
            {loading ? (<Loader/>) : (
                <SchoolInfo school={school}/>
            )}
        </>
    )
}
