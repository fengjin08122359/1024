var Block = function (json) {
  var self = this
  self.num = json.num || 0
  self.hasChange = json.hasChange || false
  self.index = json.index
  return self
}

export default Block
