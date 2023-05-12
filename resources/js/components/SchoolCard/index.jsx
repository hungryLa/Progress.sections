import {Link} from "react-router-dom";

import './SchoolCard.scss'
import {translateSchoolType} from "../../helpers/translateSchoolType";

export const SchoolCard = ({id, title, type, description}) => {

    return (
        <Link className={'school-card'} to={`/schools/${id}`}>
            <div className={'school-card__inner'}>
                <img className={'school-card__image'} src={'https://placehold.co/600x400'} alt={title}/>
                <h3 className={'school-card__title'}>{title}</h3>
                <p className={'school-card__type'}><span className={`school-card__badge`}>{translateSchoolType(type)}</span></p>
                <p className={'school-card__description'}>{description}</p>
            </div>
        </Link>
    )
}
