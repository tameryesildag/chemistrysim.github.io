///<reference path="p5.d.ts"/>
///<reference path="matter.d.ts"/>
var canvas;
var _info;
var hidrojen;
var renderacik = false;
var tiklandi = 0;
var secilenobje;

let img = [];
var boxes = [];
let entiler = [];

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies
var Render = Matter.Render;
var engine;
var world;

var ground;
var solduvar;
var sagduvar;

var karbondioksitler = [];

var hidrojen2ler = [];

var benimvarim;
var tikmetre;
var tiksayisi = 0;

var benimvarim2;
var hedefr;
var hedefg;
var hedefb;
var tiksayisi2 = 0;

var benimvarim3;
var hedefr2;
var hedefg2;
var hedefb2;
var tiksayisi3 = 0;


var mesaj = "";
var myVar;
var sonmesaj = "";

var asilisim;
var sivi = {
    tabany:0,
    tabanyukseklik:0,
    cikti: 0,
    siviyuksekligi:0,
    xbosluk: 15,
    w: 0,
    theta: 0.0,
    amplitude: 5.0,
    period: 1000.0,
    dx:0,
    ydegerleri:0,
    r:66,  
    g:134,
    b:244,
    sivitipi:0 // 1:su    2:fenolftalein   3:metiloranj
};

var karbondioksit = {
    x:0,
    y:0
}

function preload() {
  engine = Engine.create();
  world = engine.world;
  loadImages();
}

function setup() {
    myVar = setInterval(olayGunluguEvent, 100);
    canvas = createCanvas(document.body.clientWidth, document.body.clientHeight - 46);
    background(242, 244, 247);
    canvas.parent('sketch-holder');
    var params = {
        isStatic: true
      }
    ground = Bodies.rectangle(document.body.clientWidth / 2, document.body.clientHeight, document.body.clientWidth, 100, params);
    solduvar = Bodies.rectangle(-92,canvas.height,200,10000,params);
    sagduvar = Bodies.rectangle(canvas.width + 80,canvas.height,200,10000,params);
    World.add(world, ground);
    World.add(world, solduvar);
    World.add(world, sagduvar);
    Engine.run(engine);

    if(renderacik){
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: canvas.width,
            height: canvas.height
        }
    }); 

    Render.run(render); 
} 
    for(let _box of boxes){
        World.add(world, _box);
        Matter.Body.setInertia(_box, Infinity);
    }
    world.gravity.y = 1.5;
    sivi.w = canvas.width + 16;
    sivi.dx = (TWO_PI / sivi.period) * sivi.xbosluk;
    sivi.ydegerleri = new Array(floor(sivi.w/sivi.xbosluk));
    sivi.siviyuksekligi = canvas.height / 2 + canvas.height / 3;
    sivi.tabanyukseklik = sivi.siviyuksekligi;
    sivi.tabany = canvas.height - canvas.height / 7;
    olayGunluguEvent();
}

