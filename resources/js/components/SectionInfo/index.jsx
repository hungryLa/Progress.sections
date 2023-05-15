import useContentStore from "../../store/useContentStore";
import {useEffect} from "react";
import {Subtitle} from "../UI/Subtitle";

import './SectionInfo.scss'

export const SectionInfo = ({description, contents, occupationTitle}) => {
    const {setTitle} = useContentStore()

    useEffect(() => {
        if(occupationTitle) setTitle(occupationTitle)
    }, [])

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
