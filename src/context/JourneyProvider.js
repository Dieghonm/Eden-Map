// src/context/JourneyProvider.js - TRACKING CORRIGIDO
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { storeData, getData } from '../utils/storage';

export const JourneyContext = createContext();

export default function JourneyProvider({ children }) {
  // ✅ Estados organizados por tipo
  const [cenasRespostas, setCenasRespostas] = useState([]);
  const [videosAssistidos, setVideosAssistidos] = useState([]);
  const [trackingRespostas, setTrackingRespostas] = useState({ feliz: 0, neutro: 0, triste: 0 }); // ✅ FORMATO CORRETO
  const [perguntasRespostas, setPerguntasRespostas] = useState([]);
  const [meditacaoRespostas, setMeditacaoRespostas] = useState([]);
  const [tempoRespiracao, setTempoRespiracao] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]);
  const [configRespiracao, setConfigRespiracao] = useState({ ativado: false, tempo: null });

  // ============================================================================
  // CARREGAMENTO INICIAL
  // ============================================================================
  useEffect(() => {
    async function carregar() {
      try {
        const [
          cenas,
          videos,
          tracking,
          perguntas,
          meditacao,
          tempo,
          missoes,
          config
        ] = await Promise.all([
          getData('cenasRespostas'),
          getData('videosAssistidos'),
          getData('trackingRespostas'),
          getData('perguntasRespostas'),
          getData('meditacaoRespostas'),
          getData('tempoRespiracao'),
          getData('missoesConcluidas'),
          getData('configRespiracao')
        ]);

        if (cenas) setCenasRespostas(cenas);
        if (videos) setVideosAssistidos(videos);
        if (tracking) setTrackingRespostas(tracking);
        if (perguntas) setPerguntasRespostas(perguntas);
        if (meditacao) setMeditacaoRespostas(meditacao);
        if (tempo !== undefined && tempo !== null) setTempoRespiracao(tempo);
        if (missoes) setMissoesConcluidas(missoes);
        if (config) setConfigRespiracao(config);
      } catch (error) {
        console.error('❌ Erro ao carregar dados iniciais:', error);
      }
    }
    carregar();
  }, []);

  // ============================================================================
  // ✅ TRACKING - SISTEMA DE SOMA ACUMULADA
  // ============================================================================
  const salvarTrackingResposta = useCallback(async (tipo) => {
    try {
      const atual = { ...trackingRespostas };

      atual[tipo] = (atual[tipo] || 0) + 1;

      setTrackingRespostas(atual);

      await storeData('trackingRespostas', atual);

      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar tracking:', error);
      return false;
    }
  }, [trackingRespostas]);

  // ============================================================================
  // OUTRAS FUNÇÕES (mantidas igual)
  // ============================================================================
  const salvarCenasRespostas = useCallback(async (semana, path, respostas) => {
    try {
      const updatedData = [...cenasRespostas];
      const index = semana - 1;
      while (updatedData.length <= index) {
        updatedData.push(null);
      }
      updatedData[index] = {
        semana,
        path,
        timestamp: new Date().toISOString(),
        cenas: respostas
      };

      setCenasRespostas(updatedData);
      await storeData('cenasRespostas', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar cenas:', error);
      return false;
    }
  }, [cenasRespostas]);

  const salvarVideoAssistido = useCallback(async (semana, path, videoData) => {
    try {
      const updatedData = [...videosAssistidos];
      const index = semana - 1;
      
      while (updatedData.length <= index) {
        updatedData.push(null);
      }
      
      updatedData[index] = {
        semana,
        path,
        timestamp: new Date().toISOString(),
        ...videoData
      };

      setVideosAssistidos(updatedData);
      await storeData('videosAssistidos', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar vídeo:', error);
      return false;
    }
  }, [videosAssistidos]);

  const salvarPerguntaResposta = useCallback(async (semana, path, resposta) => {
    try {
      const updatedData = [...perguntasRespostas];
      const index = semana - 1;

      while (updatedData.length <= index) {
        updatedData.push(null);
      }

      updatedData[index] = {
        semana,
        path,
        timestamp: new Date().toISOString(),
        resposta
      };

      setPerguntasRespostas(updatedData);
      await storeData('perguntasRespostas', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar pergunta:', error);
      return false;
    }
  }, [perguntasRespostas]);

  const salvarMeditacaoRespostas = useCallback(async (semana, path, respostas) => {
    try {
      const updatedData = [...meditacaoRespostas];
      const index = semana - 1;
      
      while (updatedData.length <= index) {
        updatedData.push(null);
      }
      
      updatedData[index] = {
        semana,
        path,
        timestamp: new Date().toISOString(),
        cenas: respostas
      };

      setMeditacaoRespostas(updatedData);
      await storeData('meditacaoRespostas', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar meditação:', error);
      return false;
    }
  }, [meditacaoRespostas]);

  const salvarMissaoConcluida = useCallback(async (semana, path, missaoData) => {
    try {
      const updatedData = [...missoesConcluidas];
      const index = semana - 1;
      
      while (updatedData.length <= index) {
        updatedData.push(null);
      }
      
      updatedData[index] = {
        semana,
        path,
        timestamp: new Date().toISOString(),
        ...missaoData
      };

      setMissoesConcluidas(updatedData);
      await storeData('missoesConcluidas', updatedData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar missão:', error);
      return false;
    }
  }, [missoesConcluidas]);

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

  const salvarConfigRespiracao = useCallback(async (config) => {
    try {
      setConfigRespiracao(config || { ativado: false, tempo: null });
      if (config && config.tempo) {
        setTempoRespiracao(config.tempo);
      } else if (!config || !config.tempo) {
        setTempoRespiracao(null);
      }

      await storeData('configRespiracao', config);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar config respiração:', error);
      return false;
    }
  }, []);

  const buscarConfigRespiracao = useCallback(async () => {
    try {
      const config = await getData('configRespiracao');
      return config || { ativado: false, tempo: null };
    } catch (error) {
      console.error('❌ Erro ao buscar config respiração:', error);
      return { ativado: false, tempo: null };
    }
  }, []);

  // ============================================================================
  // 🔍 FUNÇÕES DE BUSCA
  // ============================================================================
  const buscarCenasSemana = useCallback((semana, path) => {
    const index = semana - 1;
    const cena = cenasRespostas[index];
    return (cena && cena.path === path) ? cena : null;
  }, [cenasRespostas]);

  const buscarVideoSemana = useCallback((semana, path) => {
    const index = semana - 1;
    const video = videosAssistidos[index];
    return (video && video.path === path) ? video : null;
  }, [videosAssistidos]);

  const buscarPerguntaSemana = useCallback((semana, path) => {
    const index = semana - 1;
    const pergunta = perguntasRespostas[index];
    return (pergunta && pergunta.path === path) ? pergunta : null;
  }, [perguntasRespostas]);

  const buscarMeditacaoSemana = useCallback((semana, path) => {
    const index = semana - 1;
    const meditacao = meditacaoRespostas[index];
    return (meditacao && meditacao.path === path) ? meditacao : null;
  }, [meditacaoRespostas]);

  const buscarMissaoSemana = useCallback((semana, path) => {
    const index = semana - 1;
    const missao = missoesConcluidas[index];
    return (missao && missao.path === path) ? missao : null;
  }, [missoesConcluidas]);

  const buscarTrackingRespostas = useCallback(() => {
    return trackingRespostas;
  }, [trackingRespostas]);

  // ============================================================================
  // 📊 VERIFICAÇÃO DE ATIVIDADES
  // ============================================================================
  const verificarAtividadeConcluida = useCallback((tipo, semana, path) => {
    switch (tipo) {
      case 'DESCRICAOCENA':
        return !!buscarCenasSemana(semana, path);
      case 'VIDEOS':
        return !!buscarVideoSemana(semana, path);
      case 'TRACKING':
        return Object.values(trackingRespostas).some(v => v > 0);
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
    buscarPerguntaSemana,
    buscarMissaoSemana,
    buscarMeditacaoSemana,
    trackingRespostas
  ]);

  // ============================================================================
  // 📈 PROGRESSO GERAL
  // ============================================================================
  const obterProgressoGeral = useCallback(() => {
    const contarNaoNulos = (arr) => arr.filter(item => item !== null).length;
    const trackingTotal = Object.values(trackingRespostas).reduce((a, b) => a + b, 0);
    
    return {
      cenas: contarNaoNulos(cenasRespostas),
      videos: contarNaoNulos(videosAssistidos),
      tracking: trackingTotal,
      perguntas: contarNaoNulos(perguntasRespostas),
      meditacoes: contarNaoNulos(meditacaoRespostas),
      missoes: contarNaoNulos(missoesConcluidas),
      total: contarNaoNulos(cenasRespostas) + 
             contarNaoNulos(videosAssistidos) + 
             (trackingTotal > 0 ? 1 : 0) + 
             contarNaoNulos(perguntasRespostas) +
             contarNaoNulos(meditacaoRespostas) +
             contarNaoNulos(missoesConcluidas)
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
  // 🔄 RESET
  // ============================================================================
  const resetarTodosDados = useCallback(async () => {
    try {
      setCenasRespostas([]);
      setVideosAssistidos([]);
      setTrackingRespostas({ feliz: 0, neutro: 0, triste: 0 });
      setPerguntasRespostas([]);
      setMeditacaoRespostas([]);
      setTempoRespiracao(null);
      setMissoesConcluidas([]);
      setConfigRespiracao({ ativado: false, tempo: null });

      await storeData('cenasRespostas', []);
      await storeData('videosAssistidos', []);
      await storeData('trackingRespostas', { feliz: 0, neutro: 0, triste: 0 }); 
      await storeData('perguntasRespostas', []);
      await storeData('meditacaoRespostas', []);
      await storeData('tempoRespiracao', null);
      await storeData('missoesConcluidas', []);
      await storeData('configRespiracao', { ativado: false, tempo: null });
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
    configRespiracao,

    // 💾 SALVAMENTO
    salvarCenasRespostas,
    salvarVideoAssistido,
    salvarTrackingResposta,
    salvarPerguntaResposta,
    salvarMeditacaoRespostas,
    salvarTempoRespiracao,
    salvarConfigRespiracao,
    salvarMissaoConcluida,

    // 🔍 BUSCA
    buscarCenasSemana,
    buscarVideoSemana,
    buscarTrackingRespostas,
    buscarPerguntaSemana,
    buscarMeditacaoSemana,
    buscarMissaoSemana,
    buscarConfigRespiracao,
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