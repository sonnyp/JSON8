(function () {
  'use strict'

  var ooPatch = JSON8Patch

  var sections = [
    {
      id: 'input',
      value: [
        {"op": "add", "path": "/a/b/c", "value": ["foo", "bar"]},
        {"op": "remove", "path": "/a/b/c"},
        {"op": "replace", "path": "/a/b/c", "value": 42},
        {"op": "move", "from": "/a/b/c", "path": "/a/b/d"},
        {"op": "copy", "from": "/a/b/c", "path": "/a/b/e"},
        {"op": "test", "path": "/a/b/c", "value": "foo"}
      ]
    },
    {
      id: 'output'
    },
    {
      id: 'unpacked'
    }
  ]

  var editors = {}

  // returns the byte length of an utf8 string
  function byteLength(str) {
    var s = str.length;
    for (var i=str.length-1; i>=0; i--) {
      var code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) s++;
      else if (code > 0x7ff && code <= 0xffff) s+=2;
      if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
    }
    return s;
  }

  document.addEventListener('DOMContentLoaded', function () {
    sections.forEach(function (section) {
      var input = section.textarea = document.querySelector('#' + section.id + ' textarea')

      if (section.value) {
        input.value = JSON.stringify(section.value, null, 2)
      }

      editors[section.id] = section.editor = CodeMirror.fromTextArea(section.textarea, {
        lineNumbers: true,
        mode: section.value ? "application/json" : "text/plain",
        gutters: ["CodeMirror-lint-markers", "CodeMirror-foldgutter"],
        lint: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        foldGutter: true,
        readOnly: section.id === 'result'
      })
    })

    function run () {
      var input

      try {
        input = JSON.parse(editors['input'].getValue())
      } catch (e) {
        editors['output'].setOption('mode', 'text/plain');
        editors['output'].setValue('target is not valid JSON\n\n' + e)
        return
      }

      var packResult

      try {
        packResult = ooPatch.pack(input)
      } catch (e) {
        editors['output'].setOption('mode', 'text/plain');
        editors['output'].setValue('patch is not valid\n\n' + e)
        return
      }

      editors['output'].setOption('mode', 'application/json');
      editors['output'].setValue(JSON.stringify(packResult, null, 2))

      var unpackResult
      try {
        unpackResult = ooPatch.unpack(JSON.parse(editors.output.getValue()))
      } catch (e) {
        return
      }
      editors.unpacked.setOption('mode', 'application/json')
      editors['unpacked'].setValue(JSON.stringify(unpackResult, null, 2))


      document.querySelector('#input .size').textContent = byteLength(JSON.stringify(JSON.parse(editors['input'].getValue())))
      document.querySelector('#output .size').textContent = byteLength(JSON.stringify(JSON.parse(editors['output'].getValue())))
      document.querySelector('#unpacked .size').textContent = byteLength(JSON.stringify(JSON.parse(editors['unpacked'].getValue())))
    }

    editors['input'].on('change', function () {
        run()
    })

    run()
  })
}())
