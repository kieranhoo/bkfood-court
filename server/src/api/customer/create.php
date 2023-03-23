<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');

    include_once '../../config/database.php';
    include_once '../../models/customer.php';

    // init database
    $database = new Database();
    $db = $database->connect();

    // init new customer object
    $customer = new Customer($db);
    //get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $customer->customer_id = $data->customer_id;
    $customer->first_name = $data->first_name;
    $customer->last_name = $data->last_name;
    $customer->email_id = $data->email_id;
    $customer->password = $data->password;
    $customer->phone_no = $data->phone_no;
    $customer->landmark = $data->landmark;
    $customer->pincode = $data->pincode;

    if($customer->create()) {
        echo json_encode(
            array('message' => 'customer created')
        );
    }
    else{
        echo json_encode(
            array('message' => 'customer not created')
        );
    }
