import { fetchNoticias } from "../service/noticas";

export default async function IbgePage() {
  let data;

  try {
    data = await fetchNoticias();
  } catch (error) {
    console.error("Erro ao carregar as notícias:", error);
    data = null;
  }

  return (
    <div>
      <h1>NOTÍCIAS DO IBGE</h1>
      {data ? (
        <>
          <h2>{data.titulo}</h2>
          <p>{data.descricao}</p>
          <p>{data.publicacao}</p>
          <p>{data.fonte}</p>
        </>
      ) : (
        <p>Nenhuma notícia disponível.</p>
      )}
    </div>
  );
}
