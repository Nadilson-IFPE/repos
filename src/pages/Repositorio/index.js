import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router";
import api from "../../services/api";
import { Container, Owner, Loading, BackButton } from "./styles";

export default function Repositorio() {
    const { repositorio } = useParams();

    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const nomeRepo = decodeURIComponent(repositorio);

         const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`), 
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                })
            ]);


          //  console.log(repositorioData.data);
          //  console.log(issuesData.data);
          
          setRepository(repositorioData.data);
          setIssues(issuesData.data);
          setLoading(false);

        }

        load();

    }, [repositorio]);

  if (loading) {
      return(
          <Loading>
              <h1>Carregando...</h1>
          </Loading>
      )
  }  

  return (
    <Container>
         <BackButton to="/">
             <FaArrowLeft color="#000" size={30} />
         </BackButton>
         <Owner>
             <img src={repository.owner.avatar_url} 
             alt={repository.owner.login} 
             />

             <h1>{repository.name}</h1>
             <p>{repository.description}</p>
         </Owner>
    </Container>
  );
}
