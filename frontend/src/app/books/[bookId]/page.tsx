import { Box, Container, VStack } from '@chakra-ui/react';
import { BookContent } from './BookContent';
import { BookHeader } from './BookHeader';

// Dummy data for the book
const bookData = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    summary: 'A tale of wealth, love, and the American Dream in the Roaring Twenties.',
    content: `
In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought — frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth.

...
    `
};

export default function BookDetails({ params }: { params: { bookId: string } }) {
    const { bookId } = params;

    return (
        <Container maxW='container.xl' py={4} px={4}>
            <Box px={4} py={6} bg="white" borderRadius="lg" boxShadow="md">
                <VStack gap={8} align='stretch'>
                    <BookHeader
                        bookId={bookId}
                        title={bookData.title}
                        author={bookData.author}
                        summary={bookData.summary}
                    />
                    <BookContent content={bookData.content} />
                </VStack>
            </Box>
        </Container>
    );
}

