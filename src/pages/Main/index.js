import React, { useCallback, useState } from "react";
import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import api from "../../services/api";
import { Container, Form, SubmitButton } from "./styles";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((e) => {
      e.preventDefault();
      // console.log(newRepo);
      async function submit() {
        setLoading(true);
        try {
          const response = await api.get(`repos/${newRepo}`);
          // console.log(response.data);

          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositorios]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton Loading={loading ? 1 : 0}>
            {loading ? (
                <FaSpinner color="#FFF" size={14} />
            ) : (
                <FaPlus color="#FFF" size={14} />
            )}
        </SubmitButton>
      </Form>
    </Container>
  );
}
