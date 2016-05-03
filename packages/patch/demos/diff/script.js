(function () {
  'use strict'

  var ooPatch = JSON8Patch

  var sections = [
    {
      id: 'input',
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
      id: 'patch'
    },
    {
      id: 'output',
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
        "gender": {
          "type": "male"
        }
      }
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
        readOnly: section.id === 'patch'
      })
    })

    function run () {
      var input
      var output

      try {
        input = JSON.parse(editors['input'].getValue())
      } catch (e) {
        editors['patch'].setOption('mode', 'text/plain');
        editors['patch'].setValue('original is not valid JSON\n\n' + e)
        return
      }

      try {
        output = JSON.parse(editors['output'].getValue())
      } catch (e) {
        editors['patch'].setOption('mode', 'text/plain');
        editors['patch'].setValue('edited is not valid JSON\n\n' + e)
        return
      }

      var diffResult

      try {
        diffResult = ooPatch.diff(input, output)
      } catch (e) {
        editors['patch'].setOption('mode', 'text/plain');
        editors['patch'].setValue('patch is not valid\n\n' + e)
        return
      }

      editors['patch'].setOption('mode', 'application/json');
      editors['patch'].setValue(JSON.stringify(diffResult, null, 2))
    }

    [editors['input'], editors['output']].forEach(function (editor) {
      editor.on('change', run)
    })

    run()
  })
}())
