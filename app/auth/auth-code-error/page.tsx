'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ErrorContent() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-red-600">Erro de Autenticação</CardTitle>
                    <CardDescription className="text-center">
                        Ocorreu um erro ao verificar seu link de acesso.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center text-gray-600">
                        {error ? error : 'O link pode ter expirado ou já ter sido utilizado. Por favor, tente solicitar uma nova redefinição de senha.'}
                    </p>
                    <Button asChild className="w-full bg-[#1d9b9a] hover:bg-[#16807f]">
                        <Link href="/recuperar-senha">
                            Tentar Novamente
                        </Link>
                    </Button>
                    <div className="text-center">
                        <Link href="/login" className="text-sm text-gray-500 hover:underline">
                            Voltar para o Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function AuthCodeErrorPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <ErrorContent />
        </Suspense>
    )
}
