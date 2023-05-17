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
        console.log(section)
        if (section && section?.images.length > 0) {
            setTitle(section?.occupation?.title)
            setImage(section?.images.map(image => `/storage/${image.path}`))
        }
    }, [])

    return (
        <>
            {loading ? (<Loader/>) : (
                <>
                    <SectionInfo
                        description={section.description}
                        contents={section.contents}
                        occupationTitle={section?.occupation?.title}
                    />
                </>
            )}
        </>
    )
}
