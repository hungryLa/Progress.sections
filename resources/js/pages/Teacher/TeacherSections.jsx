import { useEffect } from "react"
import { Subtitle } from "../../components/UI/Subtitle"
import useAuthStore from "../../store/useAuthStore"

export const TeacherSections = () => {
    const {user: authUser, getUserInfo} = useAuthStore()

    useEffect(() => {
        getUserInfo()
        console.log(authUser);
    }, [])

    return (
        <>
            <Subtitle>Секции</Subtitle>
        </>
    )
}
