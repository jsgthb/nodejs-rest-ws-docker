require('dotenv').config()
const fs = require('fs')

if (process.env.NODE_ENV == "test") {
    // Mock keypair for integration testing
    const privateKey = "-----BEGIN EC PRIVATE KEY-----\r\n" +
    "MHcCAQEEIDqLErFIjwFpOPe1StaGYDnkMvE1hNsnU2sF9Vr+/C4foAoGCCqGSM49\r\n" + 
    "AwEHoUQDQgAERRvDA1KUR2PSD62/Iqy8ucXGZxxzy3LZb8ZEXEcV9lxN23pA98py\r\n" +
    "i0h3CRgefA5LPUpz+WGohFIWE8s86w/4oA==\r\n" +
    "-----END EC PRIVATE KEY-----\r\n"
    const publicKey = "-----BEGIN PUBLIC KEY-----\r\n" +
    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAERRvDA1KUR2PSD62/Iqy8ucXGZxxz\r\n" +
    "y3LZb8ZEXEcV9lxN23pA98pyi0h3CRgefA5LPUpz+WGohFIWE8s86w/4oA==\r\n" +
    "-----END PUBLIC KEY-----\r\n"

    module.exports = {
        privateKey,
        publicKey
    }
} else {
    // Production keypair
    const privateKey = fs.readFileSync(process.env.NODE_ACCESS_KEY_SECRET)
    const publicKey = fs.readFileSync(process.env.NODE_ACCESS_KEY_PUBLIC)

    module.exports = {
        privateKey,
        publicKey
    }
}
