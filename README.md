# Projeto REPOS (NextJS)

TO-DO

### Obs.: No commit "Página com detalhes dos repositórios" foi realizado um downgrade no react-router-dom versão 6 para a versão 5.x. A versão 6.x tem problemas com match e a página index.js da pasta Repositorio não renderiza mais com o seguinte código:

```jsx
export default function Repositorio({match}) {
    return(
        <h1 style={{color: '#FFF'}}>
            {decodeURIComponent(match.params.repositorio)}
        </h1>
    )
}
```

### Após o downgrade, o código de rotas.js foi alterado de:

```jsx
 export default function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/repositorio/:repositorio" element={<Repositorio />} />
        </Routes>
    </BrowserRouter>
  );
```

### para:

```jsx
export default function Rotas() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/repositorio/:repositorio" component={Repositorio} />
        </Switch>
    </BrowserRouter>
  );
}
```

### e a página voltou a ser renderizada como esperado.


### Outra solução, caso não seja desejado um downgrade no react-router-dom, seria manter o código de rotas.js como: 

```jsx
export default function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/repositorio/:repositorio" element={<Repositorio />} />
        </Routes>
    </BrowserRouter>
  );
```

### e alterar o código do index.js na pasta Repositorio para:

```jsx
export default function Repositorio() {
  const { repositorio } = useParams();
  return (
    <>
      <h1 style={{ color: "#FFF" }}>Repositórios</h1>
      <span style={{ color: "#FFF" }}>{decodeURIComponent(repositorio)}</span>
    </>
  );
}
```
