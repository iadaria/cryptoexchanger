import { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Наш проект',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ru">
			<body>
				<div>Авторизация</div>
				{children}
			</body>
		</html>
	)
}

// title: 'Наш проект'
// title: 'Исправленные данные',