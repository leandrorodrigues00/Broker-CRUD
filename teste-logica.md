# 1º Cenário: Enviar o tipo de imóvel e toda a string após "em" da URL para comparar no banco de dados, concatenando o endereço das tabelas do banco.

No primeiro cenário, eu extraio do link o tipo de imóvel e o endereço utilizando expressões regulares (regex) e o método split do JavaScript. Dessa forma, capturamos as informações do link que estão entre '-com-' e a primeira '/' para o tipo de imóvel, e tudo após 'em-' até a última '/' para o endereço.

Em JavaScript, para extrair o tipo de imóvel, utilizamos uma expressão regular como esta: `const tipoRegex = /\/([^\/]+)\-com\-/;`. Para obter o endereço completo, podemos utilizar: `const enderecoSplit = link.split("em-")[1].split("/")[0].replaceAll("-", " ");`.

Isso nos fornece tipos de imóveis como apartamento, casa, sala comercial, entre outros, e endereços completos como 'Vila Andrade São Paulo', 'Jardim das Flores São Paulo', 'Santo Cristo Rio de Janeiro', 'Osvaldo Cruz São Caetano do Sul', 'Centro São Caetano do Sul', todos com espaços.

Para utilizar essa solução na busca por imóveis similares no banco de dados, enviamos o tipo de imóvel e o endereço completo (bairro e cidade juntos em uma única string) para o nosso backend. Lá, a pesquisa é realizada utilizando o método concat no banco de dados. Em nosso banco, por exemplo, possuímos tabelas para tipos de imóveis, bairros, cidades e uma tabela de imóveis, armazenando os detalhes específicos de cada propriedade. Podemos usar o concat para combinar essas duas tabelas em uma única string. Dessa forma, podemos comparar os dados enviados pelo frontend, onde também enviamos o endereço como uma única string, por exemplo: `SELECT ti.nome_tipo AS tipo_imovel, CONCAT(b.nome_bairro, ' ', c.nome_cidade) AS endereco`.

# 2º Cenário: Utilização da Coluna Endereço no Banco de Dados

Neste segundo cenário, optamos por armazenar o endereço completo (bairro e cidade) em uma única coluna no banco de dados, em vez de concatenar dados durante a consulta. Essa abordagem simplifica a busca por imóveis similares utilizando diretamente a slug do endereço.

Seguimos procedimentos semelhantes ao primeiro cenário: no frontend, extraímos a parte relevante da URL que contém a slug "em-bairro-cidade" após "em", além do tipo de imóvel antes de "-com". Essa slug é enviada ao backend como parte da requisição para buscar anúncios similares. No backend, realizamos uma consulta direta na tabela de imóveis, filtrando pela coluna endereco, que contém o bairro e a cidade em um único registro, e pela coluna tipo_imovel, que especifica o tipo de imóvel. Essa consulta é eficiente e direta, buscando até três anúncios na tabela imoveis que correspondam ao endereço e tipo de imóvel fornecidos. A resposta é então enviada de volta ao frontend como um array de objetos de anúncios.
