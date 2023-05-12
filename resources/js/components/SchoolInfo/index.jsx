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
        <div className={'school-info'}>
            <p className={'school-info__type'}>{translateSchoolType(school.type)}</p>
            <p className={'school-info__description'}>{school.description}</p>
            <a className={'school-info__phone'} href={`tel:${school.phone__number}`}>Телефон: {school.phone_number}</a>
            <p className={'school-info__address'}>Адрес: {school.address}</p>
        </div>
    )
}
