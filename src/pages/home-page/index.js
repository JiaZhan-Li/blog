import app from '@/assets/js/create-app';
import createRouter from '@/assets/js/create-router';
import routes from './router';

new Promise(() => {
    setTimeout(() => {
        // console.log([].includes(1));
    }, 0);
});

app({
    router: createRouter(routes)
});
