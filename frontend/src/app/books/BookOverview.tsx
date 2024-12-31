import Link from 'next/link';

import { Box, Card, Flex, Image, Text } from '@chakra-ui/react';

type BookOverviewProps = {
    bookId: string;
    title: string;
    author: string;
    imageUrl: string;
    summary: string;
};

const BookOverview = ({ bookId, title, author, imageUrl, summary }: BookOverviewProps) => {
    return (
        <Link href={`/books/${bookId}`} passHref style={{ textDecoration: 'none' }}>
            <Card.Root
                height='100%'
                borderWidth='2px' // Thicker border
                borderRadius='lg' // Rounded corners
                borderColor='gray.300' // Border color
                overflow='hidden' // Ensure content doesn't overflow
                boxShadow="md" // Add a shadow
            >
                <Flex direction='column' height='100%'>
                    <Box maxH='200px' overflow='hidden'>
                        <Image src={imageUrl} alt={title} objectFit='cover' w='full' h='full' />
                    </Box>
                    <Flex direction='column' p={4} flex={1} bg='gray.100'>
                        <Box flex={1}>
                            <Text fontSize='xl' fontWeight='bold' mb={2} color='gray.800'>
                                {title}
                            </Text>
                            <Text fontSize='md' fontWeight='semibold' color='gray.600' mb={4}>
                                {author}
                            </Text>
                            <Text fontSize='sm' color='gray.700'>
                                {summary}
                            </Text>
                        </Box>
                        <Text fontSize='xs' fontWeight='medium' letterSpacing='tight' color='gray.500' mt={4}>
                            {bookId}
                        </Text>
                    </Flex>
                </Flex>
            </Card.Root>
        </Link>
    );
};

export default BookOverview;