function draw() {
    background(242, 244, 247);
    entirender();

if(karbondioksitler[0] != null){
    for(let _karbondioksit of karbondioksitler){
       image(img[imagebul("karbondioksit")], _karbondioksit.x , _karbondioksit.y, img[imagebul("karbondioksit")].width / 2, img[imagebul("karbondioksit")].height / 2);
        _karbondioksit.y -= 1.3;
    }
} 

if(hidrojen2ler[0] != null){
    for(let _hidrojen2 of hidrojen2ler){
        image(img[imagebul("hidrojen2")], _hidrojen2.x, _hidrojen2.y, img[imagebul("hidrojen2")].width / 2, img[imagebul("hidrojen2")].height / 2);
        _hidrojen2.y -= 1.3;
    }
}

if(entiler != null){
for(let oksijenolmasigereken of entiler){
for(let hidrojenolmasigereken of entiler){
    for(let hidrojenolmasigereken2 of entiler){
      if(oksijenolmasigereken.name.includes("oksijen")){
          if(hidrojenolmasigereken.name.includes("hidrojen")){
              if(hidrojenolmasigereken2.name.includes("hidrojen") && hidrojenolmasigereken2.name != hidrojenolmasigereken.name){
                if(dist(oksijenolmasigereken.x,oksijenolmasigereken.y,hidrojenolmasigereken.x,hidrojenolmasigereken.y) < 50 && dist(oksijenolmasigereken.x,oksijenolmasigereken.y,hidrojenolmasigereken2.x,hidrojenolmasigereken2.y) < 50){
                 if(sivi.cikti == 0){
                    sucikart();
                 }
                 else{
                    siviarttir(200);
                 }
                   Matter.Body.setPosition(ground,{x: ground.position.x, y: sivi.siviyuksekligi - 60});
                   var silinecekler = [];
                   silinecekler.push(entiler.indexOf(oksijenolmasigereken),entiler.indexOf(hidrojenolmasigereken),entiler.indexOf(hidrojenolmasigereken2));
                   silinecekler.sort(function(a, b){return a-b});
                   yoket(silinecekler[2],silinecekler[1],silinecekler[0]);
                  }
              }
          }
       }

     }
   }
 }
 for(let potaskostikolmasigereken of entiler){
     for(let sulfirikolmasigereken of entiler){
         if(potaskostikolmasigereken.name.includes("potaskostik")){
             if(sulfirikolmasigereken.name.includes("sulfirik")){
                 if(dist(potaskostikolmasigereken.x,potaskostikolmasigereken.y,sulfirikolmasigereken.x,sulfirikolmasigereken.y) < 75){
                     if(sivi.cikti == 0){
                         sucikart();
                     }
                     else{
                         siviarttir(200);
                     }
                     var silinecekler = [];
                     silinecekler.push(entiler.indexOf(potaskostikolmasigereken),entiler.indexOf(sulfirikolmasigereken));
                     silinecekler.sort(function(a, b){return a-b});
                     yoket(silinecekler[1],silinecekler[0]);
                     entiekle("potasyumsulfat");
                 }
             }
         }
     }
 }

 for(let hidroklorikolmasigereken of entiler){
     for(let kalsiyumkarbonatolmasigereken of entiler){
      if(hidroklorikolmasigereken.name.includes("hidroklorik")){
        if(kalsiyumkarbonatolmasigereken.name.includes("kalsiyumkarbonat")){
            if(dist(hidroklorikolmasigereken.x,hidroklorikolmasigereken.y,kalsiyumkarbonatolmasigereken.x,kalsiyumkarbonatolmasigereken.y) < 75){
              if(sivi.cikti == 0){
                  sucikart();
              }
              else{
                  siviarttir(200);
              }
              var silinecekler = [];
              silinecekler.push(entiler.indexOf(hidroklorikolmasigereken),entiler.indexOf(kalsiyumkarbonatolmasigereken));
              silinecekler.sort(function(a,b){return a-b});
              yoket(silinecekler[1],silinecekler[0]);
              entiekle("kalsiyumklorur");
              karbondioksitcikart();
            }
        }
     }
  }  
}

for(let magnezyumolmasigereken of entiler){
    for(let sulfirikolmasigereken of entiler){
        if(magnezyumolmasigereken.name.includes("magnezyum")){
            if(sulfirikolmasigereken.name.includes("sulfirik")){
                if(dist(magnezyumolmasigereken.x,magnezyumolmasigereken.y,sulfirikolmasigereken.x,sulfirikolmasigereken.y) < 75){
                  var silinecekler = [];
                  silinecekler.push(entiler.indexOf(sulfirikolmasigereken), entiler.indexOf(magnezyumolmasigereken));
                  silinecekler.sort(function(a,b) {return a-b});
                  yoket(silinecekler[1],silinecekler[0]);
                  entiekle("magnezyumsulfat");
                  hidrojen2cikart();
                }
            }
        }
    }
}

for(let kalsiyumoksitolmasigereken of entiler){
    for(let karbonikasitolmasigereken of entiler){
        if(kalsiyumoksitolmasigereken.name.includes("kalsiyumoksit")){
            if(karbonikasitolmasigereken.name.includes("karbonikasit")){
                if(dist(kalsiyumoksitolmasigereken.x,kalsiyumoksitolmasigereken.y,karbonikasitolmasigereken.x,karbonikasitolmasigereken.y) < 75){
                    if(sivi.cikti == 0){
                        sucikart();
                    }
                    else{
                        siviarttir(200);
                    }
                    var silinecekler = [];
                    silinecekler.push(entiler.indexOf(kalsiyumoksitolmasigereken), entiler.indexOf(karbonikasitolmasigereken));
                    silinecekler.sort(function(a,b) {return a-b});
                    yoket(silinecekler[1], silinecekler[0]);
                    entiekle("kalsiyumkarbonat");
                }
            }
        }
    }
}

 for(let bazolmasigereken of entiler){
     if(bazolmasigereken.name.includes("potaskostik")){
         if(sivi.cikti == 1 && sivi.sivitipi == 2){
           if(bazolmasigereken.y >= sivi.siviyuksekligi - 50){
            sivi.sivitipi == 0;   
            yoket(entiler.indexOf(bazolmasigereken));
            sivirenkdegistir(224, 100, 222);
          }
        } 
    } 
 }

for(let bazolmasigereken of entiler){
    if(bazolmasigereken.name.includes("potaskostik")){
        if(sivi.cikti == 1 && sivi.sivitipi == 3){
            if(bazolmasigereken.y >= sivi.siviyuksekligi - 50){
                sivi.sivitipi == 0;
                yoket(entiler.indexOf(bazolmasigereken));
                sivirenkdegistir(226, 181, 15);
            }
        }
    }
} 

for(let asitolmasigereken of entiler){
    if(asitolmasigereken.name.includes("sulfirik") || asitolmasigereken.name.includes("hidroklorik")){
        if(sivi.cikti == 1 && sivi.sivitipi == 3){
          if(asitolmasigereken.y >= sivi.siviyuksekligi - 50){
              sivi.sivitipi == 0;
              yoket(entiler.indexOf(asitolmasigereken));
              sivirenkdegistir(214, 29, 29);
          }
        }
    }
} 

if(sivi.cikti == 1){
    calcWave();
    renderWave();
  }
 }

}

