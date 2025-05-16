import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    chakra,
    Box,
    FormControl,
    InputRightElement,
  } from '@chakra-ui/react';

  const Register = ({switchAuthHandler}) => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [ error, setError] = useState('')
    const [success, setSuccess] = useState('')


    const handleShowClick= () => setShowPassword(!showPassword)

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        const response = await register({name: name, surname: surname, userName: userName, email: email, password: password, phone: phone })

        if(response.error){
            setError('Registration failed. Please try again')
        }else{
            setSuccess('Registration successful! You can now login')
            setName(''),
            setSurname(''),
            setUserName(''),
            setEmail(''),
            setPassword(''),
            setPhone('')

            switchAuthHandler()

        }
    }
    return (
        <Flex
          className={`login-container ${theme}`}
          flexDirection="column"
          width="100wh"
          height="100vh"
          backgroundColor={theme === 'dark' ? 'gray.800' : 'gray.200'}
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={4} p="2rem" backgroundColor={theme === 'dark' ? 'gray.700' : 'whiteAlpha.900'} boxShadow="md">
            <Heading color={theme === 'dark' ? 'teal.300' : 'teal.400'}>Register</Heading>
            {error && <Box color="red.500">{error}</Box>}
            {success && <Box color="green.500">{success}</Box>}
            <form onSubmit={handleRegister}>
              <Flex flexDirection="row" gap={4}>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>
              </Flex>
              <Flex flexDirection="row" gap={4} mt={4}>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>
              </Flex>
              <Flex flexDirection="row" gap={4} mt={4}>
                <FormControl>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick} variant="unstyled" display="flex" alignItems="center" justifyContent="center">
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Flex>
              <Button type="submit" colorScheme="teal" width="full" mt={4}>
                Register
              </Button>
            </form>
            <Box>
              Already have an account?{' '}
              <Button variant="link" colorScheme="teal" onClick={switchAuthHandler}>
                Login
              </Button>
            </Box>
          </Stack>
        </Flex>
      );
  }

  export default Register