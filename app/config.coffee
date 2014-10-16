require.config {
    path: {
        "components": "../bower_components"
    }
}

if not window.requireTestMode
    require ['main'], ->