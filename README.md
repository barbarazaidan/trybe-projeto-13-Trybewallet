# Projeto Trybewallet
## Este repositório contém o desenvolvimento do meu 13º projeto na Trybe

Este projeto teve como objetivo criar uma carteira de transações financeiras usando React e Redux. Também realizei a construção de alguns teste unitários. 

## Detalhes do projeto

Confira os requisitos exigidos pela Trybe (texto extraído dos readme oficial da Trybe):

**1. Crie uma página inicial de login com os seguintes campos e características**

<details><summary>Detalhes</summary>
<p>
> Crie uma página para que a pessoa usuária se identifique, com email e senha. Esta página deve ser a página inicial de seu aplicativo.
  
> A rota para esta página deve ser /.

> Você deve criar um local para que a pessoa usuária insira seu e-mail e senha.

> Crie um botão com o texto Entrar.

</p>
</details>

**2. Crie um header para a página de carteira contendo as seguintes características**

<details><summary>Detalhes</summary>
<p>

> Crie uma página para gerenciar a carteira de gastos em diversas moedas e que traga a despesa total em real que é representado pelo código 'BRL'. Esta página deve ser renderizada por um componente chamado Wallet. 

> A rota para esta página deve ser /carteira.

> Um elemento que exiba o e-mail da pessoa usuária que fez login.

> Um elemento com a despesa total gerada pela lista de gastos.

> Um elemento que mostre qual câmbio está sendo utilizado, que neste caso será 'BRL'.

</p>
</details>

**3. Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:**

<details><summary>Detalhes</summary>
<p>

> O componente WalletForm deve ser renderizado dentro do componente Wallet.

> Um campo para adicionar valor da despesa.

> Um campo para adicionar a descrição da despesa.

> Um campo para selecionar em qual moeda será registrada a despesa.

> Um campo para adicionar qual método de pagamento será utilizado.

> Um campo para selecionar uma categoria (tag) para a despesa.

</p>
</details>

**4.  Salve todas as informações do formulário no estado global**

<details><summary>Detalhes</summary>
<p>

> Crie um botão com o texto 'Adicionar despesa'. Ele servirá para salvar as informações da despesa no estado global e atualizar a soma de despesas no header.

> Desenvolva a funcionalidade do botão "Adicionar despesa".

</p>
</details>

**5. Desenvolva testes para atingir 60% de cobertura total da aplicação**

**6. Desenvolva uma tabela com os gastos contendo as seguintes características:**

<details><summary>Detalhes</summary>
<p>

> O componente Table deve ser renderizado dentro do componente Wallet.

> A tabela deve possuir um cabeçalho com os seguintes valores: Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido, Moeda de conversão, Editar/Excluir.

</p>
</details>

**7. Implemente a lógica para que a tabela seja alimentada pelo estado da aplicação**

<details><summary>Detalhes</summary>
<p>

> A tabela deve ser alimentada pelo estado da aplicação, que estará disponível na chave expenses que vem do reducer wallet.

</p>
</details>

**8. Crie um botão para deletar uma despesa da tabela contendo as seguintes características:**

<details><summary>Detalhes</summary>
<p>

> O botão deve ser o último item da linha da tabela e deve possuir o atributo data-testid="delete-btn".

> Após o botão ser clicado, as seguintes ações deverão ocorrer:

  * A despesa deverá ser deletada do estado global
  * A despesa deixará de ser exibida na tabela
  * O valor total exibido no header será alterado.

</p>
</details>

**9. Crie um botão para editar uma despesa da tabela contendo as seguintes características:**

<details><summary>Detalhes</summary>
<p>

> O botão deve estar dentro do último item da linha da tabela e deve possuir data-testid="edit-btn".

> Ao ser clicado, o botão habilita um formulário para editar a linha da tabela. Ao clicar em "Editar despesa" ela é atualizada, alterando o estado global.


</p>
</details>

**10. Desenvolva testes para atingir 90% de cobertura total da aplicação**

## Sobre o curso da Trybe
O programa total de estudo conta com mais de 1.500 horas de aulas presenciais e online,divididas ao longo de 12 meses. O conteúdo aborda introdução ao desenvolvimento de software, front-end, back-end, ciência da computação, engenharia de software, metodologias ágeis e habilidades comportamentais.

