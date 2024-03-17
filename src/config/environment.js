const environment = process.env.NODE_ENV === "development" ? 
"http://127.0.0.1:8000/api/v1" :
"http://127.0.0.1:8000/api/v1" ;

export default environment;