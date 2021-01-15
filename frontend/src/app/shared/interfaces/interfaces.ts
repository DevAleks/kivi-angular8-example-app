// Интерфейс для обработки данных в сервисе ImgCaruselService
export interface JsonObject {
    h1: string
    videoUrl: string
}

// Интерфейс для кликов открытия форм firstForm, topForm, questionForm, callorderForm
export interface ClickInterface {
    typeOfForm: number 
    typeOfAct?: string 
}

// Интерфейс для данных из всех форм
export interface Orders {
    id?: string
    name?: string
    phone: string
    email?: string
    typeOfAct: string // camelCase is better to name variables, typeOfAction - may be better naming
    typeOfForm?: number // camelCase is better to name variables, typeOfForm - easier to read
    status?: boolean
    promo?: string
    text?: string
    date?: Date
}
