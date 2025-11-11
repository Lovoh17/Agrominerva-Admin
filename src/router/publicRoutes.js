// Agrominerva/src/routes/publicRoutes.js

const publicRoutes = [
  {
    // Ruta padre que utiliza el PublicLayout
    path: '/',
    component: () => import('@/layouts/PublicLayout.vue'),

    children: [
      // ===== PÁGINA PRINCIPAL =====
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/public/Home.vue'),
        meta: {
          title: 'AgroMinerva | Soluciones Agrícolas'
        }
      },

      // ===== TIENDA =====
      {
        path: 'tienda',
        name: 'Shop',
        component: () => import('@/views/public/store/Shop.vue'),
        meta: {
          title: 'Tienda de Productos Agrícolas'
        }
      },
      {
        path: 'producto/:id',
        name: 'ProductDetail',
        component: () => import('@/views/public/store/ProductDetail.vue'),
        props: true,
        meta: {
          title: 'Detalle del Producto' // Implementar 'afterEach' para Seo
        }
      },

      // ===== CARRITO Y PEDIDOS =====
      {
        path: 'carrito',
        name: 'Cart',
        component: () => import('@/views/public/store/Cart.vue'),
        meta: {
          title: 'Tu Carrito de Compras'
        }
      },

      // Las rutas de pedidos si se implementa para public
      // {
      //   path: 'pedidos',
      //   name: 'Orders',
      //   component: () => import('@/views/public/store/Orders.vue'),
      //   meta: { title: 'Historial de Pedidos' }
      // },

      // ===== BLOG =====
      {
        path: 'blog',
        name: 'BlogList',
        component: () => import('@/views/public/blog/BlogList.vue'),
        meta: {
          title: 'Blog AgroMinerva'
        }
      },
      {
        path: 'blog/:slug',
        name: 'BlogDetail',
        component: () => import('@/views/public/blog/BlogDetail.vue'),
        props: true,
        meta: {
          title: 'Artículo del Blog' // Implementar 'afterEach' para Seo 
        }
      },
      {
        path: 'blog/actividad',
        name: 'ActivityFeed',
        component: () => import('@/views/public/blog/ActivityFeed.vue'),
        meta: {
          title: 'Feed de Actividad'
        }
      },

      // ===== AGRONOMÍA  =====
      {
        path: 'agronomia',
        name: 'Agronomy',
        redirect: '/agronomia/programas'
      },
      {
        path: 'agronomia/programas',
        name: 'Programs',
        component: () => import('@/views/public/agronomy/Programs.vue'),
        meta: {
          title: 'Programas de Agronomía'
        }
      },
      {
        path: 'agronomia/profesores',
        name: 'Professors',
        component: () => import('@/views/public/agronomy/Professors.vue'),
        meta: {
          title: 'Nuestros Profesores'
        }
      },
      {
        path: 'agronomia/carrera',
        name: 'CareerInfo',
        component: () => import('@/views/public/agronomy/CareerInfo.vue'),
        meta: {
          title: 'Información de la Carrera'
        }
      },

      // ===== INFORMACIÓN EMPRESARIAL =====
      {
        path: 'conocenos',
        name: 'About',
        component: () => import('@/views/public/About.vue'),
        meta: {
          title: 'Conócenos | AgroMinerva'
        }
      },
      {
        path: 'contacto',
        name: 'Contact',
        component: () => import('@/views/public/Contact.vue'),
        meta: {
          title: 'Contacto'
        }
      },

      // ===== PÁGINAS LEGALES =====
      {
        path: 'privacidad',
        name: 'Privacy',
        component: () => import('@/views/public/legal/Privacy.vue'),
        meta: {
          title: 'Política de Privacidad'
        }
      },
      {
        path: 'terminos',
        name: 'Terms',
        component: () => import('@/views/public/legal/Terms.vue'),
        meta: {
          title: 'Términos y Condiciones'
        }
      },
      {
        path: 'preguntas-frecuentes',
        name: 'FAQ',
        component: () => import('@/views/public/legal/FAQ.vue'),
        meta: {
          title: 'Preguntas Frecuentes (FAQ)'
        }
      },
      {
        path: 'cookies',
        name: 'Cookies',
        component: () => import('@/views/public/legal/Cookies.vue'),
        meta: {
          title: 'Política de Cookies'
        }
      },

      // ===== ERRORES =====
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/public/errors/NotFound.vue'),
        meta: {
          title: '404 - Página No Encontrada'
        }
      }
    ]
  }
]

export default publicRoutes