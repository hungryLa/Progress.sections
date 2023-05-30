import {Subtitle} from "../UI/Subtitle";
import './TeacherProfile.scss'

export const TeacherProfile = ({fullName, images = null, email, phone, occupations, about, experience}) => {
    return (
        <div className={'teacher-profile'}>
            <Subtitle className={'teacher-profile__fullname'}>{fullName}</Subtitle>
            <div className="teacher-profile__body" style={!!images ? {gridTemplateColumns: '1fr'} : {}}>
                {images && images[0]?.path ? (
                    <img src={`/storage/${images[0]?.path}`} className={'teacher-profile__image'} alt=""/>
                ) : ''}
                <div className={"teacher-profile__info"}>
                    <div>Электронная почта: <a href={`mailto:${email}`}>{email}</a></div>
                    {phone ? (
                        <div>Телефон: <a href={`tel:${phone}`}>{phone}</a></div>
                    ) : ""}
                    {occupations ? (
                        <div className={'teacher-profile__occupations'}>
                            {occupations.map(occupation => (
                                <span key={occupation}>{occupation}</span>
                            ))}
                        </div>
                    ) : ''}
                    {experience ? (
                        <div className={'teacher-profile__experience'}>
                            {experience}
                        </div>
                    ) : ''}
                    {about ? (
                        <div className={'teacher-profile__about'}>
                            {about}
                        </div>
                    ) : ''}
                </div>
            </div>
        </div>
    )
}
