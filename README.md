# Projeto REPOS (NextJS)

TO-DO

### Obs.: No commit "Página detalhes" foi realizado um downgrade no react-router-dom versão 6 para a versão 5.x. A versão 6.x tem problemas com match e a página index.js da pasta Repositorio não renderiza mais com o seguinte código:

### export default function Repositorio({match}) {
###     return(
###         <h1 style={{color: '#FFF'}}>
###             {decodeURIComponent(match.params.repositorio)}
###         </h1>
###     )
### }

### Após o downgrade, o código de rotas.js foi alterado de:

###  export default function Rotas() {
###   return (
###     <BrowserRouter>
###         <Routes>
###           <Route exact path="/" element={<Main />} />
###          <Route exact path="/repositorio/:repositorio" element={<Repositorio />} />
###         </Routes>
###     </BrowserRouter>
###   );


### para:

### export default function Rotas() {
###   return (
###     <BrowserRouter>
###         <Switch>
###           <Route exact path="/" component={Main} />
###           <Route exact path="/repositorio/:repositorio" component={Repositorio} />
###         </Switch>
###     </BrowserRouter>
###   );
### }

### e a página voltou a ser renderizada como esperado.



