import { Metadata } from 'next';

import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';

export const metadata: Metadata = {
    title: 'Books',
    description: 'Explore a list of book summaries.'
};

const books = [
    { id: 1, title: 'Atomic Habits', summary: 'Build effective habits and break bad ones.' },
    { id: 2, title: 'The Lean Startup', summary: 'Develop startups with lean methodologies.' },
    { id: 3, title: 'Deep Work', summary: 'Focus in a distracted world to achieve success.' }
];

export default function BooksPage() {
    return (
        <Container maxW='container.md' py={8} bg='gray.800' color='white'>
            <Heading mb={6} textAlign='center' color='teal.300'>
                Book Summaries
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {books.map((book) => (
                    <Box
                        key={book.id}
                        p={4}
                        borderWidth={1}
                        borderRadius='md'
                        bg='gray.700'
                        color='white'
                        shadow='sm'
                        _hover={{ shadow: 'md', bg: 'teal.600' }}>
                        <VStack align='start' spacing={2}>
                            <Heading size='md' color='teal.100'>
                                {book.title}
                            </Heading>
                            <Text color='gray.200'>{book.summary}</Text>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
        </Container>
    );
}