function yoket(){
if(arguments == null){
entiler = [];
for(let _box of boxes){
    Matter.Composite.remove(world, _box);
}
boxes = [];
tiklandi = 0;
secilenobje = -1;
}

else{
    for(let _var of arguments){
      entiler.splice(_var,1);
      Matter.Composite.remove(world, boxes[_var]);
      boxes.splice(_var,1);
      tiklandi = 0;
    }
}

}

function keyPressed() {
    if (keyCode === DELETE) {
      if(tiklandi == 1){
          yoket(secilenobje);
      }
    }
  }

function mousePressed() {
    if(mobilkontrol() == true){   //MOBIL
        for (let _enti of entiler) {
            if(tiklandi == 0){
            if(mouseX < _enti.x + _enti.width && mouseX > _enti.x && mouseY < _enti.y + _enti.height && mouseY > _enti.y){
                tiklandi = 1;
                secilenobje = entiler.indexOf(_enti);
                break;
            } 
        }
        else{
            if(_enti.name == entiler[secilenobje].name){
            _enti.x = mouseX;
            boxes[entiler.indexOf(_enti)].position.x = mouseX;
            _enti.y = mouseY;
            boxes[entiler.indexOf(_enti)].position.y = mouseY;
            }
            tiklandi = 0;
            secilenobje = -1;
            return;
        }
        }
    }

    else{    //PC
    if(mouseButton == LEFT){
        if(tiklandi == 1){
            tiklandi = 0;
            boxes[secilenobje].timeScale = 1;
            boxes[secilenobje].position.x = entiler[secilenobje].x;
            boxes[secilenobje].position.y = entiler[secilenobje].y;
            secilenobje = -1;
            document.getElementById("boxbox").style.visibility = 'hidden';
            return;
        }
    if(entiler != null){    
    for (let _enti of entiler) {
    if(mouseX < _enti.x + _enti.width && mouseX > _enti.x && mouseY < _enti.y + _enti.height && mouseY > _enti.y){
        tiklandi = 1;
        secilenobje = entiler.indexOf(_enti);
        boxes[secilenobje].timeScale = 0;
        asilisim = _enti.name.replace(/[0-9]/g, '');
        var src;
        src = asilisim
        src = "Images/" + src + "png";
        document.getElementById("typeid").innerHTML = getType(asilisim);
        document.getElementById("nameid").innerHTML = getID(asilisim);
        if(getType(asilisim) == "Element"){
            document.getElementById("numberid").innerHTML = "(" + getNumber(asilisim) + ")"; 
        }
        else{
            document.getElementById("numberid").innerHTML = " "; 
        }
        document.getElementById("boxbox").style.visibility = 'visible';
        document.getElementById("elementimg").src =src;
     } 
    }
   }
  }
 }
}


