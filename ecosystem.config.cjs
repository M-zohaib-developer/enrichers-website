module.exports = {
  apps: [
    {
      name: 'enrichers-app',
      cwd: __dirname,
      script: './scripts/start-available-port.mjs',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        PORT_MAX: '3099',
      },
    },
  ],
}
