import {useParams} from "react-router-dom";
import useSectionsStore from "../../store/useSectionsStore";
import {useEffect} from "react";
import {Loader} from "../../components/UI/Loader";
import {SectionInfo} from "../../components/SectionInfo";

export const Section = () => {
    const {schoolId, sectionId} = useParams();
    const {loading, getOneSection, section} = useSectionsStore()

    useEffect(() => {
        getOneSection(schoolId, sectionId)
    }, [])

    return (
        <>
            {loading ? (<Loader/>) : (
                <>
                    <SectionInfo
                        description={section?.description}
                        contents={section?.contents}
                        occupationTitle={section?.occupation?.title}
                        images={section?.images}
                    />
                </>
            )}
        </>
    )
}
