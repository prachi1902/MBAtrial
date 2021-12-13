import { ErrorMessage } from "@hookform/error-message";
import { Text } from "@chakra-ui/react";

const Error = ({ name, errors }) => {
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => (
        <Text fontSize="0.75rem" color="primaryRed" mt="0.5rem">
          {message}
        </Text>
      )}
    />
  );
};

export default Error;
