import * as React from 'react'
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Image,
  Skeleton,
  Box,
  Link,
  Icon
} from '@chakra-ui/react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { GoChevronRight } from 'react-icons/go'
import { MdBolt } from 'react-icons/md'
import contractInterface from '../contract-abi.json'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { UseContractConfig } from 'wagmi/dist/declarations/src/hooks/contracts/useContract'

const contractConfig: UseContractConfig = {
  addressOrName: '0xfabe8c2F8e11f25e0fCAD2f75475708c3dbFff2e',
  contractInterface: contractInterface,
}

const HeroSection = () => {
  const {isConnected} = useAccount()
  const { address } = useAccount();
  const { data: tokenURI } = useContractRead({
    ...contractConfig,
    functionName: 'commonTokenURI',
  })
  const { data: mintCost } = useContractRead({
    ...contractConfig,
    functionName: 'mintCost',
  });
  const { config } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'mint',
    args: [address, { value: mintCost?.toString() }],
  });
  

  const {write: mint, isSuccess} = useContractWrite(config)

  return (
    <Container maxW="6xl" px={{ base: 6, md: 3 }} py={24}>
      <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center">
        <Stack direction="column" spacing={6} justifyContent="center" maxW="480px">
          <HStack
            as={Link}
            p={1}
            rounded="full"
            fontSize="sm"
            w="max-content"
            bg={useColorModeValue('gray.300', 'gray.700')}
          >
            <ConnectButton />
            <Box
              py={1}
              px={2}
              lineHeight={1}
              rounded="full"
              color="white"
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
            >
              What's new
            </Box>
            <HStack spacing={1} alignItems="center" justifyContent="center">
              <Text lineHeight={1}>See our recent updates</Text>
              <Icon as={GoChevronRight} w={4} h={4} />
            </HStack>
          </HStack>
          <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
            Build products faster <br />
            <chakra.span color="teal">in ChakraUI</chakra.span>
          </chakra.h1>
          <Text
            fontSize="1.2rem"
            textAlign="left"
            lineHeight="1.375"
            fontWeight="400"
            color="gray.500"
          >
            TemplatesKart provides the best ChakraUI templates. Focus on your business, not on the
            boilerplate.
          </Text>
          <HStack
            spacing={{ base: 0, sm: 2 }}
            mb={{ base: '3rem !important', sm: 0 }}
            flexWrap="wrap"
          >
            {/* {isConnected && ( 
            <chakra.button
              w={{ base: '100%', sm: 'auto' }}
              h={12}
              px={6}
              color="white"
              size="lg"
              rounded="md"
              mb={{ base: 2, sm: 0 }}
              zIndex={5}
              lineHeight={1}
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              _hover={{ bgGradient: 'linear(to-l, #0ea5e9,#2563eb)', opacity: 0.9 }}
              onClick={() => mint?.()}
            >
              <chakra.span> Explore ComponentsKart </chakra.span>
              <Icon as={MdBolt} h={4} w={4} ml={1} />
            </chakra.button>
            )} */}
            <Button onClick={() => mint?.()}>Mint</Button>
          </HStack>
        </Stack>
        <Box ml={{ base: 0, md: 5 }} pos="relative">
          <DottedBox />
          <Image
            w="100%"
            h="100%"
            minW={{ base: 'auto', md: '30rem' }}
            objectFit="cover"
            src={`hero.gif`}
            rounded="md"
            fallback={<Skeleton />}
          />
        </Box>
      </Stack>
    </Container>
  )
}

function DottedBox() {
  return (
    <Box position="absolute" left="-45px" top="-30px" height="full" maxW="700px" zIndex={-1}>
      <svg
        color={useColorModeValue('rgba(55,65,81, 0.1)', 'rgba(55,65,81, 0.7)')}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
      </svg>
    </Box>
  )
}

export default HeroSection