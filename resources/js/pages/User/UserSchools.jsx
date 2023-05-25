import {Subtitle} from "../../components/UI/Subtitle";
import useSchoolsStore from "../../store/useSchoolsStore";
import {Loader} from "../../components/UI/Loader";
import {useEffect} from "react";
import {CardContainer} from "../../components/CardContainer";
import {SchoolCard} from "../../components/SchoolCard";

export const UserSchools = () => {
    const {loading, schools, getSchools} = useSchoolsStore()

    useEffect(() => {
        getSchools()
    }, [])

    return (
        <>
            <Subtitle>Школы</Subtitle>
            {loading ? <Loader /> : (
                <>
                    {schools ? (
                        <CardContainer>
                            {schools.map(school => (
                                <SchoolCard
                                    id={school.id}
                                    title={school.title}
                                    description={school.description}
                                    images={school.images}
                                    types={school.school_types}
                                    path={`/user/schools/${school.id}`}
                                />
                            ))}
                        </CardContainer>
                    ) : 'Школ нет'}
                </>
            )}
        </>
    )
}
