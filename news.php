<?php
    $errors = '';
$myemail = 'feedinggatefoundation@gmail.com';

if(empty($_POST['Email']))
{
    $errors .= "\n Error: all fields are required";
}
$email_address = $_POST['Email'];
if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i",
$email_address))
{
    $errors .= "\n Error: Invalid email address";
}

if( empty($errors))
{
$to = $myemail;
$email_subject = "Newsletter Subscription";
$email_body = "You have a new subscriber. ".
" Here is the email address:\n Email: $email_address\n";
$headers = "From: $myemail\n";
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
    
header("Location: {$_SERVER['HTTP_REFERER']}");
exit;
}
?>