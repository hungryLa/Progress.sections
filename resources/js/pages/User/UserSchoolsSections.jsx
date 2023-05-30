import {useParams} from "react-router-dom";
import useSectionsStore from "../../store/useSectionsStore";
import {useEffect} from "react";
import {Subtitle} from "../../components/UI/Subtitle";
import {Loader} from "../../components/UI/Loader";
import {CardContainer} from "../../components/CardContainer";
import {SectionCard} from "../../components/SectionCard";

export const UserSchoolsSections = () => {
    const {schoolId} = useParams()
    const {loading, error, sections, getSections} = useSectionsStore()

    useEffect(() => {
        getSections(schoolId)
    }, [])

    return (
        <>
            <Subtitle>Секции</Subtitle>
            {loading ? <Loader /> : (
                <>
                    <CardContainer>
                        {sections ? sections.map(section => (
                            <SectionCard
                                key={section.id}
                                schoolId={schoolId}
                                section={section}
                                path={`/user/schools/${schoolId}/sections/${section?.id}`}
                            />
                        )) : 'Нет секций'}
                    </CardContainer>
                </>
            )}
        </>
    )
}
