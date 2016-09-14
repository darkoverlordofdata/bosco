###
#+--------------------------------------------------------------------+
#| package.scripts.coffee
#+--------------------------------------------------------------------+
#| Copyright DarkOverlordOfData (c) 2014-2015
#+--------------------------------------------------------------------+
#|
#| Generate package.script
#|
#| ash.coffee is free software; you can copy, modify, and distribute
#| it under the terms of the MIT License
#|
#+--------------------------------------------------------------------+
###
fs = require('fs')

# projectTypes enum:
JavaScript      = 0   # javascript
TypeScript      = 1   # typescript
CoffeeScript    = 2   # coffeescript
BabelScript     = 4   # es6
ClosureCompiler = 8   # plovr

# paths:
LIB_NAME        = "bosco"
PLOVR           = "tools/plovr.jar"
COMPILER_JAR    = "packages/closure-compiler/lib/vendor/compiler.jar"
LIB_ASH         = "packages/ash.coffee/goog/lib"
LIB_ASTEROIDS   = "goog/asteroids"
CLOSURE_HOME    = "packages/google-closure-library"
CLOSURE_BIN     = "#{CLOSURE_HOME}/closure/bin/build"
GOOG_BASE       = "../../../.."
ANDROID_ASSETS  = "./web/frameworks/runtime-src/proj.android-studio/app/assets"
CSCONFIG        = "./csconfig.json"
JSCONFIG        = "./jsconfig.json"
TSCONFIG        = "./tsconfig.json"

###
# Generate package.script
###
module.exports = (project, options = {}) ->

  # get project config
  csconfig = if fs.existsSync(CSCONFIG) then require(CSCONFIG) else files: []
  jsconfig = if fs.existsSync(JSCONFIG) then require(JSCONFIG) else files: []
  tsconfig = if fs.existsSync(TSCONFIG) then require(TSCONFIG) else files: []
  projectType = if tsconfig.files.length>0 then TypeScript else if csconfig.files.length>0 then CoffeeScript else JavaScript
  isClosure = fs.existsSync('./config.js')
  isCocos2d = fs.existsSync('./web/project.json')

  ### VS Code ctrl-shift-b ###
  _vscode_build: do ->
    switch projectType
      when TypeScript then "entitas generate && tsc -p ./tsconfig_bosco.json && tsc -p ./tsconfig_example.json"
      when CoffeeScript then "coffee -o web/src/#{LIB_NAME} -cm lib "
      # when CoffeeScript then "coffee -o web/src/#{LIB_NAME} -wcm lib "


  ### build the project ###
  build: do ->
    options.compile ?= 'ADVANCED_OPTIMIZATIONS'
    
    step = []#.concat(project.config.build)
      
    if projectType is TypeScript
      ###
      # Build with tsc, then compress, then build whole example
      ###
      step.push """
        tsc -p . --outFile build/#{LIB_NAME}.js -d
        cat build/#{LIB_NAME}.js | \
          java -jar #{COMPILER_JAR} \
            --compilation_level #{options.compile} \
            --js_output_file build/#{LIB_NAME}.min.js
      """

    else
      ###
      # Build directly from the raw javascript
      ###
      files = require(JSCONFIG).files.join(" LF ")
      step.push """
        cat #{files} > build/#{LIB_NAME}.js
        cat #{files} | \
          java -jar #{COMPILER_JAR} \
            --compilation_level #{options.compile} \
            --js_output_file build/#{LIB_NAME}.min.js
      """
    return step
      
  ### delete the prior build items ###
  clean: """
    rm -rf build/*
  """


  ### process bower dependencies ###
  get: """
    bower-installer
    cake get
  """

  ### publish gh-pages ###
  publish: """
    gulp publish
  """

  ###  create documentation ###
  jsdoc: """
    jsdoc goog/lib -r \
      --template ../jaguarjs-jsdoc \
      --configure ./conf.json \
      --readme ./readme.md \
      --destination ./build/web
  """

  ### get the dependencies ###
  postinstall: """
    bower install
    npm run get
  """


  ### prepare for build ###
  prebuild: """
    npm run clean -s
  """

  ### run the dev version of the app ###
  start: """
    tools/server web
  """

  ### run the build version of the app ###
  serve: """
    tools/server build/web
  """

  ### run the unit tests ###
  test: """
    NODE_ENV=test mocha \
      --compilers coffee:coffee-script \
      --require test/test_helper.js \
      --recursive
  """

  ### generate javascript ###
  transpile: do ->
    switch projectType
      when TypeScript 
        step = "tsc"
        return step
      when CoffeeScript 
        step = []
        step.push "coffee -o web/src/#{LIB_NAME} -cm lib"
        step.push "coffee -o web/src/example -cm example" if fs.existsSync('./example')
        return step
        


