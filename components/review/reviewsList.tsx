'use client'
import { useActions, useAppSelector } from "@/state/store";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Heading,
    useDisclosure
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ReviewItem from "./reviewItem";
import CreateReviewForm from "./createReviewForm";

const ReviewsList = () => {
    const { user } = useAppSelector((state) => state.auth)
    const { reviews } = useAppSelector((state) => state.review)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { getReviewByUserId } = useActions();

    useEffect(() => {
        user?.id && getReviewByUserId(user?.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id])

    return (
        <Flex flexDir='column' alignItems={'center'} mx={'auto'}>
            <Heading fontSize={24} my={4} mt={16}> Список отзывов </Heading>
            <Flex justifyContent={'center'} gap={6} maxW={[360, 540, 740, 1440]} flexWrap={"wrap"}>
            {reviews.length
                ?
                reviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                ))
                :
                <Heading fontSize={20} colorScheme={'gray'} my={4}>Список пуст...</Heading>
            }
            </Flex>
            <Button colorScheme={"green"} onClick={onOpen} my={6} >Добавить отзыв</Button>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent mx={2} pb={4}>
                    <ModalHeader>Оставить отзыв</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <CreateReviewForm onClose={onClose} />
                    </ModalBody>

                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default ReviewsList;