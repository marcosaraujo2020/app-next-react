"use client";

import { useState } from "react";
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

interface Noticia {
  titulo: string;
  descricao: string;
  publicacao: string;
  fonte: string;
}


export default function IbgePage() {
  const [data, setData] = useState<Noticia | null>(null);

  const updateNoticias = async () => {
    const newData = await fetchNoticias();
    setData(newData); 
  };

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

        {data ? (
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
