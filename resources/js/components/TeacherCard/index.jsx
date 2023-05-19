import {Link} from "react-router-dom";

export const TeacherCard = ({schoolId, type, teacher}) => {
    return (
        <Link className={'teacher-card'} to={`/schools_owner/schools/${schoolId}/${type}-teachers/${teacher.id}/`}>
            <h5>{teacher.full_name}</h5>
        </Link>
    )
}
