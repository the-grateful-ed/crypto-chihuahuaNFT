import React from 'react'
import {
    Link,
    Box,
    Flex,
    Stack,
    HStack,
    Heading,
    Container,
    Icon,
    Text,
    IconButton,
    useDisclosure,
    useColorModeValue
} from '@chakra-ui/react'
import DropDownMenu from './dropDownMenu'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { FaGithub } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const GITHUB_REPO_LINK = 'https://github.com/MA-Ahmad/templateskart'

const menuData = [
    {
        id: 1,
        label: 'ProjectsKart',
        subLabel: 'Responsive Projects',
        href: '#'
    },
    {
        id: 2,
        label: 'ComponentsKart',
        subLabel: 'Responsive Components',
        href: '#'
    }
]

export default function TopNav() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const linkColor = 'cyan.400'

    return (
        <>
            <Box
                as="header"
                bg={useColorModeValue('white', 'gray.800')}
                px={4}
                boxShadow={useColorModeValue(
                    '0 4px 6px rgba(160, 174, 192, 0.6)',
                    '0 4px 6px rgba(9, 17, 28, 0.9)'
                )}
                position="fixed"
                width="100%"
                zIndex="55"
                top="0"
            >
                <Container maxW="1280px" p={{ base: 0, md: 'inherit' }}>
                    <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
                        <HStack spacing={3} alignItems="center">
                            <IconButton
                                size="md"
                                icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                                aria-label="Open Menu"
                                display={{ base: 'inherit', sm: 'none' }}
                                onClick={isOpen ? onClose : onOpen}
                            />
                            <Link href="#">
                                <Heading as="h1" fontSize={['lg', 'md', 'xl', '3xl']} cursor="pointer">
                                    <Flex position="relative">
                                        <Icon
                                            position="relative"
                                            as={GoChevronLeft}
                                            transform="rotate(-15deg)"
                                            w={7}
                                            h={7}
                                            color={linkColor}
                                            top={1}
                                        />
                                        <HStack display={{ base: 'none', sm: 'flex' }} spacing={2}>
                                            <Text textShadow="1px 2px #179c40">
                                                Crypto{' '}
                                                <Box
                                                    as="span"
                                                    position="relative"
                                                    _before={{
                                                        content: '""',
                                                        bg: linkColor,
                                                        position: 'absolute',
                                                        top: '-0.15rem',
                                                        right: '-0.15rem',
                                                        bottom: '-0.15rem',
                                                        left: '-0.15rem',
                                                        transform: 'rotate(-4deg)'
                                                    }}
                                                >
                                                    <Box
                                                        as="span"
                                                        textShadow="1px 2px #179c40"
                                                        color={useColorModeValue('white', 'black')}
                                                        position="relative"
                                                    >
                                                        Chihuahuas NFT
                                                    </Box>
                                                </Box>
                                            </Text>
                                        </HStack>
                                        <Icon
                                            position="relative"
                                            as={GoChevronRight}
                                            transform="rotate(-15deg)"
                                            w={7}
                                            h={7}
                                            color={linkColor}
                                            bottom={1}
                                        />
                                    </Flex>
                                </Heading>
                            </Link>
                            <DropDownMenu menuData={menuData} />
                        </HStack>
                        <HStack spacing={2} alignItems="center">
                            <ConnectButton />
                        </HStack>
                    </Flex>
                </Container>

                {isOpen ? (
                    <Box pb={4} display={{ base: 'inherit', sm: 'none' }}>
                        <Stack as="nav" spacing={1}>
                            {menuData.map((data, index) => (
                                <Link
                                    key={index}
                                    href={data.href}
                                    px={3}
                                    py={1}
                                    lineHeight="inherit"
                                    rounded="md"
                                    _hover={{
                                        textDecoration: 'none',
                                        bg: useColorModeValue('gray.100', 'gray.900')
                                    }}
                                    onClick={() => onClose()}
                                >
                                    {data.label}
                                </Link>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}