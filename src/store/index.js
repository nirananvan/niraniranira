import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Todo一覧を保持
    List:[],
    ID: "",
    Title: "",
    IsDone:0 ,   
    imageUrl:"",
    imageUrls: [],
    Genre:"",
    count:"",
    IsDoneCount:0,
    prompt: ''
    

    },
  
  getters: {
  },
  
  mutations: {
  setTodos(state, todos) {
  state.List = todos;
  }, 
  
  setIsDoneCount(state, count) {
  state.IsDoneCount = count;
   },
  
  setID(state, id) {
    state.ID = id;
  },
  
  setGenre(state, genre) {
    state.Genre = genre;
  },
  setTitle(state, title) {
    state.Title = title;
  },
  setPrompt(state, prompt) {
     console.log("setPrompt が呼ばれた！選ばれたプロンプト:", prompt);
    state.prompt = prompt;
  },
  //mutationに引数としてurlを渡す
    setImageUrl(state, url) {
  state.imageUrl = url;
   if (url) {
      state.imageUrls.push(url);
    }
  }, 

  
  setData(state, data) {
  if (data && data.List && Array.isArray(data.List)) {
  state.List = data.List;  // dataがListという箱に入っている場合、中身のListだけを取り出す
  } else if (Array.isArray(data)) {
  state.List = data;  // dataそのものがListの場合、dataをそのまま使う
  } else {
  state.List = [];
  }
  },

   TodoIsDone(state, ID) {
  const todo = state.List.find(todo =>todo.ID === ID);
  if (todo) {
    todo.IsDone = true;
  }
  },
},
    
  actions: {

  //Todo一覧を取得する
  async fetchTodos({ commit }) {
  const response = await axios.get('https://m3h-sasaki-0901spr.azurewebsites.net/api/SELECT?')
  commit('setData', response.data.List)
  },

  async AddTodo({ state ,dispatch}) { 
  //state 受け取る
  //IDの入力チェック（空白か数字以外なら終了）
    if(state.ID!=null && isNaN(state.ID)){
    console.log("IDに数値が入力されていません");
    return;
    }
      //INSERT用のAPIを呼び出し
  await axios.post('https://m3h-sasaki-0901spr.azurewebsites.net/api/INSERT?', { 
        Title: state.Title,
        Genre: state.Genre,
        IsDone: state.IsDone
  })
    
  dispatch('fetchTodos');
     
  },
  

    //bitを更新
  async CompleteTodo({ commit, state ,dispatch}, ID) {
  if (!state.ID || isNaN(state.ID)) {
    console.log("IDに数値が入力されていません");
    return;
  }

  try {
  await axios.post('https://m3h-sasaki-0901spr.azurewebsites.net/api/UPDATE', {
  //IDを指定
  ID: ID,
  //bit型の値をtrueに
  IsDone: true,
  });

  commit('TodoIsDone', ID);
  const IsDoneCount = state.List.filter(todo => todo.IsDone === true).length;
  commit('setIsDoneCount', IsDoneCount);
  // 3の倍数で画像生成
  const basePrompt = state.prompt || 'かわいい動物の画像';
  console.log("中身:", state.prompt);
  let prompt = '';

  if (IsDoneCount % 3 === 0) {
  prompt =  `${basePrompt} を豪華に  `;
  } else {
  prompt =  `${basePrompt}  の実写画像 `;
  }
  console.log("generateRewardImageに渡すprompt:", prompt); 

      
  await dispatch('generateRewardImage', { prompt });
  } catch (error) {
  console.error("完了処理失敗:", error);
  }
  },

  async generateRewardImage({ commit }, { prompt }) {
    const response = await axios.post('https://m3h-sasaki-0901.azurewebsites.net/api/Function1?', { prompt });
    console.log("generateRewardImageのprompt:", prompt);
    console.log(response.data) 
    // console.log('画像URL:', this["imageUrl"]);
    console.log('APIレスポンス:', response.data);

    let url = '';
    url = response.data.replace("Image URL:", ''); 

//     const url = response.data["Image URL"];
    commit('setImageUrl', url); 
    this.dialog = true;  
  }
  }
})
