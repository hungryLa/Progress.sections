import {useParams} from "react-router-dom";
import useSectionsStore from "../../store/useSectionsStore";
import {useEffect, useState} from "react";
import {Loader} from "../../components/UI/Loader";
import {SectionInfo} from "../../components/SectionInfo";
import useContentStore from "../../store/useContentStore";

export const Section = () => {
    const {schoolId, sectionId} = useParams();
    const {loading, getOneSection, section} = useSectionsStore()
    const {setTitle, setImage} = useContentStore()

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
