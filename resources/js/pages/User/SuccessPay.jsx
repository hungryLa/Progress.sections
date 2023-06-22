import { useEffect } from "react";
import { Subtitle } from "../../components/UI/Subtitle";
import api from "../../middlewares/auth.middleware";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSectionsStore from "../../store/useSectionsStore";

export const SuccessPay = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const {section} = useSectionsStore()

    useEffect(() => {
        const fetchSuccess = async () => {
            try {
                const response = await api.post(
                    "cabinet/reservations/successPay", {
                        'user': searchParams.get('user_id'),
                        'timetableSection': searchParams.get('timetable_section_id'),
                        'client': searchParams.get('client'),
                        'date': searchParams.get('date'),
                        'time': searchParams.get('time')
                    }
                )
                console.log(response);
                if(response?.data?.status === 'success') {
                    toast('Успешно забронировано')
                    navigate(`/user/schools/${section?.school_id}/sections/${section?.id}/reservation`)
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSuccess();
    }, [navigate, section])

    return (
        <>
            <Subtitle>Успех</Subtitle>
        </>
    );
};
