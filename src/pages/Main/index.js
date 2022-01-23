import React from "react";
import {FaGithub, FaPlus} from 'react-icons/fa';
import { Container, Form, SubmitButton } from "./styles";

export default function Main() {
    return (
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus Repositórios
            </h1>

            <Form>
                <input type="text" placeholder="Adicionar Repositórios" />

                <SubmitButton>
                    <FaPlus color="#FFF" size={14} />
                </SubmitButton>
            </Form>

        </Container>
  )
}
