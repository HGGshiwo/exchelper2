<template>
    <div style="left">        
        <div class="container">
            <ul style="padding:0px; margin:0px;">
                <div class="exc" v-for="exc in this.excList" :key="exc.id">
                    <span class="exc-text">
                        <span style="margin-right:1%">{{exc.id}}</span>
                        <span>{{exc.text}}</span>
                    </span>
                    <ul style="padding:0">
                        <div v-for="choice in exc.choices" :key="choice.id"
                            v-bind:class="{'choice':true, 'active': choice.active}" 
                            v-on:click.left="choice.active=exc.submit?choice.active :!choice.active; if(!exc.submit) checkChooseLogic(exc, choice);"
                            v-on:click.right=";if(exc.submit && choice.active){ exc.submit = !exc.submit; handleReset(exc); } else if(!exc.submit && choice.active){exc.submit = !exc.submit; handleSubmit(exc);} else if(!exc.submit && !choice.active){exc.submit = !exc.submit; choice.active = true; checkChooseLogic(exc, choice); handleSubmit(exc);}">
                            <span class="choice-id">{{choice.id}}</span>
                            <span class="choice-text">{{choice.text}}</span>
                        </div>
                    </ul>
                    <div v-bind:class="clacResultStyle(exc)">
                        答案 <span v-if="exc.submit">{{exc.key.join(',')}}</span>
                    </div>
                </div>
            </ul>
            <div style="height:25px; width:100%"></div>    
        </div>
        <div class="tab">
                <div class="inner-tab">题集 {{this.$data.curSet}} </div>
                <div class="inner-tab">题号 {{this.$data.curExc}} </div>
                <div class="inner-tab">正确率 {{calcCorRate()}} </div>
                <div class="inner-tab">开始 {{('00' + this.startHour.toString()).slice(-2) + ":" + ('00'+this.startMim.toString()).slice(-2)}} </div>
                <div class="inner-tab">时长 {{this.dTime}} </div>
                <div class="inner-tab" style="float:right">刷题模式</div>
                <div class="inner-tab" style="float:right" v-on:click="submitAll">提交</div>
                <div class="inner-tab" style="float:right" v-on:click="resetAll">重做</div>
                <div class="inner-tab" style="float:right" v-on:click="onSearch">搜索</div>
            </div>        
        <ul class="bar">
            <div class="inner-bar">
                <img src="../assets/select.png"  style="width:40px; height:40px" v-on:click="toHome()" />
            </div>
            <div class="inner-bar">
                <img src="../assets/do-excise-active.png"  style="width:40px; height:40px" v-on:click="toDoExcise()"/>
            </div>
            <div class="inner-bar">
                <img src="../assets/about.png"  style="width:40px; height:40px" v-on:click="toAbout()"/>
            </div>
        </ul>
    </div>
</template>

