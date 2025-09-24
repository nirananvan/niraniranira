<template>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6" class="text-center">
                <div class="text-center">
                <v-dialog v-model="dialog" width="500">
                <v-card>
                <v-card-title>よくがんばったね！おめでとう！</v-card-title>
        
        
                  <div v-if="loading">
                  <v-progress-circular indeterminate color="light-green" size="50"></v-progress-circular>
                  <p>ちょっとまってね…</p>
                  </div>

              <v-img width="500"  :src="imageUrl" @load="ImageLoad"   @error="ImageError"> </v-img> 
              
      <div
        v-if="loading"
        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; background-color: rgba(255,255,255,0.8); padding: 20px; border-radius: 8px;"></div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="light-green" text @click="dialog = false" v-if="imageUrl" >閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <v-alert
      color="light-green"
      colored-border
      border="left"
      elevation="2"
      class="mt-4"
      :icon="false"
      >
      {{ rewardMessage }}
      </v-alert>
  
 <v-data-table
    :headers="headers"

    :items="completeList"
    class="elevation-1"
  >
  <!-- 完了未完了部分 -->
    <template v-slot:[`item.IsDone`]="{ item }">
      <span>{{ item.IsDone ? 'できた' : 'できてない' }}</span>
    </template>

    <!-- 完了ボタン -->
    <!-- itemは一行分のデータ、Completeは列名 -->
       <!-- 完了したらボタンを無効化 -->
    <template v-slot:[`item.Complete`]="{ item }">
      <v-btn
        color="light-green"
         class="white--text"
        small
        @click="complete(item)"
        :disabled="item.IsDone" 
      >できた！</v-btn>
    </template>
  </v-data-table>
          </div>
          </v-col>
        </v-row>
      </v-container>
</template>


<script>
  export default {
    data () {
      return {
        dialog: false,
         loading: false,
      
  headers: [
      { text: 'やること', value: 'Title' },
      { text: 'しゅるい', value: 'Genre' },
      { text: 'できたかな？', value: 'IsDone' },
      { text: ' ', value: 'Complete' }
    ]

    }
  },
  mounted() {
     // Vuexのアクションを実行する
    this.$store.dispatch('fetchTodos');
  },
  computed:{
    List() {
      const data = this.$store.state.List;
    return data;
    },
    imageUrl() {
      return this.$store.state.imageUrl;
    },
    rewardMessage() {
    const count = this.$store.state.IsDoneCount;
    if (count === 0) {
      return '今日もがんばろう！';
    }
    if (count % 3 === 0) {
      return 'すごいね！おつかれさま！';
    }
    const remain = 3 - (count % 3);
    return `残り ${remain} 回でごうかな写真！`;
    },

    completeList() {
    // 完了したtodoをフィルターする
    return this.$store.state.List.filter(todo => !todo.IsDone);
    },
  },
  
  methods: {
   ImageLoad() {
    this.loading = false;
    console.log("画像読み込み完了");
  },
   ImageError() {
    this.loading = false;
    console.error("画像読み込み失敗");
  },


   async complete(item) {
    this.loading = true;
    this.dialog = true; 
    //mutationを用いてtodoをセット
    this.$store.commit('setID',item.ID);
    //IDを引数としてactionを呼び出す
    this.$store.dispatch('CompleteTodo',item.ID);
    //完了数を取得
    //  const count = this.$store.state.IsDoneCount;
    // }
  },
},
}
     
//3の倍数なら画像生成
  // if (count % 3 === 0) {
  
 //dialog表示はwatchで制御
  //  if (this.$store.state.ImageUrl ){
  //     this.dialog = true;
  //   }
  // }

//変更を確実に検知する。completeメソッド内で書かないのは、vuexの更新が反映されていない可能性があるため
//newvalはstate.imageUrlの最新の値
//watchはvuenインスタンスのプロパティを参照(data,computedなど)
//computedされたstateはwatchできる
// watch: {
//   imageUrl(newVal) {
//     console.log(newVal);
//     if (newVal) {
//        this.loading = true;
//       this.dialog = true;
//     }
//   }
// }


//   watch: {
//   someValue(newVal, oldVal) {
//     console.log('新しい値:', newVal);
//     console.log('古い値:', oldVal);
//   }
// }
  //     <!-- <v-img width="450"  src="rewardImageUrl"> </v-img> -->

  
          
          

  // <!-- <div v-for="todo in List" :key="todo.ID">
  //           <v-btn @click="complete(todo)">完了</v-btn>
  //          </div> -->

  //         <!-- <li v-for="(item, index) in List" :key="index">
  //         今日やること {{ item.Title  }} -  ジャンル {{ item.Genre }} -{{ item.IsDone ? '完了' : '未完了' }}
  //       </li> -->
  
  </script>