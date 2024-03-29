import { createStore } from 'vuex'
import axios from "axios";
const funcoesTransacao = require('../utils/FuncoesTransacoes');
const normalizaDados = require('../utils/NormalizarDados');

export default createStore({
  state: {
    listaTransacoes: null,
    transacao: null,
    erroMensagem:''
  },
  getters: {    
    transacoesPorStatusPorTitulo: (state) => (status, titulo) => {
      let filtrado = state.listaTransacoes.filter(t => normalizaDados.removerAcentos(t.title).toUpperCase().includes( normalizaDados.removerAcentos(titulo.toUpperCase())));
      if(status!='0'){
        filtrado = filtrado?.filter(t => t.status == status);      
      }
      return filtrado;
    }
  },
  mutations: {
    carregarTransacoes(state, listaTransacoes) {      
      state.listaTransacoes = funcoesTransacao.ordernarTransacoesPorData(listaTransacoes);
      state.listaTransacoes.map((transacao) => {return funcoesTransacao.normalizarDadosTransacoes(transacao)});
      state.erroMensagem = '';
    },
    carregarDetalhe(state, transacao) {
      state.transacao = transacao;
      funcoesTransacao.normalizarDadosTransacoes(state.transacao);
      state.erroMensagem = '';
    },
    erroCarregarTransacoes(state, error){      
      state.listaTransacoes = null;
      state.erroMensagem = `
      Ops! Não foi possível exibir suas transações. 
      Erro: ${error.response.status}
      `
    },
    erroCarregarDetalhe(state, error){      
      state.listaTransacoes = null;
      state.erroMensagem = `
      Ops! Não foi possível exibir detalhes da transação. 
      Erro: ${error.response.status}
      `
    }
  },
  actions: {
    async carregarTransacoes({ commit }) {
      await axios.get("https://api-profile.vercel.app/transaction")
        .then((response) => {
          commit('carregarTransacoes', response.data);
        }).catch((error) => {
          commit('erroCarregarTransacoes', error);
        })
    },
    async carregarDetalhe({ commit }, id) {
      await axios.get(`https://api-profile.vercel.app/transaction/${id}`)      
        .then((response) => {
          commit('carregarDetalhe', response.data);
        }).catch((error) =>{
          commit('erroCarregarDetalhe', error);
        })
    }
    
  },
  modules: {
  }
})
