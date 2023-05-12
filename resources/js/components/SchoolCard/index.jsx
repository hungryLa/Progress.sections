import {Link} from "react-router-dom";

import './SchoolCard.scss'

export const SchoolCard = ({id, title, type, description}) => {
    const translateType = (type) => {
        switch (type) {
            case 'creative':
                return 'Творчество'
            case 'sport':
                return 'Спорт'
            case 'musical':
                return 'Музыка'
            default:
                break
        }
    }
    return (
        <Link className={'school-card'} to={`/schools/${id}`}>
            <div className={'school-card__inner'}>
                <img className={'school-card__image'} src={'https://placehold.co/600x400'} alt={title}/>
                <h3 className={'school-card__title'}>{title}</h3>
                <p className={'school-card__type'}><span className={`school-card__badge`}>{translateType(type)}</span></p>
                <p className={'school-card__description'}>{description}</p>
            </div>
        </Link>
    )
}
