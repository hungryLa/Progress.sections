import { Subtitle } from "../../components/UI/Subtitle";
import { useEffect, useState } from "react";
import usePersonsStore from "../../store/usePersonsStore";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/UI/Form";
import { Input } from "../../components/UI/Input";
import { Select } from "../../components/UI/Select";
import { Button } from "../../components/UI/Button";
import { Error } from "../../components/Error";
import { toast } from "react-toastify";

export const NewPerson = () => {
    const { loading, createPerson, clearError } = usePersonsStore();

    const [gender, setGender] = useState("male");
    const [fullName, setFullName] = useState("");
    const [dateBirth, setDateBirth] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleGender = (e) => {
        setErrors([]);
        clearError();
        setGender(e.target.value);
    };

    const handleFullName = (e) => {
        setErrors([]);
        clearError();
        setFullName(e.target.value);
    };

    const handleDateBirth = (e) => {
        setErrors([]);
        clearError();
        setDateBirth(e.target.value);
    };

    const handleError = (value) => {
        setErrors((prev) => [...prev, value]);
    };

    useEffect(() => {
        clearError();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let isValid = true;

        if (!fullName) {
            handleError('Поле "ФИО" не может быть пустым');
            isValid = false;
        }

        if (fullName.length < 8) {
            handleError('Поле "ФИО" должно быть не менее 8 символов');
            isValid = false;
        }

        if (!gender) {
            handleError('Поле "Пол" обязательно для заполнения');
            isValid = false;
        }

        const currentDate = new Date();
        const selectedDate = new Date(dateBirth);

        if (selectedDate > currentDate) {
            handleError("Дата рождения не может быть позже текущей даты");
            isValid = false;
        }

        if (!dateBirth) {
            handleError('Поле "Дата рождения" обязательно для заполнения');
            isValid = false;
        }

        if (isValid) {
            const createdPersonResult = await createPerson(
                gender,
                fullName,
                dateBirth
            );

            if (
                !createdPersonResult.error &&
                createdPersonResult.status === "success"
            ) {
                navigate("/user/accounts");
                toast("Подопечный создан");
            }
        }
    };

    return (
        <>
            <Subtitle>Добавить подопечного</Subtitle>
            <Form
                onSubmit={handleSubmit}
                inputs={
                    <div className="one-col">
                        {errors.length > 0 ? <Error errors={errors} /> : ""}
                        <div className="two-col">
                            <Input
                                label={"ФИО"}
                                placeholder={"ФИО"}
                                value={fullName}
                                onChange={handleFullName}
                                id={"fullname"}
                                bordered
                            />
                            <Input
                                label={"Дата рождения"}
                                placeholder={"Дата рождения"}
                                value={dateBirth}
                                type={"date"}
                                onChange={handleDateBirth}
                                id={"date-birth"}
                                bordered
                            />
                            <Select
                                label={"Пол"}
                                placeholder={"Пол"}
                                value={gender || "male"}
                                onChange={handleGender}
                                id={"gender"}
                                bordered
                            >
                                <option value={"male"} defaultChecked>
                                    Мужской
                                </option>
                                <option value={"female"}>Женский</option>
                            </Select>
                        </div>
                    </div>
                }
                buttons={
                    <Button type={"submit"} variant={"white"}>
                        {loading ? "Создание..." : "Создать"}
                    </Button>
                }
            />
        </>
    );
};
