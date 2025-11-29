import { Box, Heading } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';


type BookContentProps = {
    content: string;
};

export function BookContent({ content }: BookContentProps) {
    return (
        <Box>
            <Heading as='h2' size='lg' mb={4}>
                Book Content
            </Heading>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </Box>
    );
}
