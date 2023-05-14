import {Subtitle} from "../UI/Subtitle";

import './SchoolInfo.scss'
import useContentStore from "../../store/useContentStore";
import {useEffect} from "react";
import {translateSchoolType} from "../../helpers/translateSchoolType";

export const SchoolInfo = ({school}) => {
    const title = useContentStore(state => state.title)
    const setTitle = useContentStore(state => state.setTitle)
    const setImage = useContentStore(state => state.setImage)

    useEffect(() => {
        setTitle(school.title)
        setImage('https://placehold.co/600x400')
    }, [school])

    return (
        <>
        <Subtitle>Немного о нас</Subtitle>
        <div className={'school-info'}>
            <p className={'school-info__type'}>{translateSchoolType(school.type)}</p>
            <p className={'school-info__description'}>{school.description}</p>
            <p className={'school-info__phone'}>Телефон:  <a href={`tel:${school.phone__number}`}>{school.phone_number}</a></p>
            <p className={'school-info__address'}>Адрес: {school.address}</p>
        </div>
        </>
    )
}
