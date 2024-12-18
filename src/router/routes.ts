import loginView from '@/views/login/loginView.vue'
import homeView from '@/views/home/homeView.vue'
import errorView from '@/views/404/errorView.vue'
import UserManagement from '@/views/acl/user/userManagement.vue'
import RoleManagement from '@/views/acl/role/roleManagement.vue'
import PermissionManagement from '@/views/acl/permission/permissionManagement.vue'
import trademarkView from '@/views/product/trademark/trademarkView.vue'
import SpuView from '@/views/product/spu/spuView.vue'
import AttrView from '@/views/product/attr/attrView.vue'
import SkuView from '@/views/product/sku/skuView.vue'
import LayoutComponent from '@/views/layout/layoutComponent.vue'

export const constantRoute = [
  {
    path: '/login',
    component: loginView,
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/',
    component: LayoutComponent,
    name: 'layout',
    redirect: '/home',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    children: [
      {
        path: '/home',
        component: homeView,
        name: '首页',
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/acl',
    component: LayoutComponent,
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: UserManagement,
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/Role',
        component: RoleManagement,
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Avatar',
        },
      },
      {
        path: '/acl/Permission',
        component: PermissionManagement,
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Menu',
        },
      },
    ],
  },
  {
    path: '/product',
    component: LayoutComponent,
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'ShoppingTrolley',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: trademarkView,
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'GoodsFilled',
        },
      },
      {
        path: '/product/spu',
        component: SpuView,
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Shop',
        },
      },
      {
        path: '/product/sku',
        component: SkuView,
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Briefcase',
        },
      },
      {
        path: '/product/attr',
        component: AttrView,
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'Opportunity',
        },
      },
    ],
  },
  {
    path: '/404',
    component: errorView,
    name: '404',
    meta: {
      title: '错误',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '其他',
      hidden: true,
    },
  },
]
