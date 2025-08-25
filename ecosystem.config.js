module.exports = {
  apps: [
    {
      name: 'transcaspian-backend',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'npm',
      args: 'start',
      cwd: './backend',
      env: {
        NODE_ENV: 'production',
        PORT: 5014
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5014
      },
      exp_backoff_restart_delay: 100,
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/backend-err.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    },
    {
      name: 'transcaspian-next',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'npm',
      args: 'start',
      cwd: './TranscaspianNext',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      exp_backoff_restart_delay: 100,
      watch: false,
      max_memory_restart: '400M',
      error_file: './logs/next-err.log',
      out_file: './logs/next-out.log',
      log_file: './logs/next-combined.log',
      time: true
    },
    {
      name: 'transcaspian-admin',
      exec_mode: 'cluster',
      instances: 1,
      script: 'npm',
      args: 'run preview',
      cwd: './admin',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      exp_backoff_restart_delay: 100,
      watch: false,
      max_memory_restart: '300M',
      error_file: './logs/admin-err.log',
      out_file: './logs/admin-out.log',
      log_file: './logs/admin-combined.log',
      time: true
    }
  ]
}
