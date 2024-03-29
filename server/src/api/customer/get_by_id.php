<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: GET');

    include_once '../../config/database.php';
    include_once '../../models/customer.php';
    include_once '../../libs/sess.php';
    include_once '../../libs/authorization.php';

    $database = new Database();
    $db = $database->connect();

    $customer = new Customer($db);

    $param = isset($_GET['id']) ? $_GET['id'] : die();

//     sess::start($param);
//     $valid = Authorization::validation($param);
// //    sess::shutdown();

//     if (!$valid){
//         echo json_encode([
//             'message' => 'require user',
//             'success' => false
//         ]);
//         return;
//     }

    $result = $customer->getCustomerByID($param);
    $num = mysqli_num_rows($result);

    if($num){
        $row = mysqli_fetch_assoc($result);
        $resultJSON['data'] = array();
        $data = array(
            "customer_id" => $row['customer_id'],
            "first_name" => $row['first_name'],
            "last_name" => $row['last_name'],
            "email_id" => $row['email_id'],
            "phone_no" => $row['phone_no'],
            "city" => $row['city'],
            "role" => $row['role'],
            "avatar" => $row['avatar']
        );
        $resultJSON['data'][] = $data;
        echo json_encode($resultJSON);
    }
    else {
        echo json_encode(array(
            "error" => "no customer was found",
        ));
    }
    $db->close();