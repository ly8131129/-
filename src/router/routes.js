export const routes = [
  {
    path: '/',
    name: 'Home',
    component: r => require(['../views/Home'],r),
    redirect:{
      name:'Recommend'
    },
    children:[
      {
        path: 'find/:songId?',
        name: 'Find',
        component: r => require(['../views/Find'],r),
        props: true,
        redirect:{
          name:'Recommend'
        },
        children:[

          {
            path: 'recommend/:song?',
            name: 'Recommend',
            component: r => require(['../views/Find/Recommend'],r),
          },
          {
            path: 'rank',
            name: 'Rank',
            component: r => require(['../views/Find/Rank'],r),
          },
          {
            path: 'playlist',
            name: 'Playlist',
            component: r => require(['../views/Find/Playlist'],r),
          },
          {
            path: 'album',
            name: 'Album',
            component: r => require(['../views/Find/Album'],r),
          },
          {
            path: 'songlist',
            name: 'Songlist',
            component: r => require(['../views/Find/Songlist'],r),
          },
          {
            path: 'song',
            name: 'Song',
            component: r => require(['../views/Find/Song'],r),
          },
          
          {
            path: 'searchResult',
            name: 'SearchResult',
            component: r => require(['../views/SearchResult'],r)
          }
         
        ]
      },

      
     /*  {
        path: 'my',
        name: 'My',
        component: r => require(['../views/My'],r)
      }, */
      /* {
        path: 'friend',
        name: 'Friend',
        component: r => require(['../views/Friend'],r)
      },
      {
        path: 'singer',
        name: 'Singer',
        component: r => require(['../views/Singer'],r)
      } */
    ]
  },

  
    
  
  
]