<script>
export default {
    name: "DoExcise",
    data() {
        var date = new Date();
        return{
            curSet: null,
            curExc: 0,
            corList: [],
            doneList: [],
            excList: [],
            startHour:date.getHours(),
            startMim:date.getMinutes(),
            dTime: "00:00",
            timer: setInterval(() => {
                    var date = new Date;
                    var dh = date.getHours() - this.startHour;
                    var dm = date.getMinutes() - this.startMim;
                    if(dm < 0){
                        dm += 60;
                        dh -= 1;
                    }
                    this.dTime = ('00' + dh.toString()).slice(-2) + ":" + ('00'+ dm.toString()).slice(-2);
                }, 1000)
        }
    },
    mounted(){
        var curExcSetList = JSON.parse(this.$route.params.data);
        this.curSet = curExcSetList[0].name;
        var data = localStorage.getItem(this.curSet);
        console.log(data);
        var t = [];
        if(!data){
            this.$axios.get(curExcSetList[0].path).then(res => {
                var json = JSON.parse(res.request.responseText); 
                t.push.apply(t, json);
            })
            this.excList = t;
        }
        else{
            var json = JSON.parse(data);
            this.curExc = json.curExc;
            this.corList = json.corList;
            this.doneList = json.doneList;
            this.excList = json.excList;
        }
    },
    beforeDestroy(){
        if(this.timer){
            clearInterval(this.timer);
        }
        var data = {}
        data.curExc = this.curExc;
        data.excList = this.excList;
        data.corList = this.corList;
        data.doneList = this.doneList;
        console.log(this.curSet);
        localStorage.setItem(this.curSet, JSON.stringify(data));
    },

    methods: {
        toAbout(){

        },
        calcCorRate() {
            var rate = 0.0;
            if(this.$data.doneList.length != 0)
                rate = (this.$data.corList.length/this.$data.doneList.length);
            return rate.toFixed(2);
        },
        

        submitAll(){
            for(var i = 0; i < this.$data.excList.length; i++){
                var active = false;
                for(var j = 0; j < this.excList[i].choices.length; j++){
                    if(this.excList[i].choices[j].active){
                        active = true;
                        break;
                    }
                }
                if(active){
                    this.excList[i].submit = true;
                    this.handleSubmit(this.excList[i]);
                }
            }
        },

        resetAll(){
            for(var i = 0; i < this.excList.length; i++){
                this.excList[i].submit = false;
                for(var j = 0; j < this.excList[i].choices.length; j++){
                    this.excList[i].choices[j].active = false;
                }
                this.handleReset(this.excList[i]);
            }
        },

        checkChooseLogic(exc, choice){
            if(exc.key.length == 1){
                for(var i = 0; i < exc.choices.length; i++){
                    if(exc.choices[i].id != choice.id){
                        exc.choices[i].active = false;
                    }
                }
            }
        },

        onSearch(){
            alert("未实现搜索功能。");
        },
        
        toDoExcise(){
            location.reload();
        },

        toHome(){
          this.$router.push({
              path: "/"
          });  
        },

        clacResultStyle(exc){
            if(!exc.submit){
                return {
                    'result': true,
                    'wrong': false,
                    'correct': false,
                }
            }
            var i = 0;
            for(var j = 0; j < exc.choices.length; j++){
                //对于每一个选项，如果被选择，那么查看是否在答案中
                if(exc.choices[j].active){
                    if(exc.key.indexOf(exc.choices[j].id) == -1){
                        return {
                            'result': true,
                            'wrong': true,
                            'correct': false,
                        }
                    }
                    i++;
                } 
            }
            if(i != exc.key.length){
                //多选了选项
                return {
                    'result': true,
                    'wrong': true,
                    'correct': false,
                }
            }
            return {
                'result': true,
                'wrong': false,
                'correct': true,
            }
        },

        handleSubmit(exc){
            this.$data.curExc = exc.id;
            this.$data.doneList.push(exc.id);
            var i = 0;
            for(var j = 0; j < exc.choices.length; j++){
                //对于每一个选项，如果被选择，那么查看是否在答案中
                if(exc.choices[j].active){
                    if(exc.key.indexOf(exc.choices[j].id) == -1){
                        return;
                    }
                    i++;
                } 
            }
            if(i != exc.key.length){
                //多选了选项
                return;
            }
            this.$data.corList.push(exc.id);
        },

        handleReset(exc){
            var idx = this.doneList.indexOf(exc.id);
            if(idx != -1){
                this.doneList.splice(idx, 1);
            }
            var cidx = this.corList.indexOf(exc.id);
            if(cidx != -1){
                this.corList.splice(cidx, 1);
            }
        }
    }
}
</script>

<style>
    .container {
        top: 0;
        margin: 0%;
        width: 95%;
        float: right;
    }

    .tab{
        width: 100%;
        height: 25px;
        background-color:  #4C70B7;       
        justify-content: space-around;
        position: fixed;
        bottom: 0;
    }
    .inner-tab{
        color: white;
        width: auto;
        height: 25px;
        float: left;
        vertical-align: -webkit-baseline-middle;
        margin-right: 10px;
        margin-left: 5px;
        margin-top: 0.5px;
        margin-bottom: 0.5px;
    }

    .bar{
        width:60px;
        height: 100%;
        background-color: #303030;
        position: fixed;
        z-index: -1;
        margin: 0%;
        padding: 0%;
    }

    .inner-bar{
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .exc{
        width: 90%;
        height: auto;
        background-color:whitesmoke;
        justify-content: flex-start;
        text-align: left;
        margin-top: 20px;
        margin-left: 5%;
        border-radius: 10px;
        padding-top: 5px;
    }

    .exc-text{
        height: 20px;
        width: 100%;
        font-size: 20px;
        padding-left: 2%;
        /* justify-content: space-around; */
    }
    

    .choice.active{
        background: lightgray;
    }

    .choice{
        width: 97%;
        height: auto;
        font-size: 20px;
        vertical-align: middle;
        padding-left: 3%;
        padding-top: 0.5px;
    }

    .choice-id{
        margin-right: 10px;
        font-size: 20px;
        vertical-align: -webkit-baseline-middle;
    }
    
    .choice-text{
        vertical-align: -webkit-baseline-middle;
        font-size: 20px;
    }

    .result{
        vertical-align: -webkit-baseline-middle;
        font-size: 20px;
        padding-left: 2%;
        padding-bottom: 5px;
        background: whitesmoke;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .result.correct {
        background: #BFFFBF;
    }
    
    .result.wrong {
        background: #FFA5A5;
    }

</style>