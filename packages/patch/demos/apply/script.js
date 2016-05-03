(function () {
  'use strict'

  var ooPatch = JSON8Patch

  var sections = [
    {
      id: 'target',
      value: {
        "firstName": "John",
        "lastName": "Smith",
        "age": 25,
        "address": {
          "streetAddress": "21 2nd Street",
          "city": "New York",
          "state": "NY",
          "postalCode": "10021"
        },
        "phoneNumber": [
          {
            "type": "home",
            "number": "212 555-1234"
          },
          {
            "type": "fax",
            "number": "646 555-4567"
          }
        ],
        "gender": {
          "type": "male"
        }
      }
    },
    {
      id: 'patch',
      value: [
        {"path": "/age", "op": "replace", "value": 26},
        {"path": "/phoneNumber/1", "op": "remove"}
      ]
    },
    {
      id: 'result'
    }
  ]

  var editors = {}

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
      var target
      var patch

      try {
        target = JSON.parse(editors['target'].getValue())
      } catch (e) {
        editors['result'].setOption('mode', 'text/plain');
        editors['result'].setValue('target is not valid JSON\n\n' + e)
        return
      }

      try {
        patch = JSON.parse(editors['patch'].getValue())
      } catch (e) {
        editors['result'].setOption('mode', 'text/plain');
        editors['result'].setValue('patch is not valid JSON\n\n' + e)
        return
      }

      var applyResult

      try {
        applyResult = ooPatch.apply(target, patch)
      } catch (e) {
        editors['result'].setOption('mode', 'text/plain');
        editors['result'].setValue('patch is not valid\n\n' + e)
        return
      }

      editors['result'].setOption('mode', 'application/json');
      editors['result'].setValue(JSON.stringify(applyResult.doc, null, 2))
    }

    [editors['target'], editors['patch']].forEach(function (editor) {
      editor.on('change', function () {
        run()
      })
    })

    run()
  })
}())
