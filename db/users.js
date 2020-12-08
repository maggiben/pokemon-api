var crypto = require('crypto');
const languages = ['english', 'japanese', 'chinese', 'french'];
var records = [
  { 
    id: 1,
    username: 'matias',
    token: '0d7f8cfea8e84d30dbe425e3859079a6f79fcf761ea9c4c117d25ed7771d58375e9cd1eef8a67d70242a926e9bd41cfd4bb213354e5afd2dfbf749a1c966eb04',
    salt: "de7978180fd755f94571c0cb8a804728",
    email: "matias@example.com",
    language: 'english'
  },
  {
    id: 2,
    username: 'benjamin',
    token: '5ea3176b288488ff4a9f5590620cd83aa90ecb4f9fc27e111b9513b051c71be95a5d75bc92144e424f370abf39f173cc3ac299a934a727fc8a288aa4bdd3d26c',
    salt: 'e5f272c9f5d8a262749f78c932282908',
    email: 'benjamin@example.com',
    language: 'english'
  },
  {
    id: 3,
    username: 'alicia',
    token: 'bbdb21750dd216dc6d32ce6322a6d0726bc42f4fcffb654df874f3c83bdb7d46e7579422ccbb271c8a870eb997023a90664a1dc034b4b8c1e9598d72acaed303',
    salt: '8b9cb661a8a39043f090b29b616e5f27',
    email: 'alicia@example.com',
    language: 'japanese'
  }
];

const setPassword = (password) => { 
  // Creating a unique salt for a particular user 
  const salt = crypto.randomBytes(16).toString('hex');
  const token = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); 
  return { salt, token };
};

const validPassword = (password, salt, token) => { 
  return token === crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); 
}; 

exports.findByToken = (token, callback) => {
  process.nextTick(() => {
    const record = records.find(record => record.token === token);
    return callback(null, record);
  });
};

exports.loginUser = ({username, password}) => {
  const user = records.find(record => record.username === username);
  if (!user) {
    return false;
  }
  const { salt, token } = user;
  if (validPassword(password, salt, token)) {
    return user;
  }
};

exports.newUser = ({username, email, language = 'english', password}) => {
  if (records.find(record => record.email === email)) {
    return undefined;
  }
  const { salt, token } = setPassword(password);
  const id = records.length + 1;
  const user = {
    id,
    username,
    token,
    salt,
    email,
    language
  };
  const recordsLength = records.push(user);
  return user;
};


exports.getUserLanguage = ({id}) => {
  if (!id) {
    return undefined;
  }
  const user = records.find(user => user.id === id);
  if (user) {
    return user.language;
  }
  return 'english';
};


exports.setUserLanguage = (user, language = 'english') => {
  if (!languages.includes(language)) {
    return false;
  }
  const { id } = user;
  const record = records.find(user => user.id === id);
  if (record) {
    record.language = language;
    return language;
  }
};

exports.getUsers = () => {
  return records;
};