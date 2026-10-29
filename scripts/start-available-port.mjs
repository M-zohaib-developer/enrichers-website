import net from 'node:net'
import path from 'node:path'
import { spawn } from 'node:child_process'

const firstPort = Number.parseInt(process.env.PORT ?? '3000', 10)
const lastPort = Number.parseInt(process.env.PORT_MAX ?? String(firstPort + 99), 10)

const isAvailable = (port) =>
  new Promise((resolve) => {
    const server = net.createServer()
    server.once('error', () => resolve(false))
    server.listen(port, '0.0.0.0', () => {
      server.close(() => resolve(true))
    })
  })

let port = firstPort
while (port <= lastPort && !(await isAvailable(port))) port += 1

if (port > lastPort) {
  console.error(`No available port found between ${firstPort} and ${lastPort}.`)
  process.exit(1)
}

console.log(`Starting Next.js production server on port ${port}.`)

const nextBin = path.resolve('node_modules/next/dist/bin/next')
const child = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
  env: { ...process.env, PORT: String(port) },
  stdio: 'inherit',
})

const forwardSignal = (signal) => child.kill(signal)
process.on('SIGINT', () => forwardSignal('SIGINT'))
process.on('SIGTERM', () => forwardSignal('SIGTERM'))

child.on('exit', (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0))
})
