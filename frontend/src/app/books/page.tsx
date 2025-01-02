import { GetServerSideProps } from 'next';
import NextLink from 'next/link';



import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';

import { BACKEND_API } from '../config';
import BookOverview from './BookOverview';
import { Book } from './_helpers/types';

const API_PATH = `${BACKEND_API}/books`;
export const dynamic = 'force-dynamic';

async function fetchBooks(): Promise<Book[]> {
    const data = await fetch(API_PATH, {
        cache: 'force-cache'
    });
    const jsonData = await data.json();

    if (!jsonData) {
        return [];
    }

    console.log('Fetched books: ', jsonData.data.books.length);

    return jsonData.data.books as Book[];
}

export default async function BooksPage() {
    const books: Book[] = await fetchBooks();

    return (
        <Container maxW='container.xl' p={4}>
            {' '}
            <Heading as='h2' size='lg' mb={4}>
                Our Book Collection
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {books.map((book) => (
                    <BookOverview
                        key={book.book_key}
                        bookId={book.book_key}
                        title={book.title}
                        author={'None for now'}
                        summary={'None for now'}
                        imageUrl={`https://picsum.photos/seed/${book.book_key}/600/800`}
                    />
                ))}
            </SimpleGrid>
        </Container>
    );
}