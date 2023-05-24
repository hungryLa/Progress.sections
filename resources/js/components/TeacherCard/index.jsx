import {Link} from "react-router-dom";

import './TeacherCard.scss';

export const TeacherCard = ({schoolId, teacher}) => {
    return (
        <Link className={'teacher-card'} to={`/schools_owner/schools/${schoolId}/school-teachers/${teacher?.id}/`}>
            <div className="teacher-card__inner">
                <h3 className={'teacher-card__title'}>{teacher?.full_name}</h3>
                {teacher?.information?.occupations?.which_occupations ? (
                    <div className={'teacher-card__occupations'}>
                        {teacher?.information?.occupations?.which_occupations.map(occupation =>
                            <span key={occupation + Math.random()}
                                  className={'teacher-card__occupation'}>{occupation}</span>
                        )}
                    </div>
                ) : ''}
            </div>
        </Link>
    )
}
