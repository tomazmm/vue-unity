<template>
  <div id="unity-container" class="unity-desktop" ref="unity_container">
    <canvas id="unity-canvas" ref="unity_canvas"></canvas>
    <script type="application/javascript" :src="loaderUrl" @load="initUnityLoader"></script>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { UnityInstance } from "@/types/unity";

declare function createUnityInstance(e: any, t: any, r: any): Promise<any>;

@Component({})
export default class Unity extends Vue {

  unityInstance?: UnityInstance;

  progress?: number;

  canvas?: HTMLCanvasElement

  container?: HTMLDivElement

  loaderUrl?: string;

  @Prop({default: 'Build'}) readonly buildUrl: string

  @Prop({default: 960}) readonly width: number

  @Prop({default: 600}) readonly height: number

  created(): void {
    this.loaderUrl = this.buildUrl + "/Build.loader.js";
  }

  mounted() : void {
    this.container = this.$refs.unity_container as HTMLDivElement;
    this.canvas = this.$refs.unity_canvas as HTMLCanvasElement;

    if(!this.container) throw new Error("Container can not be null or undefined");
    if(!this.canvas) throw new Error("Canvas can not be null or undefined");

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      this.container.className = "unity-mobile";
    } else {
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
    }
  }

  initUnityLoader() : void {
    try{
      const config = {
        dataUrl: this.buildUrl + "/Build.data",
        frameworkUrl: this.buildUrl + "/Build.framework.js",
        codeUrl: this.buildUrl + "/Build.wasm",
      };

      createUnityInstance(this.canvas, config, (progress:number) => {
        this.progress = progress;
      }).then((unityInstance: UnityInstance) => {
        this.unityInstance = unityInstance;
      }).catch((message) => {
        alert(message);
      });
    }
    catch (e) {
      const msg = `[Vue-Unity] error: ${e.message} \n The provided prop 'buildURL' is probably not correct.`;
      console.error(msg);
    }
  }
}
</script>

<style lang="scss" scoped>
#unity-container {
  &.unity-mobile {
    width: 100%;
    height: 100%;
    #unity-canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
