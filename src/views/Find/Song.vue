<template>
    <div class="song wrap">
        <!-- 歌曲详情页 -->
        <detail :playList='song' :pageType='"song"' :lyric='lyric' @changeText='changeLyric'/>

    </div>
</template>

<script>
import $axios from 'axios'
import detail from '../../components/PlaylistDetail'
export default {
    beforeRouteEnter(to,from,next){
        $axios({
            method:'GET',
            url:'/song/detail',
            params:{
                ids:to.query.id
            }
        }).then(res =>{
            console.log('歌曲详情',res)
            next(vm =>{
                vm.song.name = res.data.songs[0].name
                vm.song.album = res.data.songs[0].al.name
                vm.song.coverImgUrl = res.data.songs[0].al.picUrl
                vm.song.artistName = res.data.songs[0].ar[0].name
                
                $axios({
                    method:'GET',
                    url:'/lyric',
                    params:{
                        id:to.query.id
                    }
                }).then(res =>{
                    console.log('歌词',res)
                    vm.song.lyric = res.data.lrc.lyric.split('\n')
                    vm.lyric = vm.song.lyric.slice(0,10)
                }).catch(err =>{
                    console.log('获取歌词失败',err)
                })
                
                
            })
            
        }).catch(err =>{
            console.log('获取歌曲详情失败',err)
            next(false)
        })
    },

    components:{
        detail,
    },

    data(){
        return{
            song:{
                coverImgUrl:'',
                name:'',
                artistName:'',
                commentCount:'',
                lyric:'',
                album:'',
            },

            lyric:[]
        }
    },

    methods:{
        // 收起/展示歌词
        changeLyric(bool){
            if(bool){
                this.lyric = this.song.lyric
            }else{
                this.lyric = this.song.lyric.slice(0,10)
            }
        }
    }
}
</script>

<style lang='less' scoped>
.song{
    background-color: #fff;
    padding: 50px 25px ;
    padding-bottom: 100px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
}
.wrap{
    width: 750px;
}
</style>