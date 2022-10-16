import {
  Box, Button, chakra,
  Container, HStack, Icon, Image, Link, Stack, Text,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { GoChevronRight } from 'react-icons/go'
import { BeatLoader } from 'react-spinners'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard'
import contractInterface from '../contract-abi.json'



const HeroSection = () => {

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const [totalMinted, setTotalMinted] = React.useState(0)
  const { isConnected } = useAccount()
  const { address } = useAccount()




  const { data: mintCost } = useContractRead({
    addressOrName: '0x3E7df40D3C6B6f464DEf35024d3dF1d0d71Ffd51',
    contractInterface: contractInterface,
    functionName: 'mintCost',
  })

  const { config } = usePrepareContractWrite({
    addressOrName: '0x3E7df40D3C6B6f464DEf35024d3dF1d0d71Ffd51',
    contractInterface: contractInterface,
    functionName: 'mint',
    args: [address, { value: mintCost?.toString() }],
  })

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(config)



  const { data: totalSupplyData } = useContractRead({
    ...config,
    functionName: 'totalSupply',
    watch: true,
  })

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber())
    }
  }, [totalSupplyData])

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const isMinted = txSuccess

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
            <Box
              py={1}
              px={2}
              lineHeight={1}
              rounded="full"
              color="white"
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
            >
              Whats new
            </Box>
            <HStack spacing={1} alignItems="center" justifyContent="center">
              <Text lineHeight={1}>See our recent updates</Text>
              <Icon as={GoChevronRight} w={4} h={4} />
            </HStack>
          </HStack>
          <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
            Crypto Chihuahuas<br />
            <chakra.span color="teal"> &#8212; a generative art NFT</chakra.span>
          </chakra.h1>
          <Text
            fontSize="1.2rem"
            textAlign="left"
            lineHeight="1.375"
            fontWeight="400"
            color="gray.500"
          >

          </Text>

            {mounted && isConnected && !isMinted && (
              <Button
                style={{ marginTop: 24 }}
                disabled={!mint || isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() => mint?.()}
              >
              {isMintLoading && <Button
                w="100%"
                isLoading
                colorScheme='red'
                spinner={<BeatLoader size={8} color='white' />}
              >
                Click me
              </Button>}
              {isMintStarted && <Button
                w="100%"
                isLoading
                loadingText='Minting'
                colorScheme='green'
                variant='solid'
              >
                Submit
              </Button>}
              {!isMintLoading && !isMintStarted && <Button
                w="100%"
                size="lg" colorScheme='blue'
                rounded="md" onClick={() => mint?.()}>
                Mint
              </Button>}
              </Button>
            )}
       
        </Stack>
        <Box ml={{ base: 0, md: 5 }} pos="relative">
          <DottedBox />
          {/* <Image
            w="100%"
            h="100%"
            minW={{ base: 'auto', md: '30rem' }}
            objectFit="cover"
            src={`hero.gif`}
            rounded="md"
            fallback={<Skeleton />}
          /> */}
          <FlipCard>
            <FrontCard isCardFlipped={isMinted}>
              <Image
                layout="responsive"
                src="hero.gif"
                width="100%"
                height="100%"
                alt="RainbowKit Demo NFT"
              />
            </FrontCard>
           
            <BackCard isCardFlipped={isMinted}>
              <div style={{ padding: 24 }}>
                <Image
                  src="/nft.png"
                  width="100%"
                  height="100%"
                  alt="RainbowKit Demo NFT"
                  style={{ borderRadius: 8 }}
                />
                <h2 style={{ marginTop: 24, marginBottom: 6 }}>NFT Minted!</h2>
                <p style={{ marginBottom: 24 }}>
                  Your NFT will show up in your wallet in the next few minutes.
                </p>
                <p style={{ marginBottom: 6 }}>
                  View on{' '}
                  <a href={`https://rinkeby.etherscan.io/tx/${mintData?.hash}`}>
                    Etherscan
                  </a>
                </p>
                <p>
                  View on{' '}
                  <a
                    href={`https://testnets.opensea.io/assets/rinkeby/${txData?.to}/1`}
                  >
                    Opensea
                  </a>
                </p>
              </div>
            </BackCard>
          </FlipCard>
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