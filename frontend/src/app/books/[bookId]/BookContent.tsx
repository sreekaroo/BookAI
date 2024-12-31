import { Box, Heading, Text } from '@chakra-ui/react';

type BookContentProps = {
    content: string;
};

export function BookContent({ content }: BookContentProps) {
    return (
        <Box>
            <Heading as='h2' size='lg' mb={4}>
                Book Content
            </Heading>
            <Text whiteSpace='pre-line'>{content}</Text>
        </Box>
    );
}
