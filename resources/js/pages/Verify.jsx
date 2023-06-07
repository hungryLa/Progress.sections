import {Subtitle} from "../components/UI/Subtitle";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "../middlewares/auth.middleware";
import {toast} from "react-toastify";

export const Verify = () => {
    const navigate = useNavigate()
    const {hash, id} = useParams()

    useEffect(() => {
        const fetchVerify = async () => {
            const response = await api.get(`/email/verify/${id}/${hash}`)
            console.log(response)
            if (response?.status === 200) {
                toast(response?.data)
                navigate('/')
            }
            if (response?.status === 500) {
                toast(response?.data)
                navigate('/')
            }
        }
        fetchVerify()
    }, [])

    return (
        <>
            <Subtitle>Активация</Subtitle>
        </>
    )
}
