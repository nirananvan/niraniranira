<template>
      <v-container>
       <v-row class="my-4" justify="center">
            <v-col cols="12" md="6" class="text-center">
                <div class="text-center">
     <v-card>
  <!-- カードのタイトル（見出し） -->
<v-card-title class="light-green lighten-2 white--text">
何をやる？
</v-card-title>

  <!-- 入力フィールド -->
  <div class="mt-1"></div>
  <v-card-text>

    <v-text-field
      label="やること"
      v-model="Title"
      dense
      outlined
    ></v-text-field> 

    <v-select
      label="しゅるい"
      v-model="Genre"
      :items="['べんきょう', 'せいかつ', 'うんどう', 'おてつだい', 'あそび']"
      dense
      outlined
    />

    <!-- <v-text-field label="Label" v-model="task" dense outlined></v-text-field> 
         <v-text-field label="タスク" v-model="" dense outlined></v-text-field>  -->
  </v-card-text>

  <!-- 登録ボタン -->
  <v-card-actions>
    <v-btn
      color="light-green lighten-2"
      class="white--text"
      block
      @click="addTodo"
    >
      追加
    </v-btn>
  </v-card-actions>

  <div style="margin-top: 36px;"></div>
</v-card>


<v-card>
  

  <v-select
      :items="prompts"
      label="テーマを選んでください"
      v-model="selectedPrompt"
  outlined
    ></v-select>
  <span>現在選択中のテーマ:</span>
  <v-chip color="light-green" text-color="white" class="ma-2">
    {{ selectedPrompt }}
  </v-chip>

          </v-card>
              <div style="margin-top: 48px;"></div>
          <v-data-table
    :headers="headers"
    :items="completeList"
    class="elevation-1"
  >

  </v-data-table>
            
<v-snackbar v-model="snackbar" color="success" timeout="3000">
          登録できました！
        </v-snackbar>
          
  </div>
  
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
  export default {
 data() {
    return {
      snackbar: false,
  
 prompts: ['いぬ', 'とら','宇宙ねこ', 'うさぎ', '消防車とパトカー', 'ほしのせかいのドラゴン','キャンディーとチョコレートの家','ひまわりと青い空','虹色のユニコーンが草原を走っている','星空を飛ぶ光るクジラ','お菓子のお城に住むプリンセス'],
        headers: [
      { text: 'やること', value: 'Title' },
      { text: 'しゅるい', value: 'Genre' },
    ]
    };
  },
    methods:{
      addTodo(){
      this.$store.dispatch('AddTodo')
       this.snackbar = true; 
      },
    
  
  },

    computed: {
  Title: {
    get () {
      return this.$store.state.Title
    },
    set (text) {
      this.$store.commit('setTitle', text)
    }
  },
    Genre: {
    get () {
      return this.$store.state.Genre
    },
    set (text) {
      this.$store.commit('setGenre', text)
    }
  },
    selectedPrompt: {
    get () {
      return this.$store.state.prompt
    },
    set (val) {
      this.$store.commit('setPrompt', val)
    }
  },
   completeList() {
    // 完了したtodoをフィルターする
    return this.$store.state.List.filter(todo => !todo.IsDone);
    },
  
  todos() {
    return this.$store.state.List;
  }
}
  };
</script>

