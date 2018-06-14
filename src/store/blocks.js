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
        state.blocks[i * level + j] = 0
      }
    }
  },
  addBlock (state) {
    var currentBlocks = state.blocks.map(function (value, index) {
      if (value === 0) {
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
    state.blocks[index] = 2 + Math.floor(Math.random()*2)*2
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
      if (direction == 3 || direction == 2) {
        for (var i = 1; i < state.level; i++) {
          var isMerge = false
          if (lineSplit[i] === lineSplit[i - 1] ) {
            lineSplit[i] = lineSplit[i] * 2
            lineSplit[i - 1] = 0
            isMerge = true
          }
          if (lineSplit[i] == 0) {
            lineSplit[i] = lineSplit[i - 1]
            lineSplit[i - 1] = 0
          }
          if (isMerge) {
            i++
          }
        }
      } else {
        for (var i = state.level-2; i >= 0; i--) {
          var isMerge = false
          if (lineSplit[i] === lineSplit[i + 1] ) {
            lineSplit[i] = lineSplit[i] * 2
            lineSplit[i + 1] = 0
            isMerge = true
          }
          if (lineSplit[i] == 0) {
            lineSplit[i] = lineSplit[i + 1]
            lineSplit[i + 1] = 0
          }
          if (isMerge) {
            i--
          }
        }
      }
    })
    //平移
    arraySplit.forEach(function (lineSplit, index) {
      var emptyBlock = lineSplit.filter(function (value, jindex) {
        return value !== 0
      })
      var zeroLength = state.level - emptyBlock.length;
      if (direction == 1 || direction == 0) {
        lineSplit = emptyBlock
        for (var i = 1; i <= zeroLength; i++) {
          lineSplit.push(0)
        }
      } else {
        lineSplit = []
        for (var i = 1; i <= zeroLength; i++) {
          lineSplit.push(0)
        }
        lineSplit = lineSplit.concat(emptyBlock)
      }
      arraySplit[index] = lineSplit
    })
    console.log(arraySplit)
    //重新展开
    arraySplit.forEach(function (lineSplit, index) {
      lineSplit.forEach(function (value, jindex) {
        if (direction % 2 === 0) {
          state.blocks[index * state.level + jindex] = value
        } else {
          state.blocks[jindex * state.level + index] = value
        }
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
