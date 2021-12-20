import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  FormContainer1,
  Input,
  MutedLink,
  SubmitButton,
} from "./commonStyles";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export const SignupForm = () => {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer1>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer1>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Register</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account ? 
        <BoldLink href="#" onClick={switchToSignin}>
          Login
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}