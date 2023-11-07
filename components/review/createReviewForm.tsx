'use client'
import { useActions, useAppSelector } from "@/state/store";
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface IFormValue {
    text: string;
    isActive: boolean;
    ownerEmail: string;
}

const CreateReviewForm = () => {

    const { user } = useAppSelector((state) => state.auth)

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const initialFormValue = useMemo(() => ({
        text: "",
        isActive: true,
        ownerEmail: user?.email || "",
    }), [user?.email])

    const [formValue, setFormValue] = useState<IFormValue>(initialFormValue);
    const { createReview } = useActions();

    const handleFormChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setErrorMessage("");
            setFormValue({
                ...formValue,
                [e.target.name]: e.target.value,
            });
        },
        [formValue]
    );

    const handleCheckboxChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormValue({
                ...formValue,
                [e.target.name]: e.target.checked,
            });
        },
        [formValue]
    );

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        setFormValue(initialFormValue)
    }, [initialFormValue])
    const handleSubmit = useCallback(async (formValue: IFormValue) => {
        if (!formValue.ownerEmail || !formValue.text || !validateEmail(formValue.ownerEmail)) {
            setErrorMessage("Пожалуйста, заполните все поля правильно.")
            return
        }

        setIsLoading(true);
        await createReview(formValue);
        setIsLoading(false)
    }, [createReview])
    return (
        <Flex flexDir='column' alignItems={'center'} mx={'auto'} maxW={360}>
            <FormControl isRequired>
                <FormLabel htmlFor="email">Почта</FormLabel>
                <Input
                    type="email"
                    id="ownerEmail"
                    name="ownerEmail"
                    value={formValue.ownerEmail}
                    onChange={handleFormChange}
                />
            </FormControl>
            <FormControl isRequired>

                <FormLabel htmlFor="text">Текст</FormLabel>
                <Textarea
                    id="text"
                    name="text"
                    value={formValue.text}
                    onChange={handleFormChange}
                />
            </FormControl>

            <FormControl display={'flex'} alignItems={'center'} gap={2}>
                <Checkbox
                    id="isActive"
                    name="isActive"
                    isChecked={formValue.isActive}
                    onChange={handleCheckboxChange}
                />
                <FormLabel htmlFor="isActive" mt={2}>Опубликовать сразу</FormLabel>

            </FormControl>
            <Button isLoading={isLoading} mt={4} colorScheme={'green'} onClick={() => handleSubmit(formValue)}>Добавить</Button>
            {errorMessage && <Text color={'tomato'}> {errorMessage}</Text>}
        </Flex>
    );
}

export default CreateReviewForm;