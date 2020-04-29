<?php
// объект 'Order' 
class Order {
 
    // подключение к БД таблице "orders" 
    private $conn;
    private $table_name = "orders";
 
    // свойства объекта 
    public $order_id;
    public $order_form_type;
    public $order_typeofact;
    public $order_name;
    public $order_phone;
    public $order_email;
    public $order_promo;
    public $order_text;    
 
    // конструктор класса Order 
    public function __construct($db) {
        $this->conn = $db;
    }

    // Создание нового заказа 
    function create() {
    
        // Вставляем запрос 
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    order_name = :order_name,
                    order_phone = :order_phone,
                    order_typeofact = :order_typeofact,
                    order_email = :order_email,
                    order_text = :order_text,
                    order_promo = :order_promo,
                    order_form_type = :order_form_type                                        
        ";       

        // подготовка запроса 
        $stmt = $this->conn->prepare($query);
    
        // инъекция 
        $this->order_name=htmlspecialchars(strip_tags($this->order_name));
        $this->order_phone=htmlspecialchars(strip_tags($this->order_phone));
        $this->order_typeofact=htmlspecialchars(strip_tags($this->order_typeofact));
        $this->order_email=htmlspecialchars(strip_tags($this->order_email));

        // из order_text убарно удаление html тегов и преобразование символов
        $this->order_text=$this->order_text;

        $this->order_promo=htmlspecialchars(strip_tags($this->order_promo));
        $this->order_form_type=htmlspecialchars(strip_tags($this->order_form_type));
        
        // привязываем значения 
        $stmt->bindParam(':order_name', $this->order_name);
        $stmt->bindParam(':order_phone', $this->order_phone);
        $stmt->bindParam(':order_typeofact', $this->order_typeofact);
        $stmt->bindParam(':order_email', $this->order_email);
        $stmt->bindParam(':order_text', $this->order_text);
        $stmt->bindParam(':order_promo', $this->order_promo);   
        $stmt->bindParam(':order_form_type', $this->order_form_type);  
    
        // Выполняем запрос 
        // Если выполнение успешно, то информация о новом заказе будет сохранена в базе данных 
        if($stmt->execute()) {
            return true;
        }
    
        return false;
    }

/*

    // здесь будет метод emailExists() 

    // Проверка, существует ли электронная почта в нашей базе данных 
    function emailExists(){
    
        // запрос, чтобы проверить, существует ли электронная почта 
        $query = "SELECT id, firstname, lastname, password
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";
    
        // подготовка запроса 
        $stmt = $this->conn->prepare( $query );
    
        // инъекция 
        $this->email=htmlspecialchars(strip_tags($this->email));
    
        // привязываем значение e-mail 
        $stmt->bindParam(1, $this->email);
    
        // выполняем запрос 
        $stmt->execute();
    
        // получаем количество строк 
        $num = $stmt->rowCount();
    
        // если электронная почта существует, 
        // присвоим значения свойствам объекта для легкого доступа и использования для php сессий 
        if($num>0) {
    
            // получаем значения 
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
            // присвоим значения свойствам объекта 
            $this->id = $row['id'];
            $this->firstname = $row['firstname'];
            $this->lastname = $row['lastname'];
            $this->password = $row['password'];
    
            // вернём 'true', потому что в базе данных существует электронная почта 
            return true;
        }
    
        // вернём 'false', если адрес электронной почты не существует в базе данных 
        return false;
    }    

    // здесь будет метод update()
    
    // обновить запись заказа
    public function update(){
    
        // Если в HTML-форме был введен пароль (необходимо обновить пароль) 
        $password_set=!empty($this->password) ? ", password = :password" : "";
    
        // если не введен пароль - не обновлять пароль 
        $query = "UPDATE " . $this->table_name . "
                SET
                    firstname = :firstname,
                    lastname = :lastname,
                    email = :email
                    {$password_set}
                WHERE id = :id";
    
        // подготовка запроса 
        $stmt = $this->conn->prepare($query);
    
        // инъекция (очистка) 
        $this->firstname=htmlspecialchars(strip_tags($this->firstname));
        $this->lastname=htmlspecialchars(strip_tags($this->lastname));
        $this->email=htmlspecialchars(strip_tags($this->email));
    
        // привязываем значения с HTML формы 
        $stmt->bindParam(':firstname', $this->firstname);
        $stmt->bindParam(':lastname', $this->lastname);
        $stmt->bindParam(':email', $this->email);
    
        // метод password_hash () для защиты пароля пользователя в базе данных 
        if(!empty($this->password)){
            $this->password=htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);
        }
    
        // уникальный идентификатор записи для редактирования 
        $stmt->bindParam(':id', $this->id);
    
        // Если выполнение успешно, то информация о пользователе будет сохранена в базе данных 
        if($stmt->execute()) {
            return true;
        }
    
        return false;
    }

    */

}
