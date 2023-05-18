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
        console.log(school)
        setImage(school?.images.map(image => `/storage/${image.path}`))
    }, [school])

    return (
        <>
        <Subtitle>Немного о нас</Subtitle>
        <div className={'school-info'}>
            <div className={'school-info__type'}>
                {school?.school_types.map(type => (
                    <span className={`school-card__badge`} style={{backgroundColor: type.color}}>
                            <span>{type?.title}</span>
                        </span>
                ))}
            </div>
            <p className={'school-info__description'}>{school.description}</p>
            <p className={'school-info__phone'}>Телефон:  <a href={`tel:${school.phone__number}`}>{school.phone_number}</a></p>
            <p className={'school-info__address'}>Адрес: {school.address}</p>
        </div>
        </>
    )
}
