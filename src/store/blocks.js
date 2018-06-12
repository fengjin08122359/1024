import Block from './block'

const state = {
  blocks: [],
  level: 4
}

// getters
const getters = {
  currentBlocks: (state) => {
    return state.blocks
  }
}

// actions
const actions = {
  startGame ({ commit }, level) {
    commit('startGame', level)
  },
  addBlock ({ commit }) {
    commit('addBlock')
  },
  goStep ({ commit }, direction) {
    commit('goStep', direction)
  }
}

// mutations
const mutations = {
  startGame (state, level) {
    state.level = level
    state.blocks = []
    for (var i = 0; i < level; i++) {
      for (var j = 0; j < level; j++) {
        state.blocks[i * level + j] = new Block({index: i * level + j})
      }
    }
  },
  addBlock (state) {
    var currentBlocks = state.blocks.map(function (value, index) {
      if (value.num === 0) {
        return index
      } else {
        return ''
      }
    })
    var emptyBlock = currentBlocks.filter(function (value, index) {
      return value !== ''
    })
    var blockIndex = Math.floor(emptyBlock.length * Math.random())
    var index = emptyBlock[blockIndex]
    console.log(index)
    state.blocks[index] = new Block({num: 2, index: index})
    state.blocks = state.blocks.slice(0)
  },
  goStep (state, direction) {
    var arraySplit = [];
    //整理
    state.blocks.forEach(function (value, index) {
      if (direction % 2 === 0) {
        if (!arraySplit[Math.floor(index / state.level)]) {
          arraySplit[Math.floor(index / state.level)]= []
        }
        arraySplit[Math.floor(index / state.level)].push(value)
      } else {
        if (!arraySplit[index % state.level]) {
          arraySplit[index % state.level]= []
        }
        arraySplit[index % state.level].push(value)
      }
    })
    //合并
    arraySplit.forEach(function (lineSplit, index) {
      if (direction >= 2) {
        for (var i = 1; i < state.level; i++) {
          if (lineSplit[i].num === lineSplit[i - 1].num ) {
            lineSplit[i].num = lineSplit[i].num * 2
            lineSplit[i - 1].num = 0
          }
          if (lineSplit[i].num == 0) {
            lineSplit[i].num = lineSplit[i - 1].num
            lineSplit[i - 1].num = 0
          }
        }
      } else {
        for (var i = state.level-2; i >= 0; i--) {
          if (lineSplit[i].num === lineSplit[i + 1].num ) {
            lineSplit[i].num = lineSplit[i].num * 2
            lineSplit[i + 1].num = 0
          }
          if (lineSplit[i].num == 0) {
            lineSplit[i].num = lineSplit[i + 1].num
            lineSplit[i + 1].num = 0
          }
        }
      }
    })
    //平移
    arraySplit.forEach(function (lineSplit, index) {
      if (direction >= 2) {
        for (var i = 1; i < state.level; i++) {
          if (lineSplit[i].num == 0) {
            lineSplit[i].num = lineSplit[i - 1].num
            lineSplit[i - 1].num = 0
          }
        }
      } else {
        for (var i = state.level-2; i >= 0; i--) {
          if (lineSplit[i].num == 0) {
            lineSplit[i].num = lineSplit[i + 1].num
            lineSplit[i + 1].num = 0
          }
        }
      }
    })
    console.log(arraySplit)
    //重新展开
    arraySplit.forEach(function (lineSplit, index) {
      lineSplit.forEach(function (value, index) {
        state.blocks[value.index] = value
      })
    })
    state.blocks = state.blocks.slice(0)
    mutations.addBlock(state)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
