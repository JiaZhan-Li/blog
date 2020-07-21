/**
 * Created by Jiazhan-Li on 2020/7/9.
 */

import Layout from '@/components/layout/Layout';

export default [{
    path: '/',
    component: Layout,
    children: [
        {
            path: '/',
            name: 'Index',
            component: () => import('../views/HomePage.vue')
        }
    ]
}];