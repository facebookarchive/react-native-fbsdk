include_defs("xplat//js/JS_DEFS")

js_library(
    name = "react-native-fbsdk",
    srcs = js_glob(
        [
            "**/*",
        ],
        excludes = [
            "bin/ios_setup.js",
        ],
    ),
    visibility = ["PUBLIC"],
    worker = "xplat//js:experimental-packager",
    deps = [
        "xplat//js:node_modules",
        "xplat//js:react-native",
        "xplat//js:react-native-RNTester",
        "xplat//js:react-native-addons-node_modules",
    ],
)
