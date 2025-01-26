import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";


interface AtualizarNoticiasBtnProps {
  onUpdate:() => void;
}

export default function AtualizarNoticiasButton({ onUpdate }: AtualizarNoticiasBtnProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      onUpdate();
    } catch (error) {
      console.error("Erro ao carregar as notícias:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
    >
      {loading ? "Atualizando..." : "Atualizar Notícias"}
    </Button>
  );
}
