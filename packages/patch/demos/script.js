(function () {
  'use strict'

  // small hack to highlight token target in code example

  var highlighted = []

  function highlight (el) {
    el.classList.add('highlight')
    highlighted.push(el)
  }

  function unhighlightAll () {
    highlighted.forEach(function (el) {el.classList.remove('highlight')})
    highlighted = []
  }

  document.addEventListener('click', function (e) {
    var target = e.target.dataset.target
    if (!target) return unhighlightAll()
    unhighlightAll()
    highlight(e.target)
    highlight(document.getElementById(target))
  })

}())
