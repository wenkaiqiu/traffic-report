import Vue from 'vue';
import Router from 'vue-router';
import Greeting from '@/components/Greeting';
import FlowTrend from '@/components/Analyzation-FlowTrend';
import RealTime from '@/components/Analyzation-RealTime';
import BasicManagement from '@/components/Management-Basic';
import ConfigurationManagement from '@/components/Management-Configuration';
import DataPackage from '@/components/Recall-DataPackage';
import HistoryFlow from '@/components/Recall-HistoryFlow';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'greeting',
      component: Greeting,
    },
    {
      path: '/flow-trend',
      name: 'flow-trend',
      component: FlowTrend,
    },
    {
      path: '/real-time',
      name: 'real-time',
      component: RealTime,
    },
    {
      path: '/basic-management',
      name: 'basic-management',
      component: BasicManagement,
    },
    {
      path: '/configuration-management',
      name: 'configuration-management',
      component: ConfigurationManagement,
    },
    {
      path: '/data-package',
      name: 'data-package',
      component: DataPackage,
    },
    {
      path: '/history-flow',
      name: 'history-flow',
      component: HistoryFlow,
    },
  ],
});
