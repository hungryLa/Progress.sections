import { Link, useParams } from "react-router-dom";
import { Subtitle } from "../../components/UI/Subtitle";
import useSectionsStore from "../../store/useSectionsStore";
import { Loader } from "../../components/UI/Loader";
import { CardContainer } from "../../components/CardContainer";
import { useEffect, useState } from "react";
import useOccupationsStore from "../../store/useOccupationsStore";

export const Sections = () => {
    const { schoolId, sectionId } = useParams();
    const { loading, error, sections, getSections } = useSectionsStore();

    useEffect(() => {

        getSections(schoolId);
    }, []);

    return (
        <>
            <Subtitle>Секции</Subtitle>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <CardContainer>
                        {sections.map((item) => (
                            <Link to={`/schools_owner/schools/${schoolId}/sections/${item.id}`} key={item.id}>
                                <span>{item.description}</span>
                                <span>{item.contents}</span>
                            </Link>
                        ))}
                    </CardContainer>
                </>
            )}
        </>
    );
};
