<?php 

$records = array(
    "foo",
    "bar",
    "baz",
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet"
);
$records = array_merge(...array_fill(0, 1000, $records));

$skip = 0;
$take = 4; 

if(isset($_GET["skip"])) {
    $skip = $_GET["skip"];
} 
if(isset($_GET["take"])) {
    $take = $_GET["take"];
}

$response = array_slice($records, $skip, $take);

print(json_encode($response));