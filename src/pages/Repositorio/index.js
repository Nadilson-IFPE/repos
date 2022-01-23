import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../services/api";
import { Container } from "../Main/styles";

export default function Repositorio() {
    const { repositorio } = useParams();

    const [repository, setRepository] = useState({});
    const [issues, setissues] = useState([]);
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
          setissues(issues.data);
          setLoading(false);

        }

        load();

    }, []);

  return (
    <Container>
         
    </Container>
  );
}
