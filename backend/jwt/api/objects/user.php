<?php
// объект 'user' 
class User {
 
    // подключение к БД таблице "users" 
    private $conn;
    private $table_name = "users";
 
    // свойства объекта 
    public $id;
    public $firstname;
    public $lastname;
    public $email;
    public $password;
 
    // конструктор класса User 
    public function __construct($db) {
        $this->conn = $db;
    }

    // Создание нового пользователя 
    function create() {
    
        // Вставляем запрос 
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    firstname = :firstname,
                    lastname = :lastname,
                    email = :email,
                    password = :password";
    
        // подготовка запроса 
        $stmt = $this->conn->prepare($query);
    
        // инъекция 
        $this->firstname=htmlspecialchars(strip_tags($this->firstname));
        $this->lastname=htmlspecialchars(strip_tags($this->lastname));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->password=htmlspecialchars(strip_tags($this->password));
    
        // привязываем значения 
        $stmt->bindParam(':firstname', $this->firstname);
        $stmt->bindParam(':lastname', $this->lastname);
        $stmt->bindParam(':email', $this->email);
    
        // для защиты пароля 
        // хешируем пароль перед сохранением в базу данных 
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);
    
        // Выполняем запрос 
        // Если выполнение успешно, то информация о пользователе будет сохранена в базе данных 
        if($stmt->execute()) {
            return true;
        }
    
        return false;
    }

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
    
    // обновить запись пользователя 
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

}
