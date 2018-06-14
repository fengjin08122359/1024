<template>
  <div id="app">
    <div class="gameArea">
      <span v-bind:class="divRank(i)" v-for="(i, index) in matrix" v-bind:key="index" v-bind:style="{ width: size, height: size }" v-html='divHtml(i)'></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      rank: 'aaa'
    }
  },
  computed: {
    ...mapGetters({
      matrix: 'currentBlocks'
    }),
    size () {
      return (100 / this.$store.state.blocks.level) + '%'
    }
  },
  mounted () {
  },
  created () {
    var that = this
    that.startGame(6)
    window.onkeydown = function (ev) {
      console.log('onkeydown', ev.keyCode)
      if (ev.keyCode === 37) {
        that.$store.dispatch('goStep', 0)
      } else if (ev.keyCode === 38) {
        that.$store.dispatch('goStep', 1)
      } else if (ev.keyCode === 39) {
        that.$store.dispatch('goStep', 2)
      } else if (ev.keyCode === 40) {
        that.$store.dispatch('goStep', 3)
      } else if (ev.keyCode === 32) {
        that.$store.dispatch('shoot')
      }
    }
  },
  methods: {
    startGame (num) {
      this.$store.dispatch('startGame', num)
      this.$store.dispatch('addBlock')
      this.$store.dispatch('addBlock')
    },
    divRank (i) {
      return 'level0'
    },
    divHtml (i) {
      return i
    }
  }
}
</script>

<style>
  html,body,#app{
    height:100%;
  }
  .gameArea{
    width:300px;
    height:300px;
    font-size:0;
  }
  .gameArea span{
    display:inline-block;
    border:1px solid #000;
    box-sizing:border-box;
    font-size: 30px;
    text-align: center;
  }
</style>
