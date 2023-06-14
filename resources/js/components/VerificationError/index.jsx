import './VerificationError.scss'
import {toast} from "react-toastify";
import api from "../../middlewares/auth.middleware";
import useAuthStore from "../../store/useAuthStore";

export const VerificationError = () => {
    const {getUserInfo} = useAuthStore()
    
    const resendMail = async () => {
        await api.post('email/resend')
        toast('Письмо для подтверждения почты отправлено')
        await getUserInfo()
    }

    return (
        <div className={'verification-error'}>
            <div className="container">
                <div className="verification-error__message">
                    <h4>Ваша почта не подтверждена, вследствии чего функционал
                        веб-приложения
                        ограничен.</h4>
                    <button onClick={resendMail}>Повторное письмо для подтверждения</button>
                </div>
            </div>
        </div>
    )
}
