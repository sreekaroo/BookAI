import Image from 'next/image';
import Link from 'next/link';

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

export default function Page() {
    return <Link href='/books'> Go to books page </Link>;
}
