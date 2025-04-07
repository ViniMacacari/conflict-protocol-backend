import { Request, Response, NextFunction } from 'express'

export class NormalizeLowercaseMiddleware {
    static toLowercaseRecursive(obj: any): any {
        if (typeof obj === 'string') return obj.toLowerCase()
        if (Array.isArray(obj)) return obj.map(NormalizeLowercaseMiddleware.toLowercaseRecursive)
        if (obj && typeof obj === 'object') {
            const lowered: any = {}
            for (const key in obj) {
                lowered[key.toLowerCase()] = NormalizeLowercaseMiddleware.toLowercaseRecursive(obj[key])
            }
            return lowered
        }
        return obj
    }

    static use(req: Request, _res: Response, next: NextFunction): void {
        req.body = NormalizeLowercaseMiddleware.toLowercaseRecursive(req.body)
        req.query = NormalizeLowercaseMiddleware.toLowercaseRecursive(req.query)
        req.params = NormalizeLowercaseMiddleware.toLowercaseRecursive(req.params)

        const loweredHeaders: any = {}
        for (const key in req.headers) {
            const val = req.headers[key]
            loweredHeaders[key.toLowerCase()] = typeof val === 'string' ? val.toLowerCase() : val
        }
        req.headers = loweredHeaders

        next()
    }
}