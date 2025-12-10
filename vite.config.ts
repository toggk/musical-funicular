import { defineConfig, Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Mock cart storage
const mockCart: any[] = [];

// Mock API plugin
const mockApiPlugin = (): Plugin => ({
    name: 'mock-api',
    configureServer(server) {
        server.middlewares.use((req: any, res: any, next: any) => {
            const url = req.url || '';
            const method = req.method || '';

            // GET /api/cart - Fetch cart
            if (url === '/api/cart' && method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ items: mockCart }));
                return;
            }

            // POST /api/cart/add - Add to cart
            if (url === '/api/cart/add' && method === 'POST') {
                let body = '';
                req.on('data', (chunk: any) => body += chunk.toString());
                req.on('end', () => {
                    try {
                        const data = JSON.parse(body);
                        const existingItem = mockCart.find(item => item.productId === data.productId);

                        if (existingItem) {
                            existingItem.quantity += data.quantity || 1;
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(existingItem));
                        } else {
                            const newItem = {
                                id: Date.now(),
                                ...data,
                                quantity: data.quantity || 1
                            };
                            mockCart.push(newItem);
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(newItem));
                        }
                    } catch (error) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Invalid request body' }));
                    }
                });
                return;
            }

            // PATCH /api/cart/items/:id - Update cart item
            const updateMatch = url.match(/^\/api\/cart\/items\/(\d+)$/);
            if (updateMatch && method === 'PATCH') {
                const itemId = parseInt(updateMatch[1]);
                let body = '';
                req.on('data', (chunk: any) => body += chunk.toString());
                req.on('end', () => {
                    try {
                        const data = JSON.parse(body);
                        const item = mockCart.find(i => i.id === itemId);

                        if (item) {
                            item.quantity = data.quantity;
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(item));
                        } else {
                            res.writeHead(404, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Item not found' }));
                        }
                    } catch (error) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Invalid request body' }));
                    }
                });
                return;
            }

            // DELETE /api/cart/items/:id - Remove cart item
            const deleteMatch = url.match(/^\/api\/cart\/items\/(\d+)$/);
            if (deleteMatch && method === 'DELETE') {
                const itemId = parseInt(deleteMatch[1]);
                const index = mockCart.findIndex(i => i.id === itemId);

                if (index !== -1) {
                    mockCart.splice(index, 1);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Item not found' }));
                }
                return;
            }

            next();
        });
    }
});

export default defineConfig({
    plugins: [
        tailwindcss(),
        mockApiPlugin(),
    ],
})
