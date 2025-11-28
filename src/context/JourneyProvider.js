// src/context/JourneyProvider.js
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { storeData, getData } from '../utils/storage';

export const JourneyContext = createContext();

export default function JourneyProvider({ children }) {
  // Estados para cada tipo de dado
  const [cenasRespostas, setCenasRespostas] = useState([]);
  const [videosAssistidos, setVideosAssistidos] = useState([]);
  const [trackingRespostas, setTrackingRespostas] = useState([]);
  const [perguntasRespostas, setPerguntasRespostas] = useState([]);
  const [meditacaoRespostas, setMeditacaoRespostas] = useState([]);
  const [tempoRespiracao, setTempoRespiracao] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]);

  // ============================================================================
  // CARREGAMENTO INICIAL
  // ============================================================================
  
  useEffect(() => {
    async function carregar() {
      const cenas = await getData('cenasRespostas');
      const videos = await getData('videosAssistidos');
      const tracking = await getData('trackingRespostas');
      const perguntas = await getData('perguntasRespostas');
      const meditacao = await getData('meditacaoRespostas');
      const tempo = await getData('tempoRespiracao');
      const missoes = await getData('missoesConcluidas');

      if (cenas) setCenasRespostas(cenas);
      if (videos) setVideosAssistidos(videos);
      if (tracking) setTrackingRespostas(tracking);
      if (perguntas) setPerguntasRespostas(perguntas);
      if (meditacao) setMeditacaoRespostas(meditacao);
      if (tempo) setTempoRespiracao(tempo);
      if (missoes) setMissoesConcluidas(missoes);
    }
    carregar();
  }, []);

  // ============================================================================
  // FUNÇÕES DE SALVAMENTO
  // ============================================================================

  // 1️⃣ CENAS
  const salvarCenasRespostas = useCallback(async (semana, path, respostas) => {
    try {
      const novaEntrada = {
        id: Date.now(),
        semana,
        path,
        timestamp: new Date().toISOString(),
        cenas: respostas
      };

      const updatedData = [...cenasRespostas, novaEntrada];
      setCenasRespostas(updatedData);
      await storeData('cenasRespostas', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar cenas:', error);
      return false;
    }
  }, [cenasRespostas]);

  // 2️⃣ VÍDEOS
  const salvarVideoAssistido = useCallback(async (semana, path, videoData) => {
    try {
      const novaEntrada = {
        id: Date.now(),
        semana,
        path,
        timestamp: new Date().toISOString(),
        ...videoData
      };

      const updatedData = [...videosAssistidos, novaEntrada];
      setVideosAssistidos(updatedData);
      await storeData('videosAssistidos', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar vídeo:', error);
      return false;
    }
  }, [videosAssistidos]);

  // 3️⃣ TRACKING (com sistema de soma)
  const salvarTrackingResposta = useCallback(async (semana, path, resposta) => {
    try {
      const entradaExistente = trackingRespostas.find(
        entry => entry.semana === semana && entry.path === path
      );

      let updatedData;

      if (entradaExistente) {
        updatedData = trackingRespostas.map(entry => {
          if (entry.semana === semana && entry.path === path) {
            return {
              ...entry,
              valorTotal: entry.valorTotal + resposta.valor,
              respostas: [...entry.respostas, {
                timestamp: new Date().toISOString(),
                ...resposta
              }]
            };
          }
          return entry;
        });
      } else {
        const novaEntrada = {
          id: Date.now(),
          semana,
          path,
          valorTotal: resposta.valor,
          respostas: [{
            timestamp: new Date().toISOString(),
            ...resposta
          }]
        };
        updatedData = [...trackingRespostas, novaEntrada];
      }

      setTrackingRespostas(updatedData);
      await storeData('trackingRespostas', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar tracking:', error);
      return false;
    }
  }, [trackingRespostas]);

  // 4️⃣ PERGUNTAS (substitui se mesma semana)
  const salvarPerguntaResposta = useCallback(async (semana, path, resposta) => {
    try {
      const filtrado = perguntasRespostas.filter(
        entry => !(entry.semana === semana && entry.path === path)
      );

      const novaEntrada = {
        id: Date.now(),
        semana,
        path,
        timestamp: new Date().toISOString(),
        ...resposta
      };

      const updatedData = [...filtrado, novaEntrada];
      setPerguntasRespostas(updatedData);
      await storeData('perguntasRespostas', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar pergunta:', error);
      return false;
    }
  }, [perguntasRespostas]);

  // 5️⃣ MEDITAÇÃO
  const salvarMeditacaoRespostas = useCallback(async (semana, path, respostas) => {
    try {
      const novaEntrada = {
        id: Date.now(),
        semana,
        path,
        timestamp: new Date().toISOString(),
        cenas: respostas
      };

      const updatedData = [...meditacaoRespostas, novaEntrada];
      setMeditacaoRespostas(updatedData);
      await storeData('meditacaoRespostas', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar meditação:', error);
      return false;
    }
  }, [meditacaoRespostas]);

  // 6️⃣ TEMPO DE RESPIRAÇÃO
  const salvarTempoRespiracao = useCallback(async (tempo) => {
    try {
      setTempoRespiracao(tempo);
      await storeData('tempoRespiracao', tempo);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar tempo respiração:', error);
      return false;
    }
  }, []);

  // 7️⃣ MISSÕES
  const salvarMissaoConcluida = useCallback(async (semana, path, missaoData) => {
    try {
      const novaEntrada = {
        id: Date.now(),
        semana,
        path,
        timestamp: new Date().toISOString(),
        ...missaoData
      };

      const updatedData = [...missoesConcluidas, novaEntrada];
      setMissoesConcluidas(updatedData);
      await storeData('missoesConcluidas', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar missão:', error);
      return false;
    }
  }, [missoesConcluidas]);

  // ============================================================================
  // FUNÇÕES DE BUSCA
  // ============================================================================

  // 🔍 Buscar cenas de uma semana específica
  const buscarCenasSemana = useCallback((semana, path) => {
    return cenasRespostas.find(
      entry => entry.semana === semana && entry.path === path
    );
  }, [cenasRespostas]);

  // 🔍 Buscar vídeo de uma semana
  const buscarVideoSemana = useCallback((semana, path) => {
    return videosAssistidos.find(
      entry => entry.semana === semana && entry.path === path
    );
  }, [videosAssistidos]);

  // 🔍 Buscar tracking de uma semana
  const buscarTrackingSemana = useCallback((semana, path) => {
    return trackingRespostas.find(
      entry => entry.semana === semana && entry.path === path
    );
  }, [trackingRespostas]);

  // 🔍 Buscar pergunta de uma semana
  const buscarPerguntaSemana = useCallback((semana, path) => {
    return perguntasRespostas.find(
      entry => entry.semana === semana && entry.path === path
    );
  }, [perguntasRespostas]);

  // 🔍 Buscar meditação de uma semana
  const buscarMeditacaoSemana = useCallback((semana, path) => {
    return meditacaoRespostas.find(
      entry => entry.semana === semana && entry.path === path
    );
  }, [meditacaoRespostas]);

  // 🔍 Buscar missão de uma semana
  const buscarMissaoSemana = useCallback((semana, path) => {
    return missoesConcluidas.find(
      entry => entry.semana === semana && entry.path === path
    );
  }, [missoesConcluidas]);

  // 🔍 Verificar se atividade foi concluída
  const verificarAtividadeConcluida = useCallback((tipo, semana, path) => {
    switch (tipo) {
      case 'DESCRICAOCENA':
        return !!buscarCenasSemana(semana, path);
      case 'VIDEOS':
        return !!buscarVideoSemana(semana, path);
      case 'TRACKING':
        return !!buscarTrackingSemana(semana, path);
      case 'PERGUNTAS':
        return !!buscarPerguntaSemana(semana, path);
      case 'MISSAO':
        return !!buscarMissaoSemana(semana, path);
      case 'MEDITACAO':
        return !!buscarMeditacaoSemana(semana, path);
      default:
        return false;
    }
  }, [
    buscarCenasSemana,
    buscarVideoSemana,
    buscarTrackingSemana,
    buscarPerguntaSemana,
    buscarMissaoSemana,
    buscarMeditacaoSemana
  ]);

  // 🔍 Obter progresso geral
  const obterProgressoGeral = useCallback(() => {
    return {
      cenas: cenasRespostas.length,
      videos: videosAssistidos.length,
      tracking: trackingRespostas.length,
      perguntas: perguntasRespostas.length,
      meditacoes: meditacaoRespostas.length,
      missoes: missoesConcluidas.length,
      total: cenasRespostas.length + 
             videosAssistidos.length + 
             trackingRespostas.length + 
             perguntasRespostas.length +
             meditacaoRespostas.length +
             missoesConcluidas.length
    };
  }, [
    cenasRespostas,
    videosAssistidos,
    trackingRespostas,
    perguntasRespostas,
    meditacaoRespostas,
    missoesConcluidas
  ]);

  // ============================================================================
  // FUNÇÕES DE RESET (útil para desenvolvimento)
  // ============================================================================

  const resetarTodosDados = useCallback(async () => {
    try {
      setCenasRespostas([]);
      setVideosAssistidos([]);
      setTrackingRespostas([]);
      setPerguntasRespostas([]);
      setMeditacaoRespostas([]);
      setTempoRespiracao(null);
      setMissoesConcluidas([]);

      await storeData('cenasRespostas', []);
      await storeData('videosAssistidos', []);
      await storeData('trackingRespostas', []);
      await storeData('perguntasRespostas', []);
      await storeData('meditacaoRespostas', []);
      await storeData('tempoRespiracao', null);
      await storeData('missoesConcluidas', []);

      return true;
    } catch (error) {
      console.error('❌ Erro ao resetar dados:', error);
      return false;
    }
  }, []);

  // ============================================================================
  // PROVIDER VALUE
  // ============================================================================

  const value = {
    // 📊 DADOS
    cenasRespostas,
    videosAssistidos,
    trackingRespostas,
    perguntasRespostas,
    meditacaoRespostas,
    tempoRespiracao,
    missoesConcluidas,

    // 💾 SALVAMENTO
    salvarCenasRespostas,
    salvarVideoAssistido,
    salvarTrackingResposta,
    salvarPerguntaResposta,
    salvarMeditacaoRespostas,
    salvarTempoRespiracao,
    salvarMissaoConcluida,

    // 🔍 BUSCA
    buscarCenasSemana,
    buscarVideoSemana,
    buscarTrackingSemana,
    buscarPerguntaSemana,
    buscarMeditacaoSemana,
    buscarMissaoSemana,
    verificarAtividadeConcluida,
    obterProgressoGeral,

    // 🔄 RESET
    resetarTodosDados
  };

  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  );
}

export const useJourney = () => {
  const context = React.useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney deve ser usado dentro de JourneyProvider');
  }
  return context;
};