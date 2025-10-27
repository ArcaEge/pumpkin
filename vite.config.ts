import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	ssr: {
		// leave @libsql to be required at runtime by Node
		external: ['@libsql/client']
	},
	build: {
		rollupOptions: {
			// also treat any @libsql/* imports as external during rollup
			external: (id) => typeof id === 'string' && /^@libsql(\/|$)/.test(id)
		}
	},
	server: {
		host: true,
		port: 5173,
		strictPort: true,
		watch: {
			usePolling: true
		},
		hmr: {
			clientPort: 5173,
			host: 'localhost'
		}
	}
});
