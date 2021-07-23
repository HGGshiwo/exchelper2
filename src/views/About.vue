<template>
<div>
    <div class="about container"> 
        <div class="text hello">你好, ExcHelper</div>
        <div class="text">
            <div class="text h1">使用介绍</div>
            <div>
                <img src="../assets/select.png" style="height:30px; width:30px; float:left; margin-right:0.5%"/>
                <div class="text h2">自选</div>
            </div>
            <ul >
                <li class="about list">在自选界面选择题库，当前只支持选择一个题库</li>
                <li class="about list">点击右侧导航栏的刷题进入刷题模式</li>
            </ul>
            <div>
                <img src="../assets/do-excise.png" style="height:30px; width:30px; float:left; margin-right:0.5%"/>
                <div class="text h2">刷题</div>
            </div>
            <ul>
                <li class="about list">在刷题界面，左键点击选项选择，再次点击取消选择</li>
                <li  class="about list">右键点击选项提交答案，注意：被点击的选项也会被选择</li>
                <li  class="about list">选项提交后将会显示答案。</li>
                <li  class="about list">对于已经提交的选项，支持右键点击被选择的选项，取消提交</li>
                <li  class="about list">点击页面下方工具栏中重做，取消所有提交</li>
                <li  class="about list">点击页面下方工具栏中提交，提交所有选项</li>
                <li  class="about list">使用同一个浏览器，保存最近一次的做题记录。</li>
            </ul> 
            <div>
                <img src="../assets/about.png" style="height:30px; width:30px; float:left; margin-right:0.5%"/>
                <div class="text h2">相关</div>
            <ul >
                <li class="about list">使用介绍和其他</li>
            </ul>
            </div>  
        </div>
        <nav style="margin-top:5%">
            <a class="contact"  href="mailto:1272126735@qq.com">联系作者</a> 
            <a class="contact"  href="https://github.com/HGGshiwo/exchelper2">项目地址</a>
        </nav>
        
    </div>
    <div class="tab">
            <div class="inner-tab" style="float:right">关于</div>
        </div>        
        <ul class="bar">
            <div class="inner-bar">
                <img src="../assets/select.png"  style="width:40px; height:40px" v-on:click="toHome()" />
            </div>
            <div class="inner-bar">
                <img src="../assets/do-excise.png"  style="width:40px; height:40px" v-on:click="toDoExcise()"/>
            </div>
            <div class="inner-bar">
                <img src="../assets/about-active.png"  style="width:40px; height:40px" v-on:click="toAbout()"/>
            </div>
        </ul>
</div>
</template>

<script>
export default {
    methods:{
        toDoExcise(){
            this.$router.push({
                name:"do-excise",
                params: this.$route.params.data
            });
        },

        toHome(){
          this.$router.push({
              path: "/"
          });  
        },

        toAbout(){
            location.reload();
        },
    }
}
</script>

<style>
    .container.about{
        padding-left: 60px;
    }
    .text{
        text-align: left;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: lighter;
        margin-left: 2%;
    }
    .text.h1{
        font-size: 25px;
        margin-bottom: 3%;
    }
    .text.h2{
        font-size: 20px;
        margin-bottom: 2%;
    }
    .text.hello{
        font-size: 40px;
        margin: 1%;
        text-align: center;
    }
    .contact{
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: lighter;
        margin-left: 2%;
        font-size: 20px;
        text-decoration: none;
        color: #000;
    }
    .about.list{
        margin-bottom: 1%;
    }

</style>