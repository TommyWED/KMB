// 路線列表數據 https://data.etabus.gov.hk/v1/transport/kmb/route/
// 巴士站列表數據 https://data.etabus.gov.hk/v1/transport/kmb/stop
// 巴士站數據 https://data.etabus.gov.hk/v1/transport/kmb/stop/{stop_id}
// 路線-巴士站 列表數據 https://data.etabus.gov.hk/v1/transport/kmb/route-stop
// 路線-巴士站數據 https://data.etabus.gov.hk/v1/transport/kmb/route-stop/{route}/{direction}/{service_type}
// 預計到達時間數據  https://data.etabus.gov.hk/v1/transport/kmb/eta/{stop_id}/{route}/{service_type}
// 預計到達時間數據(巴士站) https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/{stop_id}
// 預計到達時間數據(路線) https://data.etabus.gov.hk/v1/transport/kmb/route-eta/{route}/{service_type}

// fetch("https://data.etabus.gov.hk/v1/transport/kmb/route/")
// .then(res=>res.json())
// .then(function(data){
//   console.log(data)
//   // for(i=0;i<100;i++){
//   //   var newp = document.createElement("p")
//   //   newp.innerHTML = "route: " +data.data[i].route
//   //   document.querySelector(".route").appendChild(newp)
//   // }
// })

// fetch("https://data.etabus.gov.hk/v1/transport/kmb/route-eta/272K/1")
// .then(res=>res.json())
// .then(function(data){
//   console.log(data)
//   for (i=0;i<3;i++){
//     var etat = document.createElement("li")
//     etat.innerHTML = data.data[i].eta
//     document.querySelector(".route").appendChild(etat)
//   }
// })

// const findServiceType = (input) =>{
// }

var boundIndex = "O"

const findRoute = () =>{
  console.log("start")
  var count = 0;
  boundIndex = "O"
  document.querySelector(".stop").innerHTML = ""
  let sR = document.querySelector("#searchroute").value
  sR = sR.toUpperCase()
  console.log(sR)
  fetch("https://data.etabus.gov.hk/v1/transport/kmb/route-stop")
  .then(res=>res.json())
  .then(function(data){
    console.log(data)
    addStart()
    for(i=0;i<data.data.length;i++){
      
      if(data.data[i].route === sR && data.data[i].bound ==boundIndex){
        count++
        var newStop = document.createElement("div")
        newStop.classList.add("stopdiv")
        newStop.innerHTML = `${count}.` + stopobj[data.data[i].stop]
        newStop.setAttribute("data-stopid",data.data[i].stop)
        newStop.setAttribute("data-bound",data.data[i].bound)
        newStop.setAttribute("data-index",count)
        newStop.addEventListener("click",showetatime)
        console.log(stopobj[data.data[i].stop])
        document.querySelector(".stop").appendChild(newStop)
      }
    }
    addEnd()
  count = 0
  })
  console.log("work")
}


const addStart = ()=>{
  var newStop = document.createElement("h3")
  newStop.innerHTML = "頭站"
  document.querySelector(".stop").appendChild(newStop)
}

const addEnd =()=>{
  var newStop = document.createElement("h3")
  newStop.innerHTML = "尾站"
  document.querySelector(".stop").appendChild(newStop)
}
const stopobj ={}
fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop")
.then(res3=>res3.json())
.then(function(datas){
  console.log(datas)
  for(i=0;i<datas.data.length;i++){
    stopobj[datas.data[i].stop] = datas.data[i].name_tc
  }
  console.log(stopobj)
})

const showetatime =()=>{
  var et = event.target
  var stopId = et.dataset.stopid
  var num = 0
  console.log(stopId)
  fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stopId}`)
  .then(ressi=>ressi.json())
  .then(function(datasi){
    console.log(datasi)
    document.querySelector(".time ul").innerHTML = ""
    for (i=0;i<datasi.data.length;i++){
      if (datasi.data[i].route === document.querySelector("#searchroute").value.toUpperCase() && datasi.data[i].dir == et.dataset.bound && num <3){
        num++
        var newTime = document.createElement("li")
        newTime.innerHTML = datasi.data[i].eta
        document.querySelector(".time ul").appendChild(newTime)
      }
    }
    document.querySelector(".time").style.display = "flex"
  })
}

const hide = () =>{
  document.querySelector(".time").style.display = "none"
}

const revBound = () =>{
  var count = 0;
  if (boundIndex == "O"){
    boundIndex = "I"
  }else{
    boundIndex = "O"
  }
  document.querySelector(".stop").innerHTML = ""
  let sR = document.querySelector("#searchroute").value
  sR = sR.toUpperCase()
  console.log(sR)
  fetch("https://data.etabus.gov.hk/v1/transport/kmb/route-stop")
  .then(res=>res.json())
  .then(function(data){
    console.log(data)
    addStart()
    for(i=0;i<data.data.length;i++){
      if(data.data[i].route === sR && data.data[i].bound == boundIndex){
        count++
        var newStop = document.createElement("div")
        newStop.classList.add("stopdiv")
        newStop.innerHTML = `${count}.` + stopobj[data.data[i].stop]
        newStop.setAttribute("data-stopid",data.data[i].stop)
        newStop.setAttribute("data-bound",data.data[i].bound)
        newStop.setAttribute("data-index",count)
        newStop.addEventListener("click",showetatime)
        console.log(stopobj[data.data[i].stop])
        document.querySelector(".stop").appendChild(newStop)
      }
    }
    addEnd()
    count = 0
  })
  
}
