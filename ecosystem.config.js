module.exports = {
    apps: [
        {
            name: 'API',
            script: './bin/www.js',
            args: 'one two',
            instance: 1,
            autorestart: true,
            watch: true,
            ignore_watch: ['node_modules', 'logs'],
            max_memory_restart: '1G',
            env_pro: {
                NODE_ENV: 'production',
                REMOTE_ADDR: '',
            },
            env_dev: {
                NODE_ENV: 'development',
                REMOTE_ADDR: '',
            },
            env_test: {
                NODE_ENV: 'test',
                REMOTE_ADDR: '',
            },
        },
    ],
};
