import { BACKEND_API } from '@/app/config';
import { Box, Container, VStack } from '@chakra-ui/react';

import { Book } from '../_helpers/types';
import { BookContent } from './BookContent';
import { BookHeader } from './BookHeader';

const API_PATH = `${BACKEND_API}/books/{}`;
async function fetchBookData(bookId: string): Promise<Book> {
    // Fetch book data from the API
    const data = await fetch(API_PATH.replace('{}', bookId), { cache: 'force-cache' });
    const jsonData = await data.json();

    if (!jsonData.data.book) {
        return jsonData;
    }

    return jsonData.data.book as Book;
}

export default async function BookDetails({ params }: { params: Promise<{ bookId: string }> }) {
    const { bookId } = await params;
    console.log('Fetching book data for book ID: ', bookId);
    const bookData: Book = await fetchBookData(bookId);

    return (
        <Container maxW='container.xl' py={4} px={4}>
            <Box px={4} py={6} bg='white' borderRadius='lg' boxShadow='md'>
                <VStack gap={8} align='stretch'>
                    <BookHeader bookId={bookId} title={bookData.title} author='None for now' summary='None for now' />
                    <BookContent content={bookData.content} />
                </VStack>
            </Box>
        </Container>
    );
}
