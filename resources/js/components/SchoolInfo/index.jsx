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
        setImage(['https://images.unsplash.com/photo-1615859131861-052f0641a60e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1589&q=80', 'https://images.unsplash.com/photo-1512861506260-6520871bbdaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHdpZGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'])
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
