import { useEffect } from "react";
import { CardContainer } from "../../components/CardContainer";
import { SchoolCard } from "../../components/SchoolCard";
import { Loader } from "../../components/UI/Loader";
import useSchoolsStore from "../../store/useSchoolsStore";

export const TeacherSchools = () => {
    const { loading, allSchools, schools, getSchools } = useSchoolsStore();

    useEffect(() => {
        getSchools();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <CardContainer title={"Мои школы"}>
                        {schools &&
                            schools.map((school) => (
                                <SchoolCard
                                    key={school?.id}
                                    title={school?.title}
                                    types={school?.school_types}
                                    description={school?.description}
                                    images={school?.images}
                                    path={`/teacher/schools/${school?.id}`}
                                />
                            ))}
                    </CardContainer>
                    <CardContainer title={"Школы"}>
                        {allSchools &&
                            allSchools.map((school) => (
                                <SchoolCard
                                    key={school?.id}
                                    title={school?.title}
                                    types={school?.school_types}
                                    description={school?.description}
                                    images={school?.images}
                                    path={`/teacher/schools/${school?.id}`}
                                />
                            ))}
                    </CardContainer>
                </>
            )}
        </>
    );
};
