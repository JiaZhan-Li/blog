<template>
    <div>
        <div :class="$style.grid">{{ name }}</div>
        <div :class="$style.img" @click="changeName"></div>
    </div>
</template>

<script>
    export default {
        name: 'Index',

        data() {
            return {
                name: 'lijiazhan',
            };
        },

        created() {
            console.log(process.env.NODE_ENV);
            console.log(this);
        },

        methods: {
            changeName() {
                this.name = this.name + '-';
            },
        }
    };
</script>

<style module>
    .grid {
        width: 200px;
        height: 200px;
        background: conic-gradient(#000 0, #000 12.5%, #fff 12.5%, #fff 37.5%, #000 37.5%, #000 62.5%, #fff 62.5%, #fff 87.5%, #000 87.5%,#000 0);
        border: 1px solid #000;
        background-size: 50px 50px;
    }
    .img {
        width: width("../img/2.jpeg", 4);
        height: height("../img/2.jpeg", 4);
        border: 1px solid #000;
        margin-top: 20px;
        background-image: resolve("2.jpeg");
        background-size: size("../img/2.jpeg", 4);
    }
</style>
