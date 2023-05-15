import { Link, useParams } from "react-router-dom";
import { Subtitle } from "../../components/UI/Subtitle";
import useSectionsStore from "../../store/useSectionsStore";
import { Loader } from "../../components/UI/Loader";
import { CardContainer } from "../../components/CardContainer";
import { useEffect } from "react";
import {SectionCard} from "../../components/SectionCard";

export const Sections = () => {
    const { schoolId, sectionId } = useParams();
    const { loading, error, sections, getSections } = useSectionsStore();

    useEffect(() => {
        getSections(schoolId);
        console.log('here', sections)
    }, []);

    return (
        <>
            <Subtitle>Секции</Subtitle>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <CardContainer>
                        {sections.map((section) => (
                            <SectionCard key={section.id} schoolId={schoolId} section={section} />
                        ))}
                    </CardContainer>
                </>
            )}
        </>
    );
};
