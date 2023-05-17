import {Subtitle} from "../../components/UI/Subtitle";
import useSchoolTypesStore from "../../store/useSchoolTypesStore";
import {Loader} from "../../components/UI/Loader";
import {useEffect} from "react";
import {Button} from "../../components/UI/Button";
import {useNavigate} from "react-router-dom";

export const SchoolTypes = () => {
    const {loading, error, schools, getSchoolTypes} = useSchoolTypesStore()
    const navigate = useNavigate()

    useEffect(() => {
        getSchoolTypes()
    }, [])

    const handleNavigate = () => {
        navigate('/admin/schoolTypes/new')
    }

    return (
        <>
            <Subtitle>Типы школ</Subtitle>
            {loading ? <Loader /> : (
                <>
                    <Button type={'button'} variant={'blue'} onClick={handleNavigate}>Создать</Button>
                </>
            )}
        </>
    )
}
