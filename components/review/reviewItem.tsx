'use client'
import { IReview } from "@/api/reviewApi";
import { useActions } from "@/state/store";
import { convertToMoscowTime } from "@/utils/timeFormatter";
import { Box, Button, Card, Checkbox, Collapse, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, StatDownArrow, StatUpArrow, Text, useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { useSessionStorage } from "usehooks-ts";
import EditReviewForm from "./editReviewForm";

const ReviewItem = ({ review }: { review: IReview }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [disableModal, setDisableModal] = useSessionStorage('disableModal', false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { deleteReview } = useActions()
    const EditModal = useDisclosure();
    const handleDeleteReview = useCallback(async (id: number | undefined) => {
        setIsLoading(true);
        id && await deleteReview(id);
        setIsLoading(false);
    }, [deleteReview]);

    const handleToggleModal = useCallback(() => {
        setShowModal(!showModal);
    }, [showModal]);

    const handleCheckboxChange = useCallback(() => {
        setDisableModal(!disableModal);
    }, [setDisableModal, disableModal]);

    return (
        <Card p={4} my={2} w={[320, 360, 400]}>
            <Flex gap={4} justifyContent={'space-between'}>
                <Flex overflowY={'hidden'} alignItems={'center'} height={'max-content'} maxW={[240, 290, 320]} >
                    <Text noOfLines={1} fontSize={18} fontWeight={'bold'}>{review.attributes.ownerEmail}</Text>
                </Flex>
                <Flex gap={2}>
                    <Button size={'xs'} colorScheme={'facebook'}>
                        <Icon as={AiTwotoneEdit} boxSize={4} onClick={EditModal.onOpen} />
                    </Button>
                    <Button size={'xs'} colorScheme={'red'}>
                        {isLoading ? <Spinner size='sm' cursor={'pointer'} color={'white'} mx={'auto'} /> :
                            <Icon
                                boxSize={4}
                                as={AiFillDelete}
                                onClick={() => {
                                    disableModal ? handleDeleteReview(review.id) : handleToggleModal();
                                }}
                            />
                        }
                    </Button>

                </Flex>
            </Flex>
            <Collapse startingHeight={review.attributes.text.length > 70 ? 72 : 36} in={isOpen}>
                <Text mt={4} noOfLines={isOpen ? undefined : 2}>{review.attributes.text}</Text>
            </Collapse>
            <Flex mt={4} justifyContent={"space-between"} alignItems={'flex-end'}>
                <Box>
                    <Flex gap={2}>
                        <Text fontSize={14}>Статус:</Text> {review.attributes.isActive ? <Text fontSize={14} color={'green'}> Опубликован</Text> : <Text fontSize={14} color={'gray'} textDecoration={'GrayText'}> Черновик</Text>}
                    </Flex>
                    <Flex gap={2} justifyContent={'space-between'}>
                        <Text fontSize={12}>Создан:</Text> <Text fontSize={12}>{convertToMoscowTime(review.attributes.createdAt)}</Text>
                    </Flex>
                    {isOpen && (
                        <Flex gap={2} justifyContent={'space-between'}>
                            <Text fontSize={12}>Обновлён:</Text> <Text fontSize={12}>{convertToMoscowTime(review.attributes.updatedAt)}</Text>
                        </Flex>
                    )}
                </Box>
                <Box>
                    <Button variant={'ghost'} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? "Скрыть" : "Ещё"} <Icon ml={1} boxSize={3} as={isOpen ? StatUpArrow : StatDownArrow} />
                    </Button>
                </Box>
            </Flex>
            <Modal isOpen={showModal} onClose={handleToggleModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Удалить слово</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Вы уверены, что хотите удалить отзыв?
                        <Checkbox mt={8} onChange={handleCheckboxChange}>Больше не спрашивать</Checkbox>
                    </ModalBody>
                    <ModalFooter>

                        <Button colorScheme={'red'} onClick={() => {
                            handleDeleteReview(review.id);
                            handleToggleModal();
                        }}>
                            Удалить
                        </Button>
                        <Button variant={'ghost'} onClick={handleToggleModal}>
                            Отмена
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={EditModal.isOpen} onClose={EditModal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Удалить слово</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EditReviewForm review={review} onClose={EditModal.onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Card>
    );
}

export default ReviewItem;