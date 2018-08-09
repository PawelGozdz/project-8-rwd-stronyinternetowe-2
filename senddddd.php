<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = nl2br($_POST['message']);
    $to = "kontakt@rwd-stronyinternetowe.pl";
    $from = $email;
    $subject = "Nowa wiadomość ze strony";
    $message = '<b>Imię:</b> '.$name. ' <br><b>Email:</b> ' .$emaiil. ' <p>'.$message.'</p>';
    $headers = "From: " . $name . "<" . $email . ">\r\n" .
              "Reply-To: " . $email . "\r\n" .
              "MIME-Version: 1.0" . "\r\n" .
              "Content-type:text/html;charset=UTF-8" . "\r\n";
    if(mail($to, $subject, $message, $headers)) {
      echo("Success");
    } else {
      "Nie udało sie wysłać wiadomości ze skryptu PHP"
    }

?>
