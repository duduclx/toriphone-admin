import { Flex } from "@chakra-ui/react"

const FormContainer = ({ children, props }) => {
  return (
    <Flex flexDirection="column" gap="4" {...props}>
      {children}
    </Flex>
  )
}

export default FormContainer
