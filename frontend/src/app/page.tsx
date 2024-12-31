import Image from 'next/image';

import {
    Box,
    Button,
    Checkbox,
    ClientOnly,
    HStack,
    Heading,
    Progress,
    RadioGroup,
    Skeleton,
    VStack
} from '@chakra-ui/react';
import Link from 'next/link';

export default async function Page() {
    return (
        <Link href="/books"> Go to books page </Link>
    );
}
