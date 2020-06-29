const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")
const app=express()
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')
let temp ="";
let descr="";
let icon="";
let imageUrl="";
app.get("/",function(req,res){
  res.render("weather")
    })
app.use(express.static("public"));
app.post("/",function(req,res){

  const city=req.body.cityName
  const key=*****************
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units=metric"
  https.get(url,function(response){
    console.log(response.statusCode)

    response.on("data",function(data){

      const weatherData=JSON.parse(data);
      temp=weatherData.main.temp
      descr=weatherData.weather[0].description
      icon=weatherData.weather[0].icon
      imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.render("result",{temp:temp,city:city,description:descr,imgUrl:imageUrl})






})
})
})




app.listen(3000,function(){
  console.log("Server is ready on posrt 3000.")
})
