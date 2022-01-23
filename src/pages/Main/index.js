import React, { useCallback, useEffect, useState } from "react";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Buscar
  useEffect(() => {
      const repoStorage = localStorage.getItem('repos');
      if (repoStorage) {
          setRepositorios(JSON.parse(repoStorage));
      }
  }, []);

  // Salvar alterações
  useEffect(() => {
      localStorage.setItem(`repos`, JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = useCallback((e) => {
      e.preventDefault();
      // console.log(newRepo);

      async function submit() {
        setLoading(true);
        setAlert(null);
        try {

          if (newRepo === '') {
              throw new Error('Você precisa indicar um repositório!');
          }  

          const response = await api.get(`repos/${newRepo}`);
          // console.log(response.data);

          const hasRepo = repositorios.find(repo => repo.name === newRepo);

          if (hasRepo) {
            throw new Error('Repositório duplicado!');
          }

          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
            setAlert(true);
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
    setAlert(null);
  }

  const handleDelete = useCallback((repo) => {
      const find = repositorios.filter(r => r.name !== repo);
      setRepositorios(find);
  }, [repositorios]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
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

      <List>
          {repositorios.map(repo => (
              <li key={repo.name}>
                  <span>
                      <DeleteButton onClick={() => handleDelete(repo.name)}>
                          <FaTrash size={14} />
                      </DeleteButton>
                      {repo.name}
                  </span>
                  <a href="">
                      <FaBars size={20} />
                  </a>
              </li>
          ))}
      </List>

    </Container>
  );
}
