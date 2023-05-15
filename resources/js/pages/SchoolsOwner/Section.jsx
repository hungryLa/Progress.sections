import {useParams} from "react-router-dom";
import useSectionsStore from "../../store/useSectionsStore";
import {useEffect, useState} from "react";
import {Loader} from "../../components/UI/Loader";
import {SectionInfo} from "../../components/SectionInfo";

export const Section = () => {
    const { schoolId, sectionId } = useParams();
    const {sections, loading, getSections } = useSectionsStore()
    const [section, setSection] = useState(null)

    useEffect(() => {
        getSections(schoolId, sectionId)
        setSection(sections.find(section => section.id === Number(sectionId)))
    }, [])

    return (
        <>
            {loading || section === null ? (<Loader />) : (
                <SectionInfo description={section.description} contents={section.contents} occupationTitle={section.occupation.title} />
            )}
        </>
    )
}
