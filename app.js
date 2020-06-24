const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    })
app.use(express.static("public"));
app.post("/",function(req,res){

  const city=req.body.cityName
  const key="b8da891fcba986a496291ea5f442d43c"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units=metric"
  https.get(url,function(response){
    console.log(response.statusCode)

    response.on("data",function(data){

      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp
      const descr=weatherData.weather[0].description
      const icon=weatherData.weather[0].icon
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
      // const image = __dirname+"images/Weather.png"
      console.log(descr);
      // res.write("<img  src="+image+">")
    
      res.write("<body>")
      res.write("<style>  body{ background-color: #ddf3f5;text-align: center;font-family: 'Ubuntu', sans-serif;margin-top: 50px;}</style>")
      res.write("<h1>Temperature In "+city+" is "+temp+" degree Celsius.</h1>")
      res.write("<h3>Weather in "+city+" is "+descr+" !</h3>")
      res.write("<img src="+imageUrl+">")
      res.write("</body>")
      res.send()
})
})
})




app.listen(3000,function(){
  console.log("Server is ready on posrt 3000.")
})
