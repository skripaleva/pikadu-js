// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR6W4TzIEjVt5Y6Tz7eq4idi6teHmyTMM",
  authDomain: "pikadu-27d3e.firebaseapp.com",
  databaseURL: "https://pikadu-27d3e.firebaseio.com",
  projectId: "pikadu-27d3e",
  storageBucket: "pikadu-27d3e.appspot.com",
  messagingSenderId: "528367373781",
  appId: "1:528367373781:web:ae4f635892a0bb1bff815c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);

let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');


const listUsers = [
  {
    id: '01',
    email: 'maks@mail.com',
    password: '12345',
    displayName: 'MaksJS',
    photo: 'https://avatars.mds.yandex.net/get-pdb/1209255/3e3b69a2-f411-4cd4-a81e-688440eee446/s1200',
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '123456',
    displayName: 'KateKillMaks'
  },
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if(!regExpValidEmail.test(email)) {
      alert('email не валиден');
      return;
    }
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      if(handler) {
        handler()
      }
    } else {
      alert('Пользователь с такими данными не найден')
    }
  },
  logOut(handler) {
    this.user = 0;
    if(handler) {
      handler()
    }
  },
  signUp(email, password, handler) {
    if(!regExpValidEmail.test(email)) {
      alert('email не валиден');
      return;
    }

    if (!email.trim() || !password.trim()) {
      alert('Введите данные');
      return
    }

    if (!this.getUser(email)) {
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))}
      listUsers.push(user);
      this.authorizedUser(user);
      if(handler) {
        handler()
      }
    } else {
      alert('Пользователь с таким email уже зарегистрирован')
    }
  },

  editUser(userName, userPhoto = '', handler) {
    if (userName) {
      this.user.displayName = userName;
    }
    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    if(handler) {
      handler()
    }
  },

  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Наш за рукопись пояс силуэт языком вопрос эта пунктуация коварных если вскоре строчка они свою речью. Семантика грамматики не своих прямо, взобравшись текст большого вскоре живет большой агентство страна буквоград возвращайся, о продолжил. Оксмокс одна правилами букв жаренные свою наш свое продолжил. Своих ipsum алфавит своего языком путь над великий пустился предупредила собрал даже вопроса страна вдали по всей речью страну, ручеек продолжил!',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName:'maks', photo: 'https://avatars.mds.yandex.net/get-pdb/1209255/3e3b69a2-f411-4cd4-a81e-688440eee446/s1200'},
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 20,
    },
    {
      title: 'Заголовок поста2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dignissimos doloremque eligendi laborum, maiores nulla praesentium quia? Accusamus aliquid architecto assumenda debitis dolores doloribus eaque, exercitationem harum ipsam iure iusto modi molestias officia officiis perspiciatis quod repellendus saepe ut voluptas voluptatum. Aliquid eos fuga inventore, iusto modi nam neque nobis quos repellendus ullam? Ab ducimus mollitia obcaecati placeat possimus, reiciendis.',
      tags: ['свежее', 'новое', 'мое', ''],
      author: {displayName:'kate', photo: 'data:image/jpeg;base64,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'},
      date: '10.11.2020, 20:54:00',
      like: 45,
      comments: 12,
    },
    {
      title: 'Заголовок поста3',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Наш за рукопись пояс силуэт языком вопрос эта пунктуация коварных если вскоре строчка они свою речью. Семантика грамматики не своих прямо, взобравшись текст большого вскоре живет большой агентство страна буквоград возвращайся, о продолжил. Оксмокс одна правилами букв жаренные свою наш свое продолжил. Своих ipsum алфавит своего языком путь над великий пустился предупредила собрал даже вопроса страна вдали по всей речью страну, ручеек продолжил!',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName:'maks', photo: 'https://avatars.mds.yandex.net/get-pdb/1209255/3e3b69a2-f411-4cd4-a81e-688440eee446/s1200'},
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 20,
    },
  ],
  addPost(title, text, tags, handler) {

    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    })

    if(handler) {
      handler()
    }
  }

};

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user: ', user);

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add('visible');

  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};


const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
};



const showAllPosts = () => {

  let postsHTML = '';
  setPosts.allPosts.forEach(({ title, text, date, tags, like, comments, author }) => {

    postsHTML += `
        <section class="post">
      <div class="post-body">
        <h2 class="post-title">${title}</h2>
        <p class="post-text">${text}</p>
        <div class="tags">
          ${tags.map(tag => `<a href="#${tag}" class="tag">#${tag}</a>`)}
        </div>
      </div>
      <div class="post-footer">
        <div class="post-buttons">
          <button class="post-button likes">
            <svg width="19" height="20" class="icon icon-like">
              <use xlink:href="img/icons.svg#like"></use>
            </svg>
            <span class="likes-counter">${like}</span>
          </button>
          <button class="post-button comments">
            <svg width="21" height="21" class="icon icon-comment">
              <use xlink:href="img/icons.svg#message"></use>
            </svg>
            <span class="comments-counter">${comments}</span>
          </button>
          <button class="post-button save">
            <svg width="19" height="19" class="icon icon-save">
              <use xlink:href="img/icons.svg#save"></use>
            </svg>
          </button>
          <button class="post-button share">
            <svg width="17" height="19" class="icon icon-share">
              <use xlink:href="img/icons.svg#share"></use>
            </svg>
          </button>
        </div>
        <div class="post-author">
          <div class="author-about">
            <a href="#" class="author-username">${author.displayName}</a>
            <span class="post-time">${date}</span>
          </div>
          <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpg"} alt="author-avatar" class="author-avatar"></a>
        </div>
      </div>
    
    </section> 
    `;
  });

  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};

const init = () => {
  menuToggle.addEventListener('click', function(ev) {
    console.log('клик');
    ev.preventDefault();
    menu.classList.toggle('visible');
  });

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue =passwordInput.value;
    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  loginSignup.addEventListener('click', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue =passwordInput.value;
    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });

  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName
  });

  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom());
    editContainer.classList.remove('visible');
  });

  buttonNewPost.addEventListener('click', event => {
    event.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit', event => {
    event.preventDefault();
    const { title, text, tags } = addPostElem.elements;
    console.log({ title, text, tags });

    if (title.value.length < 6) {
      alert('Слишком короткий заголовок');
      return;
    }
    if (text.value.length < 6) {
      alert('Слишком короткий пост');
      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();

  });

  toggleAuthDom();
  showAllPosts();
};

document.addEventListener('DOMContentLoaded', init);


