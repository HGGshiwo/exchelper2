<template>
    <div>
        <div class="home container">
            <ul class="home exc">
                <div v-bind:class="{'home': true, 'exc-item':true, 'active':excSet.active}" 
                    v-for="excSet in excSetList" 
                    v-bind:key="excSet.name"
                    v-on:click.left="curExcSet.active = false; excSet.active=true; curExcSet = excSet;">
                    <span class="home item-text">{{excSet.name}} </span>
                    <span class="home item-sec-text">作者 {{excSet.author}}</span>
                    <span class="home item-sec-text">题数 {{excSet.num}}</span>
                    <span class="home item-sec-text">更新时间 {{excSet.lastTime}}</span>
                </div>
            </ul>
        </div>
        <div class="tab">
            <div class="inner-tab" style="float:right">自选</div>
            <div class="inner-tab" style="float:right">偏好</div>
            <div class="inner-tab" v-if="this.curExcSet!=null">当前题集 {{this.curExcSet.name}}</div>
        </div>        
        <ul class="bar">
            <div class="inner-bar">
                <img src="../assets/select-active.png"  style="width:40px; height:40px" v-on:click="toHome()" />
            </div>
            <div class="inner-bar">
                <img src="../assets/do-excise.png"  style="width:40px; height:40px" v-on:click="toDoExcise()"/>
            </div>
            <div class="inner-bar">
                <img src="../assets/about.png"  style="width:40px; height:40px" v-on:click="toAbout()"/>
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
        toAbout(){

        }
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
        padding: 0%;
        margin-left: auto;
        margin-right: auto;
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
    .home.item-sec-text{
        font-size: 15px;
        padding-left: 1%;
    }
    .tab{
        width: 100%;
        height: 25px;
        background-color:  #4C70B7;       
        justify-content: space-around;
        position: fixed;
        bottom: 0;
        z-index: 2;
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
        width: 60px;
        height: 100%;
        background-color: #303030;
        position: fixed;
        margin: 0%;
        padding: 0%;
        z-index: 1;
    }

    .inner-bar{
        width: auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
</style>