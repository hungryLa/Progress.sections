import { useEffect } from "react"
import api from "../../middlewares/auth.middleware"

export const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const response = api.get
    })
    return (
        <h1>Users page</h1>
    )
}