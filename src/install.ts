import Unity from "./components/Unity.vue";

const VUnity = {
    install(Vue: any, options: any) : void {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("V-Unity", Unity);
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VUnity);
}

export default VUnity;
