'use client';
import { Box, Flex, Heading } from '@chakra-ui/react';


const Footer = () => {
    return (
        <Flex
            borderTop={'1px solid #ccc'}
            bgColor={'#f8f8f8'}
            color={'#686868'}
            p={'15px'}
            lineHeight={'20px'}
            boxShadow={'2xl'}
            flex={0}
            height={80}
            width={'100%'}
            flexDirection={['column', 'column', 'row']}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Box>
                <Heading fontSize={[20, 24, 26]}>Reviews</Heading>
            </Box>
        </Flex>
    );
};

export default Footer;
