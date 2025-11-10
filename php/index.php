<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $first_name = htmlspecialchars(trim($_POST['first_name']));
    $last_name = htmlspecialchars(trim($_POST['last_name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $tariff = htmlspecialchars(trim($_POST['tariff']));
    
    // Настройки почты
    $to = "jahanger1119@gmail.com"; // Ваш email
    $subject = "Новая заявка с сайта";
    
    // Текст письма
    $message = "
    <html>
    <head>
        <title>Новая заявка</title>
    </head>
    <body>
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> {$first_name}</p>
        <p><strong>Фамилия:</strong> {$last_name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Телефон:</strong> {$phone}</p>
        <p><strong>Тариф:</strong> {$tariff}</p>
        <p><strong>Дата:</strong> " . date('Y-m-d H:i:s') . "</p>
    </body>
    </html>
    ";
    
    // Заголовки
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: no-reply@yoursite.com" . "\r\n";
    
    // Отправка письма
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>