
<?php

  $request_body = file_get_contents("php://input");
  $data = json_decode($request_body);

  //Make sure that it is a POST request.
  if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0){
    throw new Exception('Metoda nie jest POST!');
  }

  //Make sure that the content type of the POST request has been set to application/json
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
  if(strcasecmp($contentType, 'application/json') != 0){
    throw new Exception('Content musi byc: application/json');
  }

    //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));
  
  //Attempt to decode the incoming RAW post data from JSON.
  $decoded = json_decode($content, true);
  
  //If json_decode failed, the JSON is invalid.
  if(!is_array($decoded)){
      throw new Exception('Received content contained invalid JSON!');
  }

  $name = $email = $text = '';

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($decoded['name']);
    $email = test_input($decoded['email']);
    $text = test_input($decoded['text']);
  }

  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  $to = "kontakt@rwd-stronyinternetowe.pl";
  $from = $email;
  $subject = "Nowa wiadomość ze strony";
  $message = '<b>Imię:</b> '.$name. ' <br><b>Email:</b> ' .$email. ' <p><b>Wiadomość: </b>'.$text.'</p>';
  // $message = "Wiadomosc od:</p>.$name";
  $headers .= "From: " . $name . "<" . $email . ">\r\n" .
            "Reply-To: " . $email . "\r\n" .
            "MIME-Version: 1.0" . "\r\n" .
            "Content-Type:text/html;charset=UTF-8" . "\r\n";
  if(mail($to, $subject, $message, $headers)) {
    echo("Success");
  } else {
    echo("Coś nie tak z przesłaniem wiadomości. Zadzwoń: 510 502 081");
  }

?>