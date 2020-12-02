// Интерфейс для обработки данных в сервисе ImgCaruselService
export interface JsonInt { // Int не следуєт указывать, JsonObject - может быть лутшым названиям
    h1: string
    videoUrl: string
}

// Интерфейс для кликов открытия форм firstForm, topForm, questionForm, callorderForm
export interface ClickInt { // Int не следуєт указывать, ClickInterface - может быть лутшым названиям
    typeofform: number // camelCase is better to name variables
    typeofact?: string // camelCase is better to name variables
}

// Интерфейс для данных из всех форм
export interface OrdersInt { // Int не следуєт указывать, Orders - может быть лутшым названиям
    id?: string
    name?: string
    phone: string
    email?: string
    typeofact: string // camelCase is better to name variables, typeOfAction - may be better naming
    typeofform?: number // camelCase is better to name variables, typeOfForm - easier to read
    status?: boolean
    promo?: string
    text?: string
    date?: Date
}
