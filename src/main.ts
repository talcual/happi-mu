


exports.server = (event:any,context:any,cb:any) => {
    let jsonResponse = {"hello":"world"}
    const response = {
        statusCode: 200,
        body: JSON.stringify(jsonResponse),
    };

    cb(response);

}