<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$caption = $_POST['caption'];
$price = $_POST['price'];
$type = $_POST['type'];

$target = "vlad.tiw27@gmail.com";


if($type == "order") {
    $title = "Новый заказ: $caption";
    $details = "Название: $caption\nЦена: $price\nИмя: $name\nТелефон: $phone";
} else {
    $title = "Запрос звонка: $phone";
    $details = "Имя: $name\nТелефон: $phone";
}


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 2;                               // Enable verbose debug output
// $mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'colacat1927@gmail.com';                 // Наш логин
$mail->Password = 'rkzpbhyvtclnugxl';                           // Наш пароль от ящика

$mail->SMTPSecure = "ssl";
$mail->Port = 465;                                // TCP port to connect to
 
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);


$mail->setFrom('colacat1927@gmail.com', $type);   // От кого письмо 
$mail->addAddress($target);     // Add a recipient
    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML


$mail->Subject = $title;
$mail->Body = $details;


if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>