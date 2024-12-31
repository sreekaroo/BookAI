import { Box, Heading, Image, Text } from '@chakra-ui/react';

type BookHeaderProps = {
    bookId: string;
    title: string;
    author: string;
    summary: string;
};

export function BookHeader({ bookId, title, author, summary }: BookHeaderProps) {
    return (
        <Box display='flex' alignItems='center' gap={8}>
            <Image src={`https://picsum.photos/seed/${bookId}/600/800`} alt={title} boxSize='200px' objectFit='cover' />
            <Box>
                <Heading as='h1' size='2xl' mb={2}>
                    {title}
                </Heading>
                <Text fontSize='xl' fontWeight='bold' mb={2}>
                    by {author}
                </Text>
                <Text fontSize='md' mb={4}>
                    {summary}
                </Text>
                <Text fontSize='sm' color='gray.500'>
                    Book ID: {bookId}
                </Text>
            </Box>
        </Box>
    );
}
