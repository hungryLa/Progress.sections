import {Link} from "react-router-dom";

import './SectionCard.scss'

export const SectionCard = ({schoolId ,section}) => {
    return (
        <Link to={`/schools_owner/schools/${schoolId}/sections/${section.id}`} className={'section-card'}>
            <div className={'section-card__inner'}>
                {section.images.length > 0 ? (<img src={`/storage/${section?.images[0].path}`} alt=""/>) : ''}
                <h3 className={'section-card__title'}>{section.occupation?.title}</h3>
                <p className={'section-card__description'}>{section.description}</p>
            </div>
        </Link>
    )
}
