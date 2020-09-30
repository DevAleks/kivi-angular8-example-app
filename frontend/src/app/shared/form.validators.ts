import { FormControl } from '@angular/forms'

export class FormValidators {

    // Валидатор для userName
    static userName(control: FormControl): {[key: string]: boolean} {

        const pattern = /^[а-яА-Яa-zA-Z\ ]*$/        

        if (pattern.test(control.value)) {
        return null
        }        
        return {userNamePattern: true}
    }    

    // Валидатор для userPhone
    static userPhone(control: FormControl): {[key: string]: boolean} {

        const pattern = /^[0-9a-z\-\+\(\)\ ]*$/
        
        if (pattern.test(control.value)) {
          return null
        }        
        return {userPhonePattern: true}
      }      

    // Валидатор для userPromo
    static userPromo(control: FormControl): {[key: string]: boolean} {

        const pattern = /^[0-9а-яА-Яa-zA-Z\ ]*$/        

        if (pattern.test(control.value)) {
        return null
        }        
        return {userPromoPattern: true}
    }  

    // Валидатор для userText
    static userText(control: FormControl): {[key: string]: boolean} {

        const pattern = /^[а-яА-Яa-zA-Z0-9\-\+\(\)\:\ \n]*$/        

        if (pattern.test(control.value)) {
        return null
        }        
        return {userTextPattern: true}
    }     

}
