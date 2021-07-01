// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default en-US
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes:  [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },

        {
          name: 'register',
          path: '/user/register',
          component: './user/register',
        },
           
      ],
    },

    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/user/login',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: 'Welcome',
            },
            {
              path: '/product',
              icon: 'edit',
              name: 'product',
              component: './product/mantain',
              
            },

            {
              path: '/order',
              icon: 'shopping-cart',
              name: 'orders',
              component: './order/mantain',
              
            },

            {
              path: '/sale',
              icon: 'dollar',
              name: 'sales',
              component: './sale/mantain',
              
            },
            
            {
              path: '/promotion',
              icon: 'fire',
              name: 'promotions',
              component: './promotion/mantain',
              
            },

            {
              name: 'product.create',
              icon: 'add',
              path: '/product/create',
              hideInMenu :true,                
              component: './product/create',
            },

            {
              name: 'promotion.create',
              icon: 'add',
              path: '/promotion/create',
              hideInMenu :true,                
              component: './promotion/create',
            },
   
            {
              name: 'product.edit',
              icon: 'edit',
              path: '/product/edit',
              hideInMenu :true,                
              component: './product/edit',
            },

            {
              name: 'product.updatestock',
              icon: 'edit',
              path: '/product/updatestock',
              hideInMenu :true,                
              component: './product/updatestock',
            },

            {
              name: 'options',
              icon: 'group',
              path: '/options/mantain',               
              component: './option/mantain',
            },
            {
              name: 'options.create',
              icon: 'group',
              path: '/options/create', 
              hideInMenu:true,              
              component: './option/create',
            },

            {
              name: 'report',
              icon: 'group',
              path: '/report', 
              hideInMenu:true,              
              component: './report',
            },

            {
              name: 'clients',
              icon: 'user',
              path: '/client/mantain',               
              component: './client/mantain',
            },

            {
              name: 'market.reviews',
              icon: 'star',
              path: '/reviews/market',               
              component: './reviews/market',
            },

            {
              name: 'product.reviews',
              icon: 'star',
              path: '/reviews/product',               
              component: './reviews/product',
            },
         
            {
              path: '/settings',
              icon: 'setting',
              name: 'account.settings',
              component: './settings',
              
            },
            
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
