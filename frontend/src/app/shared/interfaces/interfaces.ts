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
    typeOfAct: string 
    typeOfForm?: number 
    status?: boolean
    promo?: string
    text?: string
    date?: Date
}
