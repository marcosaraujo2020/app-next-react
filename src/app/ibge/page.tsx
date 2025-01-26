"use client";

import { useState, useEffect } from "react";
import { fetchNoticias } from "@/service/noticas";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import AtualizarNoticiasButton from "@/components/atualizar.noticias.btn";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


interface Noticia {
  titulo: string;
  descricao: string;
  publicacao: string;
  fonte: string;
}


export default function IbgePage() {
  const [data, setData] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState<string | null>(null);

  const updateNoticias = async () => {
    try {
      setLoading(true);
      const newData = await fetchNoticias();
      setData(newData);
      setError(null);  // Limpa qualquer erro anterior
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Erro ao carregar notícias.");
      setData(null);
    } finally {
      setLoading(false);
    } 
  };


  useEffect(() => {
    updateNoticias();
  }, []);


  return (
    
    <Container maxWidth="lg">
      
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href="/">
          <HomeRoundedIcon color="primary" fontSize="large"></HomeRoundedIcon>
        </Link>
        
        {loading ? (
          <Typography variant="body1">Carregando notícias...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : data ? (
          <Card sx={{ maxWidth: 600, mt: 4, mb: 2}}>
            
            <CardMedia component="img" alt="logo ibge" image="/ibge-logo.png" />

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {data.titulo}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {data.descricao}
              </Typography>
              <Typography variant="overline" sx={{ color: 'text.primary' }}>
                {data.publicacao}
              </Typography>
            </CardContent>
            
            <CardActions>
              <Link href={data.fonte} target="_blank" variant="overline" >
                Fonte da notícia 
              </Link>
            </CardActions>
          </Card>
          ): (
            <Typography variant="h6" color="error">
              Não foi possível carregar as notícias. Tente novamente mais tarde.
            </Typography>
          )}
         
        <AtualizarNoticiasButton onUpdate={updateNoticias} />
      </Box>
    </Container>
  );
}
