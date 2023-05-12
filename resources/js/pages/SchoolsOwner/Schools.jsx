import useUsersStore from "../../store/useUsersStore";
import {shallow} from "zustand/shallow";
import {useNavigate} from "react-router-dom";
import useSchoolsStore from "../../store/useSchoolsStore";
import {useEffect, useState} from "react";
import {Subtitle} from "../../components/UI/Subtitle";
import {Loader} from "../../components/UI/Loader";
import {CardContainer} from "../../components/CardContainer";
import {SchoolCard} from "../../components/SchoolCard";

export const Schools = () => {
    const loading = useSchoolsStore(({loading}) => loading)
    const schools = useSchoolsStore(({schools}) => schools, shallow)
    const getSchools = useSchoolsStore(({getSchools}) => getSchools, shallow)
    // const deleteUser = useSchoolsStore(({deleteUser}) => deleteUser, shallow)
    const navigate = useNavigate()

    const [modalIsActive, setModalIsActive] = useState(false)
    const [schoolToDelete, setSchoolToDelete] = useState({})

    useEffect(() => {
        getSchools()
    }, [])

    return (
        <>
            <Subtitle>Список школ</Subtitle>

            {loading ? <Loader /> : (
                <>
                    <CardContainer>
                        {schools.map(school => (
                            <SchoolCard
                                id={school.id}
                                title={school.title}
                                description={school.description}
                                type={school.type}
                            />
                        ))}
                    </CardContainer>
                </>
            )}
        </>
    )
}
