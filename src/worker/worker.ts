enum Commands {
    LOAD_DATA = 'LOAD_DATA',
    INITIALIZE = 'INITIALIZE',
}
onmessage = (message: MessageEvent) => {
    console.log('GOT A MESSAGE', message.data)
    postMessage('HELLO')
    switch (message.data.command) {
        case Commands.LOAD_DATA:
        case Commands.INITIALIZE:
        default:
    }
}
