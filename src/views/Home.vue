<template>
    <div>
        <div class="home container">
            <ul class="home exc">
                <div v-bind:class="{'home': true, 'exc-item':true, 'active':excSet.active}" 
                    v-for="excSet in excSetList" 
                    v-bind:key="excSet.name"
                    v-on:click.left="curExcSet.active = false; excSet.active=true; curExcSet = excSet;">
                    <div class="home item-text">{{excSet.name}}</div>
                </div>
            </ul>
        </div>
        <div class="tab">
            <div class="inner-tab" style="float:right">自选</div>
            <div class="inner-tab" style="float:right">偏好</div>
            <div class="inner-tab" v-if="this.curExcSet!=null">当前题集 {{this.curExcSet.name}}</div>
            <div class="inner-tab" v-if="this.curExcSet!=null">更新时间 {{this.curExcSet.lastTime}}</div>
            <div class="inner-tab" v-if="this.curExcSet!=null">题数 {{this.curExcSet.num}}</div>
        </div>        
        <ul class="bar">
            <div class="inner-bar">
                <div class="bar-text" v-on:click="toHome()">自选</div>
            </div>
            <div class="inner-bar">
                <div class="bar-text" v-on:click="toDoExcise()">刷题</div>
            </div>
        </ul>
    </div>
</template>

<script>

export default {
    name: "Home",
    
    data: function(){
        return {
            curExcSet: null,
            excSetList: []
        }
    },

    mounted: async function(){        
        var json = []; 
        await this.$axios.get("excset.json").then(res => {
            json.push.apply(json, JSON.parse(res.request.responseText));//单纯的赋值无法得到
        })
        this.excSetList = json;
        this.curExcSet = json[0];
    },
    methods:{
        toDoExcise(){
            var curExcSetList = [];
            for(var i = 0; i < this.excSetList.length; i++){
                if(this.excSetList[i].active){
                    curExcSetList.push(this.excSetList[i]);
                }
            }
            this.$router.push({
                name: 'do-excise',
                params: {
                    data: JSON.stringify(curExcSetList),
                }
            });
        },
        toHome(){
            location.reload();
        },
    }
}
</script>

<style>
    .home.container {
        top: 0;
        margin: 0%;
        width: 95%;
        float: right;
    }

    .home.exc{
        width: 80%;
        margin-left: 5%;
        background-color: white;
    }

    .home.exc.active{
        background-color: lightyellow;
    }

    .home.exc-item{        
        background-color: whitesmoke;
        padding-top: 1%;
        padding-bottom: 1%;
        padding-left: 2%;
        margin-top: 5px;
        margin-bottom: 10px;
        border-radius: 10px;
    }
    
    .home.exc-item.active{
        background-color: lightgray;
    }

    .home.item-text{     
        font-size: 20px;
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
        width:5%;
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

    .bar-text{
        font-size:20px; 
        color: lightgray;
        font-weight: bold;
    }
</style>