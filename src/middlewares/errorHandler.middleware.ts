

export class ErrorHandler extends Error {

    constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ){
        super(message);
    }

    static badRequest( message: string ){
        return new ErrorHandler(400, message);
    }

    static unauthorized( message: string ) {
        return new ErrorHandler(401, message);
    }
    
    static forbidden( message: string ) {
        return new ErrorHandler(403, message);
    }

    static notFound( message: string ) {
        return new ErrorHandler(404, message);
    }

    static serverError( message: string ) {
        return new ErrorHandler(500, message);
    }
}