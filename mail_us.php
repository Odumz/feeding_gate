<?php
    $errors = '';
$myemail = 'feedinggatefoundation@gmail.com';

if(empty($_POST['Name'])  ||
   empty($_POST['Email']) ||
   empty($_POST['Message']))
{
    $errors .= "\n Error: all fields are required";
}
$name = $_POST['Name'];
$email_address = $_POST['Email'];
$message = $_POST['Message'];
$phone = $_POST['Phone'];
$subject = $_POST['Subject'];
if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i",
$email_address))
{
    $errors .= "\n Error: Invalid email address";
}

if( empty($errors))
{
$to = $myemail;
$email_subject = "Contact Form Submission: $name";
$email_body = "You have received a new message. ".
" Here are the details:\n Name: $name \n ".
"Email: $email_address\n Phone Number: $phone\n Subject: $subject\n Message: \n $message\n ";
$headers = "From: $myemail\n";
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
    
header('Location: about.html');
}
?>