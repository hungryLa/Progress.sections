import { Subtitle } from "../../components/UI/Subtitle";
import { useNavigate, useParams } from "react-router-dom";
import useOccupationsStore from "../../store/useOccupationsStore";
import useSectionsStore from "../../store/useSectionsStore";
import { useEffect, useState } from "react";
import { Loader } from "../../components/UI/Loader";
import { Select } from "../../components/UI/Select";
import { Input } from "../../components/UI/Input";
import { TextArea } from "../../components/UI/TextArea";
import { Button } from "../../components/UI/Button";
import { Form } from "../../components/UI/Form";
import { Title } from "../../components/UI/Title";
import { Modal } from "../../components/UI/Modal";
import { Checkbox } from "../../components/UI/Checkbox";
import { toast } from "react-toastify";
import { Error } from "../../components/Error";

export const EditSection = () => {
    const { schoolId, sectionId } = useParams();
    const navigate = useNavigate();
    const {
        loading: occupationLoading,
        occupations,
        getOccupations,
    } = useOccupationsStore();
    const {
        loading,
        editSection,
        section,
        deleteSection,
        deleteImages,
        addImage,
        getOneSection,
    } = useSectionsStore();

    const [occupation, setOccupation] = useState("");
    const [description, setDescription] = useState("");
    const [contents, setContents] = useState("");
    const [images, setImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [errors, setErrors] = useState([]);

    const [modalIsActive, setModalIsActive] = useState(false);

    useEffect(() => {
        getOneSection(schoolId, sectionId);
        getOccupations();
        setOccupation(section?.occupation?.id);
        setDescription(section?.description);
        setContents(section?.contents);
    }, []);

    const handleErrors = (value) => {
        setErrors((prev) => [...prev, value]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        let isValid = true;

        if (!occupation) {
            isValid = false;
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

        if (imagesToDelete.length > 0) {
            await deleteImages(sectionId, imagesToDelete);
        }
        if (images?.length > 0) {
            await addImage(schoolId, sectionId, images);
        }
        if (isValid) {
            await editSection(
                schoolId,
                sectionId,
                occupation,
                description,
                contents,
                images
            );
            toast("Данные секции изменены");
            navigate(`/schools_owner/schools/${schoolId}/sections`);
        }
    };

    const handleDelete = async () => {
        await deleteSection(schoolId, sectionId).then(() => {
            navigate(`/schools_owner/schools/${schoolId}/sections`);
        });
        toast("Секция удалена");
        setModalIsActive(false);
    };

    const handleSelect = (e) => {
        setErrors([]);
        let imageList = [...imagesToDelete];
        if (e.target.checked) {
            imageList = [...imagesToDelete, e.target.value];
        } else {
            imageList.splice(imagesToDelete.indexOf(e.target.value), 1);
        }
        setImagesToDelete(imageList);
    };

    return (
        <>
            <Subtitle>Редактирование секции</Subtitle>
            {loading || occupationLoading ? (
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
                                        onChange={(e) => {
                                            setErrors([]);
                                            setOccupation(e.target.value);
                                        }}
                                        label={"Вид деятельности"}
                                    >
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
                                        onChange={(e) => {
                                            setErrors([]);
                                            setDescription(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="one-col">
                                    <Input
                                        label={"Изображения"}
                                        type={"file"}
                                        onChange={(e) => {
                                            setErrors([]);
                                            setImages(e.target.files);
                                        }}
                                        multiple
                                    />

                                    {section?.images?.length > 0 ? (
                                        <div className="one-col">
                                            <span className="delete-images-title">
                                                Выберите изображения для
                                                удаления
                                            </span>
                                            {section &&
                                                section?.images.map((image) => (
                                                    <Checkbox
                                                        key={image.id}
                                                        image
                                                        onChange={handleSelect}
                                                        value={image.id}
                                                        id={image.id}
                                                        isChecked={imagesToDelete.some(
                                                            (item) =>
                                                                item == image.id
                                                        )}
                                                        label={
                                                            <img
                                                                src={`/storage/${image.path}`}
                                                                alt={image.path}
                                                            />
                                                        }
                                                    />
                                                ))}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="one-col">
                                    <TextArea
                                        label={"Содержание"}
                                        value={contents}
                                        onChange={(e) => {
                                            setErrors([]);
                                            setContents(e.target.value);
                                        }}
                                    ></TextArea>
                                </div>
                            </>
                        }
                        buttons={
                            <>
                                <Button type={"submit"} variant={"white"}>
                                    {loading
                                        ? "Идет редактирование ..."
                                        : "Редактировать"}
                                </Button>
                                <Button
                                    variant={"orange"}
                                    type={"button"}
                                    onClick={() => setModalIsActive(true)}
                                >
                                    Удалить секцию
                                </Button>
                            </>
                        }
                    />
                </>
            )}
            <Modal isActive={modalIsActive}>
                <Title>Удаление секции</Title>
                <p>Вы действительно хотите удалить секцию?</p>
                <div className={"modal__buttons"}>
                    <Button variant={"green"} onClick={handleDelete}>
                        Да
                    </Button>
                    <Button
                        variant={"gray"}
                        onClick={() => {
                            setModalIsActive(false);
                        }}
                    >
                        Отмена
                    </Button>
                </div>
            </Modal>
        </>
    );
};
