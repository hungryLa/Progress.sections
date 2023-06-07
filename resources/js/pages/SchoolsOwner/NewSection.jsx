import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Error } from "../../components/Error";
import { Button } from "../../components/UI/Button";
import { Form } from "../../components/UI/Form";
import { Input } from "../../components/UI/Input";
import { Loader } from "../../components/UI/Loader";
import { Select } from "../../components/UI/Select";
import { Subtitle } from "../../components/UI/Subtitle";
import { TextArea } from "../../components/UI/TextArea";
import useOccupationsStore from "../../store/useOccupationsStore";
import useSectionsStore from "../../store/useSectionsStore";

export const NewSection = () => {
    const { schoolId } = useParams();
    const navigate = useNavigate();
    const {
        loading: occupationLoading,
        occupations,
        getOccupations,
    } = useOccupationsStore();
    const {
        loading,
        occupationError,
        descriptionError,
        contentsError,
        addSection,
        addImages,
    } = useSectionsStore();

    const [occupation, setOccupation] = useState("");
    const [description, setDescription] = useState("");
    const [contents, setContents] = useState("");
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        getOccupations();
    }, []);

    const handleErrors = (value) => {
        setErrors((prev) => [...prev, value]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let isValid = true;

        if(!occupation) {
            isValid = false
            handleErrors('Поле "Вид деятельности" не должно быть пустым');
        }

        if (!description) {
            isValid = false;
            handleErrors('Поле "Описание" не должно быть пустым');
        }

        if (description.length < 12) {
            isValid = false;
            handleErrors(
                'Поле "Описание" должно содержать не менее 12 символов'
            );
        }

        if (!contents) {
            isValid = false;
            handleErrors('Поле "Содержание" не должно быть пустым');
        }

        if (contents.length < 48 || contents.length > 255) {
            handleErrors(
                'Поле "Содержание" должно содержать не менее 48 символов и не более 255 символов'
            );
            isValid = false;
        }

        if (isValid) {
            await addSection(
                schoolId,
                occupation,
                description,
                contents,
                images
            );
            toast("Секция создана");
            navigate(`/schools_owner/schools/${schoolId}/sections`);
        }
    };

    const handleDescription = (e) => {
        setErrors([]);
        setDescription(e.target.value);
        console.log(description.length);
    };

    const handleContents = (e) => {
        setErrors([]);
        setContents(e.target.value);
    };

    const handleOccupation = (e) => {
        setErrors([]);
        setOccupation(e.target.value);
    };

    return (
        <>
            <Subtitle>Создание секции</Subtitle>
            {occupationLoading || loading ? (
                <Loader />
            ) : (
                <>
                    {errors?.length > 0 ? <Error errors={errors} /> : ""}
                    <Form
                        onSubmit={handleSubmit}
                        inputs={
                            <>
                                <div className="two-col">
                                    <Select
                                        onChange={handleOccupation}
                                        label={"Вид деятельности"}
                                        value={occupation || ""}
                                    >
                                        <option value="">Выберите вид деятельности</option>
                                        {occupations.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.title}
                                            </option>
                                        ))}
                                    </Select>
                                    <Input
                                        label={"Описание"}
                                        type={"text"}
                                        value={description}
                                        onChange={handleDescription}
                                    />
                                    <Input
                                        label={"Изображения"}
                                        type={"file"}
                                        onChange={(e) => {
                                            setImages(e.target.files);
                                        }}
                                        multiple
                                    />
                                </div>
                                <div className="one-col">
                                    <TextArea
                                        label={"Содержание"}
                                        value={contents}
                                        onChange={handleContents}
                                    ></TextArea>
                                </div>
                            </>
                        }
                        buttons={
                            <Button type={"submit"} variant={"white"}>
                                {loading ? "Идет создание ..." : "Создать"}
                            </Button>
                        }
                    />
                </>
            )}
        </>
    );
};
