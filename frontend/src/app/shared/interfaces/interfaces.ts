// Интерфейс для обработки данных в сервисе ImgCaruselService
export interface JsonInt {
    h1:string
    videoUrl:string
}

// Интерфейс для кликов открытия форм firstForm, topForm, questionForm, callorderForm
export interface ClickInt {
    typeofform: number 
    typeofact?: string
}

// Интерфейс для данных из всех форм
export interface OrdersInt {
    id?: string
    name?: string 
    phone: string 
    email?: string
    typeofact: string
    typeofform?: number
    status?: boolean
    promo?: string
    text?: string
    date?: Date    
}
