import {Link} from "react-router-dom";

import './SchoolCard.scss'
import {translateSchoolType} from "../../helpers/translateSchoolType";
import {useEffect} from "react";

export const SchoolCard = ({id, title, types, description}) => {

    useEffect(() => {
        console.log('types', types[0].title)
    }, [])

    return (
        <Link className={'school-card'} to={`/schools_owner/schools/${id}`}>
            <div className={'school-card__inner'}>
                <img className={'school-card__image'} src={'https://placehold.co/600x400'} alt={title}/>
                <h3 className={'school-card__title'}>{title}</h3>
                <div className={'school-card__type'}>
                    {types.map(type => (
                        <span className={`school-card__badge`} style={{backgroundColor: type.color}}>
                            <span>{type.title}</span>
                        </span>
                    ))}
                </div>
                <p className={'school-card__description'}>{description}</p>
            </div>
        </Link>
    )
}
