'use client';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Flex,
    Heading,
    Icon,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { AiFillBook, AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import { useActions, useAppDispatch, useAppSelector } from '@/state/store';
import { clearstate } from '@/state/auth/slice';

export const navLinks = [
    {
        path: '/reviews',
        title: 'Отзывы',
    },
];

const Header = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);
    const { getMe } = useActions();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const pathname = usePathname();
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const dispatch = useAppDispatch();

    const handleClick = useCallback(() => {
        dispatch(clearstate());
        window.location.href = '/auth/login';
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            !user && getMe();
            setLoading(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Flex
            userSelect={'none'}
            className={styles.header}
            height={'60px'}
            width={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
            pl={8}
            gap={4}
        >
            <Flex gap={8} h={'100%'}>
                <Flex
                    cursor={'pointer'}
                    className={styles.home}
                    transition={'all .3s ease-in-out'}
                    gap={4}
                    alignItems={'center'}
                    h={'100%'}
                    onClick={() => router.push('/')}
                >
                    <Icon color={'white'} boxSize={6} as={AiFillHome} className={styles.icon} />{' '}
                    <Heading fontSize={[20, 20, 28]}>Главная</Heading>
                </Flex>
                {user && <Flex
                    className={styles.main}
                    cursor={'pointer'}
                    transition={'all .3s ease-in-out'}
                    px={2}
                    alignItems={'center'}
                    h={'100%'}
                    gap={1}
                    onClick={() => router.push('/reviews')}
                >
                    <Icon mt={1} color={'white'} boxSize={6} as={AiFillBook} />{' '}
                    <Text fontSize={24}>Отзывы</Text>
                </Flex>}
            </Flex>
            {user ? (
                <Flex
                    cursor={'pointer'}
                    px={6}
                    alignItems={'center'}
                    transition={'all .3s ease-in-out'}
                    h={'100%'}
                    className={styles.main}
                    onClick={handleClick}
                >
                    <Text fontSize={18}>Выйти</Text>
                </Flex>
            ) : (
                <Flex
                    cursor={'pointer'}
                    px={6}
                    alignItems={'center'}
                    transition={'all .3s ease-in-out'}
                    h={'100%'}
                    className={styles.main}
                    onClick={() => router.push('/auth/login')}
                >
                    <Text fontSize={18}>Войти</Text>
                </Flex>
            )}
            <div className={styles.menu}>
                <Button onClick={onOpen} h={'60px'} borderRadius={0} className={styles.menuButton}>
                    <Icon boxSize={8} as={AiOutlineMenu} />
                </Button>
                <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Меню</DrawerHeader>

                        <DrawerBody p={0}>
                            {navLinks.map((link) => (
                                <Flex
                                    className={
                                        pathname.includes(link.path)
                                            ? styles.linkActive
                                            : styles.link
                                    }
                                    key={link.path}
                                    cursor={'pointer'}
                                    borderBottom={'1px solid gray'}
                                    p={2}
                                    alignItems={'center'}
                                    justifyContent={'flex-end'}
                                    onClick={() => {
                                        router.push(link.path);
                                        onClose();
                                    }}
                                >
                                    <Text fontSize={20}>{link.title}</Text>
                                </Flex>
                            ))}
                            {user ?
                                <Flex
                                    cursor={'pointer'}
                                    borderBottom={'1px solid gray'}
                                    p={2}
                                    alignItems={'center'}
                                    justifyContent={'flex-end'}
                                    onClick={handleClick}
                                >
                                    <Text fontSize={20}>Выйти</Text>
                                </Flex>
                                :
                                <Flex
                                    className={
                                        pathname.includes('/auth/login')
                                            ? styles.linkActive
                                            : styles.link
                                    }
                                    cursor={'pointer'}
                                    borderBottom={'1px solid gray'}
                                    p={2}
                                    alignItems={'center'}
                                    justifyContent={'flex-end'}
                                    onClick={() => {
                                        router.push('/auth/login');
                                        onClose();
                                    }}
                                >
                                    <Text fontSize={20}>Войти</Text>
                                </Flex>}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>
        </Flex>
    );
};

export default Header;