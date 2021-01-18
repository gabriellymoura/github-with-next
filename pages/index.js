import { Box, Heading, Flex, Stat, StatLabel, StatNumber, Text, Input, Button, Image, Badge, StarIcon, Center } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'; 
import { useState, useEffect } from 'react';



const Home = () => {
  const [name, setName] = useState(''); //nome
  const [login, setLogin] = useState(''); //user
  const [email, setEmail] = useState(''); //email
  const [avatar, setAvatar] = useState(''); //foto
  const [followers, setFollowers] = useState(''); //seguidores
  const [following, setfollowing] = useState(''); //seguindo
  const [repos, setRepos] = useState(''); //numero de repositorios
  const [userInput, setUserInput] = useState(''); //user

  
  useEffect(() => {
    fetch('https://api.github.com/users/exemple')
      .then(resp => {resp.json().then(data => setData(data))})
      .catch(e=> console.log("aah: "+e.message))
  }, [])



  const setData = ({
    name,
    followers,
    following,
    public_repos,
    login,
    email,
    avatar_url
  }) => {
    setName(name);
    setFollowers(followers);
    setfollowing(following);
    setRepos(public_repos);
    setLogin(login);
    setEmail(email);
    setAvatar(avatar_url);
  };

  const escolheUser = e =>{
    setUserInput(e.target.value);
  };


  const getUser = () =>{
    fetch(`https://api.github.com/users/${userInput}`)
      .then(resp => {resp.json().then(data => setData(data))})
      .catch(e=> console.log("aah: "+e.message))
  }

  return(
    <>
    <Head>
      <title>My Github States wih Next</title>
    </Head>
    <Box mt = {5} >
    <Flex justify = "center">
      <Image boxSize='50px' src= 'https://github.githubassets.com/images/icons/emoji/unicode/1f320.png?v8' />
      
      <Heading as ='h1' textAlign="center" size="2xl" mb={5} > My Github Stats</Heading>

    </Flex>
      
      <Heading textAlign='center' onSubmit={getUser} mb = {5}>
        <Input  id = 'user' type = 'text' width='300px' onChange = {escolheUser}/>
        <Button id = 'userButton'colorScheme="teal" variant="outline" onClick = {getUser} left = {3} color={'black'}>Pronto</Button>
      </Heading>
      <Center>
        <Box maxW="250px" borderWidth="1px" borderRadius="lg" overflow="hidden" mb={5}>
          <Image boxSize='250px' src={avatar} alignContent='center'/>
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="1" colorScheme="teal" fontSize = '10px'>@{login}</Badge>
              <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="10px"  textTransform="uppercase" ml="2">
                {name} &bull; {email}
              </Box>
            </Box>
          </Box>
        </Box>
      </Center>
      <Flex justify = "center">
        <Box w="300px" p={5} ml={8} mb={3} borderWidth='1px' >
          <Stat>
            <StatLabel >
              <Text fontSize = "xl" color ='teal.500'>Followers</Text>
            </StatLabel>
            <StatNumber>{followers}</StatNumber>
          </Stat>
        </Box>
        <Box w="300px" p={5} ml={8} mb={3} borderWidth='1px' roundedlg>
          <Stat>
            <StatLabel>
              <Text fontSize = "xl" color ='teal.500'>Following</Text>
            </StatLabel>
            <StatNumber>{following}</StatNumber>
          </Stat>
        </Box>
        <Box w="300px" p={5} ml={8} mb={3} borderWidth='1px' roundedlg>
          <Stat>
            <StatLabel>
              <Text fontSize = "xl" color ='teal.500'>Repositorios</Text>
            </StatLabel>
            <StatNumber>{repos}</StatNumber>
          </Stat>
        </Box>
      </Flex>
    </Box>
  </>
  )
}
  


export default Home;