'use client';
import {
    Button,
    Flex,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { parseCookies } from 'nookies';
import { errorHandler } from '@/utils/errorHandler';
import { useActions, useAppSelector } from '@/state/store';
import { clearSucces } from '@/state/auth/slice';
import { useRouter } from 'next/navigation';

const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const RegisterForm = () => {
    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formValue, setFormValue] = useState(initialState);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const { register } = useActions();
    const { isSuccess, error } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();

    const router = useRouter();

    const handleFormChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormValue({
                ...formValue,
                [e.target.name]: e.target.value,
            });
        },
        [formValue]
    );

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        await register(formValue);
        setIsLoading(false);
    }, [formValue, register]);

    useEffect(() => {
        isSuccess && router.push('/auth/login')
        dispatch(clearSucces());
    }, [dispatch, isSuccess, router]);

    const handleClick = useCallback(() => setShow(!show), [show]);

    const handleConfirmPasswordBlur = useCallback(() => {
        setPasswordMatchError(formValue.confirmPassword !== formValue.password);
    }, [formValue]);

    const isRegistrationEnabled = useMemo(() => {
        return (
            formValue.password === formValue.confirmPassword &&
            !!formValue.email &&
            !!formValue.username
        );
    }, [formValue.password, formValue.confirmPassword, formValue.email, formValue.username]);
    return (
        <Flex flexDir={'column'} alignItems={'center'} mx={'auto'} maxW={360}>
            <Heading m={4}>Регистрация</Heading>
            <Input
                m={1}
                w={'100%'}
                name='username'
                value={formValue.username}
                onChange={handleFormChange}
                pr='2rem'
                type={'text'}
                placeholder='Введите логин'
            />
            <Input
                m={1}
                w={'100%'}
                name='email'
                value={formValue.email}
                onChange={handleFormChange}
                pr='2rem'
                type={'email'}
                placeholder='Введите email'
            />
            <InputGroup justifyContent={'space-between'} size='md' m={1}>
                <Input
                    w={'100%'}
                    name='password'
                    value={formValue.password}
                    onChange={handleFormChange}
                    pr='2rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Введите пароль'
                />
                <InputRightElement>
                    <Button height={'95%'} bg={'transparent'} size='sm' onClick={handleClick}>
                        {show ? <Icon as={AiFillEye} /> : <Icon as={AiFillEyeInvisible} />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Input
                m={1}
                w={'100%'}
                name='confirmPassword'
                value={formValue.confirmPassword}
                onChange={handleFormChange}
                onBlur={handleConfirmPasswordBlur}
                pr='2rem'
                type={'password'}
                placeholder='Повторите пароль'
            />
            {passwordMatchError && <Text color='red.500'>Пароли не совпадают</Text>}
            <Button
                m={4}
                colorScheme={'green'}
                isDisabled={!isRegistrationEnabled}
                onClick={handleSubmit}
            >
                {isLoading ? <Spinner color={'white'} /> : <p>Зарегистрироваться</p>}
            </Button>
            {error && <Text color={'red'}>{errorHandler(error)}</Text>}
        </Flex>
    );
};

export default RegisterForm;
