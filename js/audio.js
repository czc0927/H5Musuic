/*
* @author                yanming
* @date                2015-08-21
* @description        基于html5编写的音乐播发器demo
*/
window.onload=function(){


    var currentIndex=-1;

    var audio=document.getElementById("aud");

    var mlist=["平凡的一天","給你給我","想你想你","哎喲","一葷一素","南一道街","像我這樣的人","借","盛夏","消愁","芬芳一生","如果有一天我變得很有錢"];

    var msrc=["music/1.mp3","music/2.mp3","music/3.mp3","music/4.mp3","music/5.mp3","music/6.mp3","music/7.mp3","music/8.mp3","music/9.mp3","music/10.mp3","music/11.mp3","music/12.mp3"];

    var tou =["image/hou_0.jpg","image/hou_1.jpg","image/hou_2.jpg","image/hou_3.jpg","image/hou_4.jpg","image/hou_5.jpg","image/hou_6.jpg","image/hou_7.jpg","image/hou_8.jpg","image/hou_9.jpg","image/hou_10.jpg","image/hou_11.jpg","image/hou_12.jpg"]

    var stick=document.getElementById("stick");

    function finit(){
        document.getElementById("name").innerHTML=mlist[0];
    }

    var oPlayOrPause=document.getElementById("btn-playorpause");

    var photo=document.getElementById("photo");

    oPlayOrPause.onclick=fPlayMusic
    function fPlayMusic(){
        if(currentIndex==-1){
            audio.src=msrc[0];
            currentIndex=0;
        }
        if(audio.paused){
            audio.play();
            oPlayOrPause.style.backgroundImage="url(image/img1/stop.png)";
            photo.className="rotate"

        }else{
            audio.pause();
            oPlayOrPause.style.backgroundImage="url(image/img1/start.png)";
            photo.className=""
        }
    }


    function timeChange(time, timePlace) {
        var timePlace = document.getElementById(timePlace);

        var minute = time / 60;
        var minutes = parseInt(minute);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        var second = time % 60;
        seconds = parseInt(second);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var allTime = "" + minutes + "" + ":" + "" + seconds + ""
        timePlace.innerHTML = allTime;
    }



    document.getElementById("btn-prev").onclick=function(){
        if (currentIndex == 0) {
            currentIndex = mlist.length-1;
            document.getElementById("name").innerHTML=mlist[currentIndex];
            document.getElementById("photo").src=tou[currentIndex];
            photo.className="rotate"
        } else {
            currentIndex--;
            document.getElementById("name").innerHTML=mlist[currentIndex];
            document.getElementById("photo").src=tou[currentIndex];
            photo.className="rotate"

        }
        audio.src = msrc[currentIndex];
        stick.style.width=0;
        audio.play();
        oPlayOrPause.style.backgroundImage="url(image/img1/stop.png)";
        photo.className="rotate"


    }

    document.getElementById("btn-next").onclick=function(){
        if (currentIndex == (mlist.length-1)) {
            currentIndex = 0;
            document.getElementById("name").innerHTML=mlist[0];
            document.getElementById("photo").src=tou[currentIndex];
        } else {
            currentIndex++;
            document.getElementById("name").innerHTML=mlist[currentIndex];
            document.getElementById("photo").src=tou[currentIndex];
        }
        audio.src = msrc[currentIndex];
        stick.style.width=0;
        audio.play();
        oPlayOrPause.style.backgroundImage="url(image/img1/stop.png)";
        photo.className="rotate"


    }

    audio.addEventListener('timeupdate',function(){
        if (!isNaN(audio.duration)) {

            var progressValue = audio.currentTime/audio.duration*350;
            stick.style.width = parseInt(progressValue) + 'px';
        };
    },false);




    audio.addEventListener('ended',function(){
        stick.style.width=0;
        if (currentIndex == (mlist.length-1)) {
            currentIndex = 0;
            document.getElementById("name").innerHTML=mlist[0];
        } else {
            currentIndex++;
            document.getElementById("name").innerHTML=mlist[currentIndex];
        }
        audio.src = msrc[currentIndex];
        stick.style.width=0;
        audio.play();
        oPlayOrPause.style.backgroundImage="url(image/img1/stop.png)";
    },false);

    audio.addEventListener('canplay',function(){
        var buffer=document.getElementById("buffer");
        buffer.style.display="none";
    },false);

    var allTime = audio.duration;

    setInterval(function() {
        var currentTime = audio.currentTime;
        var getcurrentTime=document.getElementById("currentTime")
        getcurrentTime.inneeHTML=timeChange(currentTime, "currentTime")
    }, 1000);

    audio.addEventListener('loadstart',function(){
        var buffer=document.getElementById("buffer");
        buffer.style.display="block";
        buffer.innerHTML="正在获取数据...";
    },false);

    finit();
}