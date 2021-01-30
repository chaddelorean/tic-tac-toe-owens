import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/views/MainMenu'
import RemoteGame from '@/components/views/RemoteGame'
import TicTacToe from '@/components/molecules/TicTacToe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      component: MainMenu
    },
    {
      path: '/localgame',
      name: 'TicTacToe',
      component: TicTacToe
    },
    {
      path: '/remotegame',
      name: 'RemoteGame',
      component: RemoteGame
    }
  ]
})
