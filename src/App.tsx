import { RouterProvider, createRouter } from '@tanstack/react-router'
import { AuthProvider, useAuth } from './context/auth-context.tsx'
import LayoutProvider from './context/layout-context.tsx'
import { routeTree } from './routeTree.gen.ts'
import './App.css'

const router = createRouter({
	routeTree,
	context: {
		auth: undefined! // This is a placeholder for the auth context
	}
})
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

function InnerApp() {
	const auth = useAuth()
	return <RouterProvider router={router} context={{ auth }} />
}

function App() {
	return (
		<>
			<AuthProvider>
				<LayoutProvider>
					<InnerApp />
				</LayoutProvider>
			</AuthProvider>
		</>
	)
}

export default App
