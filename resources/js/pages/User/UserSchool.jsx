import {useParams} from "react-router-dom";
import useSchoolsStore from "../../store/useSchoolsStore";
import {useEffect} from "react";
import {Loader} from "../../components/UI/Loader";
import {Subtitle} from "../../components/UI/Subtitle";

export const UserSchool = () => {
    const {schoolId} = useParams()
    const {loading, school, getOneSchool} = useSchoolsStore()

    useEffect(() => {
        getOneSchool(schoolId)
    }, [])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <Subtitle>{school?.title}</Subtitle>
                </>
            )}
        </>
    )
}
