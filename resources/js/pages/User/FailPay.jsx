import { useNavigate } from "react-router-dom"
import { Subtitle } from "../../components/UI/Subtitle"
import useSectionsStore from "../../store/useSectionsStore"
import { useEffect } from "react"
import api from "../../middlewares/auth.middleware"
import { toast } from "react-toastify"

export const FailPay = () => {
    const navigate = useNavigate()
    const {section} = useSectionsStore()

    useEffect(() => {
        const fetchFail = async () => {
            try {
                const response = await api.get("cabinet/reservations/failPay")
                if(response?.data?.status === 'fail') {
                    toast.error('Оплата не прошла')
                    navigate(`/user/schools/${section?.school_id}/sections/${section?.id}/reservation`)
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchFail();
    }, [])

    return (
        <>
            <Subtitle>Неудачный</Subtitle>
        </>
    )
}
