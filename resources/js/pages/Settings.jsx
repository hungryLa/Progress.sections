import { useEffect } from "react";
import { Subtitle } from "../components/UI/Subtitle";
import useAuthStore from "../store/useAuthStore";
import useUsersStore from "../store/useUsersStore";
import { Loader } from "../components/UI/Loader";

export const Settings = () => {
    const { user } = useAuthStore();
    const { getTeacherInformation, loading, error } = useUsersStore();

    useEffect(() => {
        getTeacherInformation(user.id);
    }, []);

    return (
        <>
            <Subtitle>Настройки</Subtitle>
            {loading ? <Loader /> : "Loaded"}
        </>
    );
};
