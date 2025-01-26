export async function fetchNoticias() {
  const res = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia');

  if (!res.ok) {
    throw new Error('Erro ao buscar dados da API');
  }

  const data = await res.json();

  if (Array.isArray(data.items) && data.items.length > 0) {    
    const randomIndex = Math.floor(Math.random() * data.items.length);

     return {
      titulo: data.items[randomIndex].titulo,
      descricao: data.items[randomIndex].introducao,
      publicacao: data.items[randomIndex].data_publicacao,
      fonte: data.items[randomIndex].link,
    };
  }

  return null; 
}
