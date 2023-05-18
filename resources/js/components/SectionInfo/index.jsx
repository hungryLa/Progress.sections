import useContentStore from "../../store/useContentStore";
import {useEffect} from "react";
import {Subtitle} from "../UI/Subtitle";

import './SectionInfo.scss'

export const SectionInfo = ({description, contents, occupationTitle, images}) => {
    const {setTitle, setImage} = useContentStore()

    useEffect(() => {
        if(occupationTitle) setTitle(occupationTitle)
        if (images && images?.length > 0) {
            setImage(images?.map(image => `/storage/${image.path}`))
        }
    }, [images])

    return (
        <>
            <Subtitle>О секции</Subtitle>
            <div className="section-info">
                <p>{description}</p>
                <p>{contents}</p>
            </div>
        </>
    )
}
