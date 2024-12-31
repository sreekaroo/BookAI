import NextLink from 'next/link';

import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';

import BookOverview from './BookOverview';

const books = [
    {
        id: 'book-1',
        title: 'The Shimmering Shining Sea of Adeline',
        author: 'Author One',
        overview: 'This is a book that is about a book about a book. Around the length of a summary'
    },
    {
        id: 'book-2',
        title: 'The Autobiographical Accounts of Frederick Douglass',
        author: 'Author Two',
        overview: 'This is a book that is about a book about a book. Around the length of a summary'
    },
    {
        id: 'book-3',
        title: 'The Mysterious Island',
        author: 'Author Three',
        overview: 'A thrilling adventure on a deserted island.'
    },
    {
        id: 'book-4',
        title: 'Journey to the Center of the Earth',
        author: 'Author Four',
        overview: 'An epic journey to the core of our planet.'
    },
    {
        id: 'book-5',
        title: 'Twenty Thousand Leagues Under the Sea',
        author: 'Author Five',
        overview: 'Exploring the depths of the ocean in a submarine.'
    },
    {
        id: 'book-6',
        title: 'Around the World in Eighty Days',
        author: 'Author Six',
        overview: 'A race against time to travel around the globe.'
    },
    {
        id: 'book-7',
        title: 'The Invisible Man',
        author: 'Author Seven',
        overview: 'A scientist discovers the secret to invisibility.'
    },
    {
        id: 'book-8',
        title: 'The War of the Worlds',
        author: 'Author Eight',
        overview: 'An alien invasion threatens humanity.'
    },
    {
        id: 'book-9',
        title: 'The Time Machine',
        author: 'Author Nine',
        overview: 'A journey through time to the distant future.'
    },
    {
        id: 'book-10',
        title: 'The Island of Doctor Moreau',
        author: 'Author Ten',
        overview: 'A scientist conducts experiments on a remote island.'
    }
];

export default function BooksPage() {
    return (
        <Container maxW='container.xl' p={4}>
            {' '}
            <Heading as='h2' size='lg' mb={4}>
                Our Book Collection
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {books.map((book) => (
                    <BookOverview
                        key={book.id}
                        bookId={book.id}
                        title={book.title}
                        author={book.author}
                        summary={book.overview}
                        imageUrl={`https://picsum.photos/seed/${book.id}/600/800`}
                    />
                ))}
            </SimpleGrid>
        </Container>
    );
}