function olayGunluguEvent(){
mesaj = "";
mesaj += ("\ncanvas width: " + canvas.width + " canvas height: " + canvas.height); 
mesaj += ("\ntiklandi: " + tiklandi);
try{   
mesaj += ("\nseçilen obje: " + secilenobje + " isim: " + entiler[secilenobje].name);
}
catch(error){
    mesaj += ("\nnull");
}
mesaj += ("\nmouseX: " + mouseX + " mouseY: " + mouseY);
if(entiler != null){
for (let _enti of entiler) {
    mesaj += ("\nentiler[" + entiler.indexOf(_enti) + "].name: " + _enti.name + " x: " + _enti.x + " y: " + _enti.y + " width: " + _enti.width + " height: " + _enti.height);
 }
}
if(boxes != null){
for (let _box of boxes) {
    mesaj += ("\nboxes[" + boxes.indexOf(_box) + "]" + " x: " + _box.position.x + " y: " + _box.position.y)
 }
}
mesaj += ("\nground position: " + ground.position.y);
mesaj += ("\nimg length: " + img.length);
mesaj += ("\nsivi yüksekliği: " + sivi.siviyuksekligi);
mesaj += ("\nimg[0].height " + img[0].height);
var deneme = sivi.tabany - sivi.tabanyukseklik;
mesaj += ("\nYAZSANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA " + deneme); 
mesaj += ("\nsıvı.r: " + sivi.r + " sivi.g: " + sivi.g + " sivi.b: " + sivi.b);
mesaj += ("\nhedefr: " + hedefr + " hedefg: " + hedefg + " hedefb. " + hedefb);
if(mesaj == sonmesaj){
    return;
}
else{
    print(mesaj);
    print(sivi);
    sonmesaj = mesaj;
}
}


function mobilkontrol() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


function calcWave() {
    // Theta'nın artışı (açısal momentum için farklı değerler dene)
    sivi.theta += 0.10;
  
    //Her bir x için sin() fonksiyonu kullanarak bir y hesaplama
    var x = sivi.theta;
    for (var i = 0; i < sivi.ydegerleri.length; i++) {
      sivi.ydegerleri[i] = sin(x)*sivi.amplitude;
      x+=sivi.dx;
    }
  }
  

  function renderWave() {
    noStroke();
    fill(sivi.r, sivi.g, sivi.b); 
    // Her bir noktaya elips çizerek dalgayı oluştur
    for (var x = 0; x < sivi.ydegerleri.length; x++) {
      ellipse(x*sivi.xbosluk, sivi.siviyuksekligi+sivi.ydegerleri[x], 100, 100);
      for(y = sivi.siviyuksekligi+sivi.ydegerleri[x];y < canvas.height ;y+= 100){
      }
    }
     deneme = sivi.tabany - sivi.tabanyukseklik;
     rect(0,sivi.tabany,canvas.width,sivi.tabanyukseklik);  //sivi.tabanyukseklik 
     textSize(32);
     if(sivi.sivitipi == 1){
     fill(255,255,255);
     text('Water', 10, canvas.height - 20);  
     }
     if(sivi.sivitipi == 2){
     fill(0,0,0);
     text('Phenolphthalein', 10, canvas.height - 20); 
     }
     if(sivi.sivitipi == 3){
     fill(0,0,0);
     text('Methyl orange', 10, canvas.height - 20);
     }
  }


  function entiekle(isim){
    secilenobje = -1;
    var numara = 1;
    var olacakisim = isim + random(1,9999);
    if(entiler != null && boxes != null){
    }
    else{
        entiler = [];
        boxes = [];
    }
    print(img[imagebul(isim)]);
    var yenienti = new enti(olacakisim,img[imagebul(isim)].width,img[imagebul(isim)].height,imagebul(isim))
    print(yenienti);
    entiler.push(yenienti);
    boxes.push(Bodies.rectangle(yenienti.x,yenienti.y,img[yenienti.simage].width,img[yenienti.simage].height));
    Matter.Body.setInertia(boxes[boxes.length - 1], Infinity);
    World.add(world, boxes[boxes.length - 1]);
    print(olacakisim + " başarıyla oluşturuldu.");
    entirender();
    secilenobje = -1;
  }

  function imagebul(isim){
   switch(isim){
   case "hidrojen":
   return 0;
   case "oksijen":
   return 1;
   case "sulfirik":
   return 2;
   case "sülfirik":
   return 2;
   case "potaskostik":
   return 3;
   case "potasyumsulfat":
   return 4;
   case "hidroklorik":
   return 5;
   case "kalsiyumkarbonat":
   return 6;
   case "kalsiyumklorur":
   return 7; 
   case "karbondioksit":
   return 8;
   case "hidrojen2":
   return 9;
   case "magnezyum":
   return 10;
   case "magnezyumsulfat":
   return 11;
   case "kalsiyumoksit":
   return 12;
   case "karbonikasit":
   return 13;
   }
  }

  function sucikart(){
    if(sivi.cikti == 0){
        sivicikart();
        sivi.sivitipi = 1;
        sivi.r = 66;
        sivi.g = 134;
        sivi.b = 244;
        return;
    }
    if(sivi.cikti == 1 && sivi.sivitipi != 1){
        sivikaldir();
        sivicikart();
        sivi.sivitipi = 1;
        sivi.r = 66;
        sivi.g = 134;
        sivi.b = 244;
        return;
    }
    if(sivi.cikti == 1 && sivi.sivitipi == 1){
        if(tiksayisi == 0){
        siviarttir(200);
        }
    }
  }
  function sivicikart(){
      if(sivi.cikti == 0){   
      sivi.cikti = 1;
      for(let _box of boxes)
      
      Matter.Body.applyForce(_box,{x: 0, y: 0}, {x: 0, y: -0.1});
      }
      else{
          if(tiksayisi == 0){
          siviarttir(200);
          }
          return;
      }
      Matter.Body.setPosition(ground,{x: ground.position.x, y: sivi.siviyuksekligi - 60});
      for(let _box of boxes){
         entiler[boxes.indexOf(_box)].y = 10;
         Matter.Body.setPosition(_box,{x: _box.position.x, y: 10})
      }
  }
  function fenolftaleincikart(){
      if(sivi.cikti == 0){
          sivicikart();
          sivi.r = 202;
          sivi.g = 206;
          sivi.b = 206;
      }
      if(sivi.cikti == 1 && sivi.sivitipi != 2){
      sivikaldir();
      sivicikart();
      sivi.r = 202;
      sivi.g = 206;
      sivi.b = 206;
      benimvarim2 = setInterval(fenoftaleinrenkdegistirmeislem, 100);
      sivi.sivitipi = 2;
      }
      if(sivi.cikti == 1 && sivi.sivitipi == 2){
          if(tiksayisi == 0){
       siviarttir(200);
          }
      }
  }
  function fenoftaleinrenkdegistirmeislem(){
    if(sivi.sivitipi == 2){
    if(sivi.r < hedefr){
        sivi.r += 1;
    }
    if(sivi.g < hedefg){
        sivi.g += 1;
    }
    if(sivi.b < hedefb){
        sivi.b += 1;
    }
     
    if(sivi.r > hedefr){
        sivi.r -= 1;
    }
    if(sivi.g > hedefg){
        sivi.g -= 1;
    }
    if(sivi.b > hedefb){
        sivi.b -= 1;
    }
    }
  }

  function metiloranjcikart(){
    if(sivi.cikti == 0){
        sivicikart();
        sivi.r = 202;
        sivi.g = 206;
        sivi.b = 206;
    }
    if(sivi.cikti == 1 && sivi.sivitipi != 3){
    sivikaldir();
    sivicikart();
    sivi.r = 202;
    sivi.g = 206;
    sivi.b = 206;
    benimvarim3 = setInterval(metiloranjrenkdegistirmeislem, 100);
    sivi.sivitipi = 3;
    }
    if(sivi.cikti == 1 && sivi.sivitipi == 3){
        if(tiksayisi == 0){
          siviarttir(200);
        }
    }
  }

  function metiloranjrenkdegistirmeislem(){
    if(sivi.sivitipi == 3){
    if(sivi.r < hedefr){
        sivi.r += 1;
    }
    if(sivi.g < hedefg){
        sivi.g += 1;
    }
    if(sivi.b < hedefb){
        sivi.b += 1;
    }
     
    if(sivi.r > hedefr){
        sivi.r -= 1;
    }
    if(sivi.g > hedefg){
        sivi.g -= 1;
    }
    if(sivi.b > hedefb){
        sivi.b -= 1;
    }
    }
  }
  function entirender(){
    if(tiklandi == 1){
        if(entiler != null){
        for (let _enti of entiler) {
        var entisirasi = entiler.indexOf(_enti);
        if(mouseX > 0 && mouseX < canvas.width){
             if(_enti.name == entiler[secilenobje].name){
                 _enti.x = mouseX;
                 boxes[entisirasi].position.x = mouseX;
             }
         }
         if(mouseY > 0 && mouseY < canvas.height){
          if(_enti.name == entiler[secilenobje].name){
              _enti.y = mouseY;
              boxes[entisirasi].position.y = mouseY;
          }
         }
         if(_enti.name == entiler[secilenobje].name){
  
         }
         image(img[_enti.simage],_enti.x,_enti.y,img[_enti.simage].width,img[_enti.simage].height);
      }
      }    
  }
      

  if(entiler != null){
    for (let _enti of entiler) {
        if(boxes[entiler.indexOf(_enti)] != null){
        if(entiler.indexOf(_enti) != secilenobje){
        _enti.x = boxes[entiler.indexOf(_enti)].position.x;
        if(_enti.y < canvas.height - _enti.height){
        _enti.y = boxes[entiler.indexOf(_enti)].position.y;
        }
        else{
            _enti.y = canvas.height - _enti.height;
        }
        image(img[_enti.simage],_enti.x,_enti.y,_enti.width,_enti.height);
        }
        }
      }  
    }
  }

  function siviarttir(toplamartisyukseklik){
   print("sivi ARTTIRMA FONKSIYONU TETIKLENDI");
   tikmetre = 1.5;
   benimvarim = setInterval(siviarttirmaislem, 100);
  }
  function siviarttirmaislem(){
      print("TIKSAYISI: " + tiksayisi)
      if(tiksayisi == 30){
          clearInterval(benimvarim);
          tiksayisi = 0;
          return;
      }
       sivi.siviyuksekligi -= tikmetre;
       sivi.tabanyukseklik += tikmetre + 0.2;
       sivi.tabany -= tikmetre + 0.2;
       Matter.Body.setPosition(ground,{x: ground.position.x, y: ground.position.y - tikmetre});
       tiksayisi += 1;
  }
  function sivikaldir(){ 
      sivi.sivitipi = 0;
      sivi.cikti = 0;
      sivi.siviyuksekligi = canvas.height / 2 + canvas.height / 3;
      sivi.tabany = canvas.height - 100;
      sivi.tabanyukseklik = sivi.siviyuksekligi;
      Matter.Body.setPosition(ground,{x: document.body.clientWidth / 2, y: document.body.clientHeight - 30});
      tiksayisi == 29;
      clearInterval(benimvarim);
      clearInterval(siviarttirmaislem);
  }
  function sivirenkdegistir(r,g,b){
    hedefr = r;
    hedefg = g;
    hedefb = b;
  }

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  function loadImages(){
      img.push(loadImage("Images/hidrojen.png"));
      img.push(loadImage("Images/oksijen.png"));
      img.push(loadImage("Images/sulfirik.png"));
      img.push(loadImage("Images/potaskostik.png"));
      img.push(loadImage("Images/potasyumsulfat.png"));
      img.push(loadImage("Images/hidroklorik.png"));
      img.push(loadImage("Images/kalsiyumkarbonat.png"));
      img.push(loadImage("Images/kalsiyumklorur.png"));
      img.push(loadImage("Images/karbondioksit.png"));
      img.push(loadImage("Images/hidrojen2.png"));
      img.push(loadImage("Images/magnezyum.png"));
      img.push(loadImage("Images/magnezyumsulfat.png"));
      img.push(loadImage("Images/kalsiyumoksit.png"));
      img.push(loadImage("Images/karbonikasit.png"));

      var foto;
      foto = new Image();
      foto.onload = function(){
       img[img.length - 1].width = foto.width;
       img[img.length - 1].height = foto.height;      
                                                        
       foto = new Image();                              

       foto.onload = function(){
         img[img.length - 1].width = foto.width;
         img[img.length - 1].height = foto.height;
         foto = new Image();
         foto.onload = function(){
          img[img.length - 1].width = foto.width;
          img[img.length - 1].height = foto.height;   
          foto = new Image();
          foto.onload = function(){
          foto = new Image();
          foto.onload = function(){
           foto = new Image();
           foto.onload = function(){
            foto = new Image();
            foto.onload = function(){
             foto = new Image();
             foto.onload = function(){
                foto = new Image();
                foto.onload = function(){
                   foto = new Image();
                   foto.onload = function(){
                    foto = new Image();
                    foto.onload = function(){
                      foto = new Image();
                      foto.onload = function(){
                       foto = new Image();
                       foto.onload = function(){
                         foto = new Image();
                         foto.onload = function(){
                           uyu();
                         }
                         foto.src = "Images/karbonikasit.png";
                       }
                       foto.src = "Images/kalsiyumoksit.png";
                      }
                      foto.src = "Images/magnezyumsulfat.png";
                    }
                    foto.src = "Images/magnezyum.png";
                   }
                   foto.src = "Images/hidrojen2.png";
                }
                foto.src = "Images/karbondioksit.png";
             }
             foto.src = "Images/kalsiyumklorur.png";
            }
            foto.src = "Images/kalsiyumkarbonat.png";
           }
           foto.src = "Images/hidroklorik.png";
          }
          foto.src = "Images/potasyumsulfat.png";
          }
          foto.src = "Images/potaskostik.png";
         }
         foto.src = "Images/sulfirik.png";
        }
       foto.src = "Images/oksijen.png";

      }
      foto.src = "Images/hidrojen.png";



      print("img[0].width: " + img[0].width);
      print("Images has been loaded.")
  }
  function karbondioksitcikart(){
    for(i = 0; i < 6; i++){
        var yenikarbondioksit = new enti();
        yenikarbondioksit.x = random(30, canvas.width - 30);
        yenikarbondioksit.y = random(canvas.height - 250, canvas.height);
        print(yenikarbondioksit.x);
        karbondioksitler.push(yenikarbondioksit);
    }
    for(let _karbondioksit of karbondioksitler){
        print(_karbondioksit.x);
    }
  }
  function hidrojen2cikart(){
      for(i = 0; i < 6; i++){
         var yenihidrojen2 = new enti();
         yenihidrojen2.x = random(30,canvas.width - 30);
         yenihidrojen2.y = random(canvas.height - 100, canvas.height);
         print(yenihidrojen2);
         hidrojen2ler.push(yenihidrojen2);
      }
  }
  function sahneAyarla(){
   //BAŞLANGIÇTA SAHNEYE EKLENECEK ENTILER
   entiekle("hidroklorik");
  }
  function uyu(){
    document.title = "Loading..."
    sleep(5000);
    document.title = "Chemistry Simulator";
  }

  function getType(isim){
    switch(isim){
    case "sulfirik.":
    return "Strong Acid";
    case "hidroklorik.":
    return "Storng Acid";
    case"potaskostik.":
    return "Strong Base";
    case"potasyumsulfat.":
    return "Salt";
    case"kalsiyumklorur.":
    return "Salt";
    case"kalsiyumkarbonat.":
    return "Carbonate";
    case"hidrojen.":
    return "Element";
    case"oksijen.":
    return "Element";
    case"magnezyumsulfat.":
    return "Salt";
    case "magnezyum.":
    return "Element";
    case "kalsiyumoksit.":
    return "Metal oxide";
    case "karbonikasit.":
    return "Acid";
       }
     }
  function getID(isim){
    switch(isim){
        case "sulfirik.":
        return "Sulfuric acid";
        case "hidroklorik.":
        return "Hydrochloric acid";
        case"kalsiyumkarbonat.":
        return "Calcium carbonate";
        case"kalsiyumklorur.":
        return "Calcium chloride";
        case"potaskostik.":
        return "Potassium hydroxide";
        case"potasyumsulfat.":
        return "Potassium sulfate";
        case"hidrojen.":
        return "Hydrogen";
        case"oksijen.":
        return "Oxygen";
        case "magnezyumsulfat.":
        return "Magnesium sulfate";
        case "magnezyum.":
        return "Magnesium";
        case "kalsiyumoksit.":
        return "Calcium oxide";
        case "karbonikasit.":
        return "Carbonic acid";
    }
  }   
  function getNumber(isim){
    switch(isim){
        case"hidrojen.":
        return "1";
        case"oksijen.":
        return "8";
        case "magnezyum.":
        return "12";
    }
  }   